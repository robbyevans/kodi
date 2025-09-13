# syntax = docker/dockerfile:1
ARG RUBY_VERSION=3.1.2
FROM docker.io/library/ruby:${RUBY_VERSION}-slim AS base

WORKDIR /rails

# Runtime deps (vendored Nokogiri => no libxml2/xslt needed at runtime)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      curl \
      libjemalloc2 \
      libvips \
      postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Consistent Bundler env
ENV RAILS_ENV=production \
    BUNDLE_DEPLOYMENT=1 \
    BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_WITHOUT="development:test" \
    BUNDLE_IGNORE_CONFIG=1

# ----------------- Build stage -----------------
FROM base AS build
SHELL ["/bin/bash", "-lc"]

# Build tools for native gems (no XML/XSLT headers since we use vendored Nokogiri)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      git \
      libpq-dev \
      pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install gems first to leverage Docker layer cache
COPY Gemfile Gemfile.lock ./
RUN gem update --system 3.3.26 && \
    gem install bundler -v 2.6.3 && \
    bundle install && \
    rm -rf ~/.bundle/ "/usr/local/bundle"/ruby/*/cache "/usr/local/bundle"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Verify Nokogiri in build stage
RUN set -euxo pipefail; \
  ruby -v; bundle -v; \
  bundle info nokogiri; \
  bundle exec ruby -e 'require "nokogiri"; puts "Nokogiri build OK: #{Nokogiri::VERSION}"'

# App code
COPY . .

# Make sure entrypoint doesn’t rewrite bundler path (no-op if absent)
RUN sed -i '/bundle config set --local path/d' bin/docker-entrypoint || true

# Precompile bootsnap & assets
RUN bundle exec bootsnap precompile app/ lib/
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

# ----------------- Final runtime image -----------------
FROM base
SHELL ["/bin/bash", "-lc"]

# 🔧 Match RubyGems & Bundler versions with build stage
RUN gem update --system 3.3.26 && gem install bundler -v 2.6.3

# Copy bundle and app
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# Sanity check: same bundle visible at runtime
RUN set -euxo pipefail; \
  bundle check; \
  bundle exec ruby -e 'require "nokogiri"; require "sprockets/rails"; puts "Runtime bundle OK"'

# Non-root user
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp || true
USER 1000:1000

ENTRYPOINT ["/rails/bin/docker-entrypoint"]
EXPOSE 3000
CMD ["./bin/rails", "server"]
