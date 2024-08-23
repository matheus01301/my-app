FROM node:18-bullseye-slim AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:18-bullseye-slim

WORKDIR /app

RUN yarn global add serve

COPY --from=build /app/build ./build

EXPOSE 5000

CMD ["serve", "-s", "build", "-l", "5000"]
