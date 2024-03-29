FROM node:18 as base

# Set in non-interactive mode.
ENV DEBIAN_FRONTEND=noninteractive

ARG GID=0
ARG UID=0
ENV GID=${GID:-0}
ENV UID=${UID:-0}

RUN echo 'apt::install-recommends "false";' > /etc/apt/apt.conf.d/no-install-recommends\
  && apt-get update\
  # 
  # Set up locales
  && apt-get install --assume-yes locales procps dialog\
  && echo 'en_US.UTF-8 UTF-8' > /etc/locale.gen\
  && locale-gen\
  #
  # Install basic packages
  && apt-get install --assume-yes sudo dnsutils netcat git tmux zsh jq groff less\
  # 
  # Install development packages
  && npm install --global\
  npm-check-updates\
  sort-package-json\
  # 
  && curl https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o /tmp/awscliv2.zip\
  && unzip -q -d /tmp/ /tmp/awscliv2.zip\
  && /tmp/aws/install\
  # 
  # Create a user for development
  && addgroup --gid ${GID} developer || true\
  && adduser --disabled-password --uid ${UID} --gecos '' --gid ${GID} developer || true\
  # It will be duplicate UID or GID with "node" user when your UID==1000 or GID==100.
  && echo '%users ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/grant-all-without-password-to-users\
  && echo '%developer ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/grant-all-without-password-to-developer

# Reset DEBIAN_FRONTEND to default(`dialog`).
# If you no need `dialog`, you can set `DEBIAN_FRONTEND=readline`.
# see also: man 7 debconf
ENV DEBIAN_FRONTEND=
