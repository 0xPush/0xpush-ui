import styled from "@emotion/styled";

import React, { forwardRef } from "react";
import { StyledInput } from "./styled-input";

const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

interface InputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "ref" | "onChange" | "as"> {
  value: string | number;
  onUserInput: (input: string) => void;
  error?: boolean;
  fontSize?: string;
  align?: "right" | "left";
  prependSymbol?: string;
  maxDecimals?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onUserInput,
      placeholder,
      prependSymbol,
      maxDecimals,
      ...rest
    }: InputProps,
    ref
  ) => {
    const enforcer = (nextUserInput: string) => {
      if (
        nextUserInput === "" ||
        inputRegex.test(escapeRegExp(nextUserInput))
      ) {
        const decimalGroups = nextUserInput.split(".");
        if (
          maxDecimals &&
          decimalGroups.length > 1 &&
          decimalGroups[1].length > maxDecimals
        ) {
          return;
        }

        onUserInput(nextUserInput);
      }
    };

    const formatValueWithLocale = (value: string | number) => {
      const [searchValue, replaceValue] = [/,/g, "."];
      return value.toString().replace(searchValue, replaceValue);
    };

    const valueFormattedWithLocale = formatValueWithLocale(value);

    return (
      <StyledInput
        {...rest}
        ref={ref}
        value={
          prependSymbol && value
            ? prependSymbol + valueFormattedWithLocale
            : valueFormattedWithLocale
        }
        onChange={(event) => {
          if (prependSymbol) {
            const value = event.target.value;

            // cut off prepended symbol
            const formattedValue = value.toString().includes(prependSymbol)
              ? value
                  .toString()
                  .slice(prependSymbol.length, value.toString().length + 1)
              : value;

            // replace commas with periods, because uniswap exclusively uses period as the decimal separator
            enforcer(formattedValue.replace(/,/g, "."));
          } else {
            enforcer(event.target.value.replace(/,/g, "."));
          }
        }}
        // universal input options
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        // text-specific options
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={placeholder || "0"}
        minLength={1}
        maxLength={79}
        spellCheck="false"
      />
    );
  }
);

Input.displayName = "Input";

const MemoizedInput = React.memo(Input);
export { MemoizedInput as NumericalInput };

export const StyledNumericalInput = styled(MemoizedInput)<{
  $loading: boolean;
}>`
  text-align: left;
  font-size: 36px;
  font-weight: 485;
  max-height: 44px;
`;
