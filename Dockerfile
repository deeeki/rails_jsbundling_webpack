ARG DEBIAN_VERSION=bullseye
ARG RUBY_VERSION=3.1.1
ARG NODE_VERSION=16.14.0

FROM node:$NODE_VERSION-$DEBIAN_VERSION-slim as node

FROM ruby:$RUBY_VERSION-slim-$DEBIAN_VERSION as base

ARG DEBIAN_VERSION=bullseye
ARG PG_MAJOR=14
ARG BUNDLER_VERSION=2.3.8

RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    curl \
    g++ \
    gcc \
    git \
    gnupg2 \
    make \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

RUN curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
  && echo "deb http://apt.postgresql.org/pub/repos/apt/ ${DEBIAN_VERSION}-pgdg main" $PG_MAJOR > /etc/apt/sources.list.d/pgdg.list

RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    libpq-dev \
    postgresql-client-$PG_MAJOR \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /opt/yarn-* /opt/yarn
RUN ln -fs /opt/yarn/bin/yarn /usr/local/bin/yarn

ENV LANG=C.UTF-8 \
  BUNDLE_JOBS=4 \
  BUNDLE_RETRY=3

RUN gem update --system && gem install bundler -v $BUNDLER_VERSION

WORKDIR /app
