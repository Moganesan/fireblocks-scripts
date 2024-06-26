import dotenv from "dotenv";
dotenv.config();
import {
  AssetScope,
  FireblocksSDK,
  PeerType,
  TransactionArguments,
} from "fireblocks-sdk";
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
  // await createNewWallet("Test Vault");
  let vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
  console.log("Vault Accounts", vaultAccounts);
  await withdrawFunds("0.1");
}

async function createNewWallet(name: string) {
  try {
    const newWallet = await fireblocks.createVaultAccount(name);
    return newWallet;
  } catch (err: any) {
    console.log(err.response.data);
    return;
  }
}

async function addAssetToVault(vaultAccountId: string, assetId: string) {
  try {
    await fireblocks.createVaultAsset(vaultAccountId, assetId);
    console.log(`Added ${assetId} asset to ${vaultAccountId} account.`);
  } catch (err: any) {
    console.log(err.response.data);
    return [];
  }
}
async function getAllAssets() {
  try {
    const assets = await fireblocks.getSupportedAssets();

    return assets;
  } catch (err: any) {
    console.log(err.response.data);
    return;
  }
}

async function withdrawFunds(amount: string) {
  const assetId = "ETH_TEST5";
  const vaultId = "3";
  const payload: TransactionArguments = {
    assetId: assetId,
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: vaultId,
    },
    destination: {
      type: PeerType.ONE_TIME_ADDRESS,
      oneTimeAddress: {
        address: String("0x17206eE0F5F452cc9EA68374e2fe7BC62400c3A1"),
      },
    },
    amount: String(amount),
    note: "Withdraw Tx Created by fireblocks SDK",
  };

  try {
    const txRes = await fireblocks.createTransaction(payload);
    console.log(txRes);
  } catch (err: any) {
    console.log(err.response.data);
    return;
  }
}

main();
