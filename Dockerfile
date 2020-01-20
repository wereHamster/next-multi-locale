FROM node:12 as builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn next build
RUN yarn install --frozen-lockfile --production

FROM node:12
WORKDIR /app

# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile --production && yarn cache clean
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next/
COPY --from=builder /app/node_modules ./node_modules/

CMD yarn next start
