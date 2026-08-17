import fs from "fs";
import path from "path";

type SauceData = {
  name: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  productName?: string;
};

export function loadSauceData(): SauceData[] {
  const p = path.join(__dirname, "sauceData.json");
  const raw = fs.readFileSync(p, "utf-8");
  return JSON.parse(raw) as SauceData[];
}

export function getSauceDataByName(name: string): SauceData | undefined {
  const data = loadSauceData();
  return data.find((d) => d.name === name);
}

export function getSauceDataByIndex(index: number): SauceData | undefined {
  const data = loadSauceData();
  return data[index];
}
