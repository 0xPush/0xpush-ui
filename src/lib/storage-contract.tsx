import { Contract, JsonRpcProvider, JsonRpcSigner } from "ethers";
import { blastTestnet } from "../providers/web3-modal-provider";

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
  [blastTestnet.chainId]: "0xc6a62CC8E30763824c29739E465fBa7D9BaDfe40",
};

const ethersProvider = new JsonRpcProvider("https://sepolia.blast.io");

const contract = new Contract(
  CONTRACT_ADDRESS[blastTestnet.chainId],
  abi,
  ethersProvider
);

export const readPushData = async (to: string) => {
  const data = await contract.read(to);

  return {
    from_address: data["0"],
    from_name: data["1"],
    to_name: data["2"],
  };
};

export const savePushData = async (
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
