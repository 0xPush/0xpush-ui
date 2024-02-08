import { Contract, JsonRpcProvider, JsonRpcSigner } from "ethers";
import { blastTestnet } from "../providers/web3-modal-provider";
import { PushPreset } from "../types/preset";

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "string",
            name: "from_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "to",
            type: "string",
          },
          {
            internalType: "string",
            name: "data",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct PushStorage.Push",
        name: "",
        type: "tuple",
      },
    ],
    name: "Created",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pushes",
    outputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "string",
        name: "from_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "to",
        type: "string",
      },
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "read",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "string",
            name: "from_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "to",
            type: "string",
          },
          {
            internalType: "string",
            name: "data",
            type: "string",
          },
        ],
        internalType: "struct PushStorage.Push",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "string",
        name: "_from",
        type: "string",
      },
      {
        internalType: "string",
        name: "_to",
        type: "string",
      },
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    name: "write",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const CONTRACT_ADDRESS = {
  [blastTestnet.chainId]: "0xA903E994ac8c7B233f52c7CC02A94d80e524eF31",
};

const ethersProvider = new JsonRpcProvider("https://sepolia.blast.io");

const contract = new Contract(
  CONTRACT_ADDRESS[blastTestnet.chainId],
  abi,
  ethersProvider
);

export const readPushPreset = async (
  toAddress: string
): Promise<PushPreset> => {
  const data = await contract.read(toAddress);

  return {
    fromAddress: data["0"] || null,
    fromName: data["1"] || null,
    toName: data["2"] || null,
  };
};

export const writePushPreset = async (
  signer: JsonRpcSigner,
  to: string,
  fromName: string,
  toName: string
) => {
  const contract = new Contract(
    CONTRACT_ADDRESS[blastTestnet.chainId],
    abi,
    signer
  );

  return await contract.write(to, fromName, toName, "");
};