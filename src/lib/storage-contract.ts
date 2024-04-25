import { useMemo } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";
import { PushPreset } from "../types/preset";

export const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
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
        name: "creator",
        type: "address",
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
            name: "creator",
            type: "address",
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
        name: "_data",
        type: "string",
      },
    ],
    name: "write",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const CONTRACT_ADDRESS = "0x0f36EA243A33A4Ede08CDEaB94F46530Fb13d480";

export const usePushPresetRead = (address: Address): PushPreset => {
  const { data } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "read",
    args: [address],
  });

  let parsed: any = {};

  try {
    parsed = JSON.parse((data as any)?.data as string);
    if (!!parsed && typeof parsed !== "object") {
      throw "Not an object";
    }
  } catch {
    // ignore
  }

  return useMemo(
    () => ({
      fireworks: parsed.fireworks || false,
      onboarding: parsed.onboarding || false,
      fromName: parsed.fromName || "",
      toName: parsed.toName || "",
      message: parsed.message || "",
    }),
    [
      parsed.fireworks,
      parsed.fromName,
      parsed.message,
      parsed.onboarding,
      parsed.toName,
    ]
  );
};
