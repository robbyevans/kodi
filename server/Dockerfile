# syntax = docker/dockerfile:1
ARG RUBY_VERSION=3.1.2
FROM docker.io/library/ruby:${RUBY_VERSION}-slim AS base

WORKDIR /rails

# ---- RUNTIME PACKAGES (include XML/XSLT so Nokogiri loads at runtime) ----
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      curl \
      libjemalloc2 \
      libvips \
      postgresql-client \
      libxml2 \
      libxslt1.1 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

ENV RAILS_ENV=production \
    BUNDLE_DEPLOYMENT=1 \
    BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_WITHOUT="development:test"

# ---------- Build stage ----------
FROM base AS build

# Use bash for RUN in this stage so we can use pipefail in diagnostics
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Headers to compile native gems against system libs
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      git \
      libpq-dev \
      pkg-config \
      libxml2-dev \
      libxslt1-dev && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install gems (separate to leverage Docker cache)
COPY Gemfile Gemfile.lock ./

# Build Nokogiri against system libraries
ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=1
RUN gem update --system 3.3.26 && \
    gem install bundler -v 2.6.3 && \
    bundle config set build.nokogiri --use-system-libraries && \
    bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# ===== DIAGNOSTIC BLOCK =====
RUN set -euxo pipefail; \
  ruby -v; bundle -v; gem -v; \
  echo "=== bundle env ==="; bundle env; \
  echo "=== gem env ==="; gem env; \
  echo "=== nokogiri (bundle) ==="; (bundle info nokogiri || true); \
  echo "=== nokogiri (gem) ==="; (gem list ^nokogiri$ -d || true); (gem which nokogiri || true); \
  echo "=== require test ==="; bundle exec ruby -e 'require "nokogiri"; puts "Nokogiri OK: #{Nokogiri::VERSION}"'

# App code + precompiles
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
