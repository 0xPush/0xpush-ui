import { Contract, ContractRunner, JsonRpcSigner } from "ethers";
import { PushPreset } from "../types/preset";

const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "data",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct PushStorage.Push",
        "name": "",
        "type": "tuple"
      }
    ],
    "name": "Created",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "pushes",
    "outputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "read",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "data",
            "type": "string"
          }
        ],
        "internalType": "struct PushStorage.Push",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_data",
        "type": "string"
      }
    ],
    "name": "write",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const CONTRACT_ADDRESS = "0x0f36EA243A33A4Ede08CDEaB94F46530Fb13d480";

export const getPushStorageContract = (provider: ContractRunner): Contract => {
  return new Contract(CONTRACT_ADDRESS, abi, provider);
};

export const readPushPreset = async (
  toAddress: string,
  provider: ContractRunner
): Promise<PushPreset> => {
  const rawPreset = await getPushStorageContract(provider).read(toAddress);

  let onboarding = false;
  let fireworks = false;
  let message = "";
  try {
    const data = JSON.parse(rawPreset["3"]);
    if (data.onboarding === true) {
      onboarding = true;
    }
    if (data.fireworks === true) {
      fireworks = true;
    }

    if (typeof data?.message === "string") {
      message = data.message;
    }
  } catch (error) {
    //
  }

  return {
    fromAddress: rawPreset["0"] || null,
    fromName: rawPreset["1"] || null,
    toName: rawPreset["2"] || null,
    onboarding,
    fireworks,
    message,
  };
};

export const writePushPreset = async (
  signer: JsonRpcSigner,
  to: string,
  fromName: string,
  toName: string,
  onboarding: boolean,
  fireworks: boolean,
  message: string
) => {
  const data =
    onboarding || fireworks || message
      ? JSON.stringify({ onboarding, fireworks, message })
      : "";

  return await getPushStorageContract(signer).write(to, fromName, toName, data);
};
