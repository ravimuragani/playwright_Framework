import { test as base, expect } from "@playwright/test";
import { SaucePOManager } from "../pages/SaucePOManager";
import {
  loadSauceData,
  getSauceDataByName,
  getSauceDataByIndex,
} from "../utils/dataProvider";

type SauceData = {
  name: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  productName?: string;
};

type Fixtures = {
  sauceData: SauceData;
  po: SaucePOManager;
};

const data = loadSauceData();

export const test = base.extend<Fixtures>({
  sauceData: async ({}, use) => {
    // Select dataset by env var TEST_DATA (name) or TEST_DATA_INDEX (0-based index)
    const name = process.env.TEST_DATA;
    const idx = process.env.TEST_DATA_INDEX;
    let selected: SauceData | undefined;
    if (name) selected = getSauceDataByName(name);
    else if (idx) selected = getSauceDataByIndex(parseInt(idx, 10));
    else selected = data[0];
    // debug log env and selection
    // eslint-disable-next-line no-console
    console.log(
      `TEST_DATA='${name}', TEST_DATA_INDEX='${idx}', selected=${selected ? selected.name : "undefined"}`,
    );
    if (!selected) throw new Error("No test data found for provided selector");
    await use(selected);
  },

  po: async ({ page }, use) => {
    await use(new SaucePOManager(page));
  },
});

export { expect };
