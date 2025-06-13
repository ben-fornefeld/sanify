export const DEFAULT_TIMEOUT = () =>
  new Promise<void>((r) => setTimeout(r, 300));

export const NAVBAR_WIDTH = "240px";
export const NAVBAR_HEIGHT = "100px";
export const PADDING = "30px";

export const COLORS = {
  primary: "#6B52AE", // Deep Indigo/Purple
  grayDark: "#181818",
  grayCharcoal: "#333333",
  grayLight: "#555555",
  graySilver: "#AAAAAA",
  accentBlue: "#007ACC",
  accentGreen: "#4CAF50",
  accentRed: "#FF5722",
  textWhite: "#FFFFFF",
  textOffWhite: "#F5F5F5",
};

export const SHADOWS = {
  stripe: "rgba(149, 157, 165, 0.8) 0px 8px 24px;",
};
