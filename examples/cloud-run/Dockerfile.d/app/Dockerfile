FROM node:18-alpine as base

# ================================
# Begin builder stage
FROM base as builder
COPY rootfs /
WORKDIR /workspace

RUN npm install\
  && npm run test\
  && npm run build
# End builder stage
# ================================

# ================================
# Begin production stage
FROM base as production
# See https://github.com/nodejs/docker-node/blob/8bcc1712f430dcf5f22fffd6aef3db82698c296c/docs/BestPractices.md#handling-kernel-signals
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
COPY rootfs /
COPY --from=builder /workspace/dist/main.js /app/
CMD ["node", "/app/main.js"]
# End production stage
# ================================
