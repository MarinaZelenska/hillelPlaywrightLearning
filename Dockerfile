FROM node:18-slim

WORKDIR /app

COPY package.json ./

RUN npm install \
    @playwright/test@1.45.0 \
    @faker-js/faker@8.4.1 \
    dotenv@16 \
    @types/node@18 \
    --legacy-peer-deps

RUN npx playwright install chromium firefox --with-deps


COPY . .

CMD ["sh", "-c", "npx playwright test --project=setup && npx playwright test --project=firefox"]

