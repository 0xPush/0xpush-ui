import { useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import { ETHER_TOKEN, Token } from "../types/token";

const Container = styled.div<{ dark: boolean }>`
  z-index: 1;

  .react-select__control {
    background: inherit;
    border: 1px solid;
    border-color: inherit;
    height: 40px;
  }

  .react-select__single-value {
    color: inherit;
  }

  .react-select__menu {
    background: ${(p) => (p.dark ? "#151515" : "#fff")};

    ${(p) =>
      p.dark &&
      css`
        border: 1px solid #737373;
      `}
  }

  .react-select__input-container {
    color: ${(p) => (p.dark ? "#fff" : "#151515")};
  }

  .react-select__option {
    &--is-focused {
      background-color: ${(p) => (p.dark ? "#313131" : "#dbecff")};
    }

    &--is-selected {
      background-color: ${(p) => (p.dark ? "#656565" : "#1b72ea")};
    }
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const OptionCoin = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// const ShortMint = styled.div<{ isSelected?: boolean }>`
//   font-size: 12px;
//   color: ${(p) => (p.isSelected ? "white" : "#8c8c8c")};
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   margin-right: 7px;
// `;

const Amount = styled.div``;

const Option = (props: OptionProps<Token>) => {
  const token = props.data;
  //   const img = token?.nft
  //     ? token.nft.imageUrl
  //     : token.info?.logoURI || "/logo/logo.svg";
  //   const symbol = token?.nft ? token.nft.name : token.info?.symbol || "Unknown";
  //   const name = token?.nft ? "" : token?.info?.name || "";
  //   const shortMint = shortString(token);

  return (
    <components.Option {...props}>
      <OptionWrapper>
        <OptionCoin>
          <img
            width={20}
            height={20}
            src={token.icon || "/logo/logo.svg"}
            alt={token.ticker}
          />
          <div>{token.ticker}</div>
        </OptionCoin>
        {token.amount && <Amount>{token.amount}</Amount>}
      </OptionWrapper>
    </components.Option>
  );
};

const SingleValue = ({ children, ...props }: SingleValueProps<Token>) => {
  const token = props.data;
  //   const img = token?.nft
  //     ? token.nft.imageUrl
  //     : token.info?.logoURI || "/logo/logo.svg";
  //   const symbol = token?.nft ? token.nft.name : token.info?.symbol || "Unknown";
  //   const name = token?.nft ? "" : token?.info?.name || "";
  //   const shortMint = shortString(token);

  return (
    <components.SingleValue {...props}>
      <OptionWrapper>
        <OptionCoin>
          <img
            width={20}
            height={20}
            src={token.icon || "/eth-logo.svg"}
            alt={token.ticker}
          />
          <div>{token.ticker}</div>
        </OptionCoin>
      </OptionWrapper>
    </components.SingleValue>
  );
};

interface TokenSelectProps {
  className?: string;
  onChange: (token: Token) => void;
  showTokenName?: boolean;
}

const TOKENS: Token[] = [ETHER_TOKEN];

export const TokenSelect = ({
  className,
  onChange,
}: TokenSelectProps): JSX.Element => {
  const [token, setToken] = useState<Token>(TOKENS[0]);

  const { colorMode } = useColorMode();

  const getLabel = (option: Token) => option.ticker;

  return (
    <Container dark={colorMode === "dark"} className={className}>
      <Select<Token>
        classNamePrefix="react-select"
        value={token}
        options={TOKENS}
        getOptionLabel={getLabel}
        getOptionValue={(option) => option.ticker}
        isSearchable={false}
        onChange={(value) => {
          setToken(value as Token);
          onChange(value as Token);
        }}
        components={{
          Option,
          // @ts-ignore
          SingleValue: (props: SingleValueProps) => <SingleValue {...props} />,
        }}
        defaultValue={TOKENS[0]}
        menuPlacement="auto"
      />
    </Container>
  );
};
