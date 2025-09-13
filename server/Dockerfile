# syntax = docker/dockerfile:1
ARG RUBY_VERSION=3.1.2
FROM docker.io/library/ruby:${RUBY_VERSION}-slim AS base

WORKDIR /rails

# ---- RUNTIME PACKAGES (include XML/XSLT) ----
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      curl \
      libjemalloc2 \
      libvips \
      postgresql-client \
      libxml2 \
      libxslt1.1 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Production Bundler settings
ENV RAILS_ENV=production \
    BUNDLE_DEPLOYMENT=1 \
    BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_WITHOUT="development:test"

# ---------- Build stage ----------
FROM base AS build

# Dev headers to compile native gems against system libs
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      git \
      libpq-dev \
      pkg-config \
      libxml2-dev \
      libxslt1-dev && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY Gemfile Gemfile.lock ./

# Build Nokogiri against system libs
ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=1
RUN gem update --system 3.3.26 && \
    gem install bundler -v 2.6.3 && \
    bundle config set build.nokogiri --use-system-libraries && \
    bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Fail fast if Nokogiri can't load (you'll see it during build, not at release)
RUN ruby -e 'require "nokogiri"; puts "Nokogiri OK: #{Nokogiri::VERSION}"'

# App code and precompiles
COPY . .
RUN bundle exec bootsnap precompile app/ lib/
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

# ---------- Final runtime image ----------
FROM base
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER 1000:1000

ENTRYPOINT ["/rails/bin/docker-entrypoint"]
EXPOSE 3000
CMD ["./bin/rails", "server"]
