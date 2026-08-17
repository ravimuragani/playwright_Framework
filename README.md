# PlaywrightProject — SauceDemo E2E Tests

This repository contains Playwright end-to-end tests using a Page Object Model (POM) structure and data-driven test suites for https://www.saucedemo.com.

**Quick links**

- Tests: [tests](tests)
- Page objects: [pages](pages)
- Test data: [utils/sauceData.json](utils/sauceData.json)
- Fixtures: [tests/fixtures.ts](tests/fixtures.ts)
- Config: [playwright.config.ts](playwright.config.ts)

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

## Install

1. Install dependencies

```bash
npm install
```

2. Install Playwright browsers (if not already installed)

```bash
npx playwright install
```

## Project structure (important files)

- pages/: POM classes (e.g. `SauceLoginPage.ts`, `SauceProductsPage.ts`, `SauceCartPage.ts`, `SauceCheckoutPage.ts`, `SaucePOManager.ts`)
- tests/: Playwright tests (`saucedemo_order.spec.ts`, `saucedemo_order.all.spec.ts`, `fixtures.ts`)
- utils/: helpers and test data (`sauceData.json`, `dataProvider.ts`)
- playwright.config.ts: Playwright configuration and projects
- package.json: scripts for running tests and generating Allure reports

## Running tests

- Run the single spec (uses `tests/saucedemo_order.spec.ts` and the fixture dataset):

```bash
npx playwright test tests/saucedemo_order.spec.ts --project=chrome
```

- Run the data-driven suite that creates one test per entry in `utils/sauceData.json`:

```bash
npx playwright test tests/saucedemo_order.all.spec.ts --project=chrome
```

- Run a single dataset by environment variable (by index):

```bash
TEST_DATA_INDEX=1 npx playwright test tests/saucedemo_order.spec.ts --project=chrome
```

- Or by dataset `name` (requires unique `name` values in `utils/sauceData.json`):

```bash
TEST_DATA=standard_2 npx playwright test tests/saucedemo_order.spec.ts --project=chrome
```

- Stop on first failure:

```bash
npx playwright test tests/saucedemo_order.spec.ts --project=chrome -x
```

## Test data

- Edit `utils/sauceData.json` to add or change datasets. Each dataset should have a unique `name` to support `TEST_DATA` selection. Example fields:

```json
{
  "name": "standard",
  "username": "standard_user",
  "password": "secret_sauce",
  "firstName": "John",
  "lastName": "Doe",
  "postalCode": "12345",
  "productName": "Sauce Labs Backpack"
}
```

## Allure reporting

- Generate Allure report from results (project has `allureGen` / `allureOpen` scripts):

```bash
npm run allureGen
npm run allureOpen
```

## Git / CI notes

- For CI, install Node and the Playwright browsers, then run the tests. Use `TEST_DATA`/`TEST_DATA_INDEX` env vars to select datasets.

## Troubleshooting

- If a dataset produces UI errors (e.g., `problem_user` on SauceDemo), consider marking that dataset as expected-failing or removing it from the production dataset file.
- Use `npx playwright show-report` to open the HTML test report and `npx playwright show-trace <trace.zip>` to debug traces.

---

Created for upload to git; let me know if you want this expanded with CI workflow and badges.
