export const shortString = (str: string): string =>
    str ? `${str.substring(0, 5)}...${str.substring(str.length - 5)}` : '';
