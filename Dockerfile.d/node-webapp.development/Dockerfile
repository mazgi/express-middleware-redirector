# https://github.com/mazgi/dockerfiles/blob/main/Dockerfile.d/node-webapp.development/customize-example.Dockerfile
FROM ghcr.io/mazgi/node-webapp.development

ARG GID=0
ARG UID=0
ENV GID=${GID:-0}
ENV UID=${UID:-0}
ENV NODE_ENV=development

RUN :\
  # Create the development user with the same UID and GID as you.
  && useradd --comment '' --create-home --gid users --uid ${UID} developer\
  && groupadd --gid ${GID} developer || true\
  && usermod --append --groups ${GID} developer || true\
  && echo '%users ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/grant-all-without-password-to-users\
  && echo '%developer ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/grant-all-without-password-to-developer\
  && :
