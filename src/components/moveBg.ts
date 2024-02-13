import { css } from "@emotion/react";

const colors = {
  purple: "#9945FF",
  green: "#14F195",
  pink: "#f72585",
};

export const moveBg = css`
  --bg-size: 400%;
  --color-one: ${colors.purple};
  --color-two: ${colors.pink};
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / var(--bg-size) 100%;
  animation: move-bg 10s infinite linear;
  color: transparent;
  background-clip: text;

  @keyframes move-bg {
    to {
      background-position: var(--bg-size) 0;
    }
  }
`;
