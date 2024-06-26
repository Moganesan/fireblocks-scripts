import dotenv from "dotenv";
dotenv.config();
import { FireblocksSDK } from "fireblocks-sdk";
import fs from "fs";
import path from "path";

const privateKey = fs.readFileSync(
  path.join(__dirname, "fireblocks_secret.key"),
  "utf-8"
);

const API_KEY: any = process.env.API_KEY;
const baseUrl = "https://sandbox-api.fireblocks.io";

const fireblocks = new FireblocksSDK(privateKey, API_KEY, baseUrl);

async function main() {
  let vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
  console.log(vaultAccounts);
}

async function createNewExternalWallet(name: string) {
  try {
    const newWallet = await fireblocks.createExternalWallet(name);
    return newWallet;
  } catch (err: any) {
    console.log(err.response.data);
    return;
  }
}

async function getExternalWallet(id: string) {
  try {
    const wallet = await fireblocks.getExternalWallet(id);
    return wallet;
  } catch (err: any) {
    console.log(err.response.data);
    return;
  }
}

main();
