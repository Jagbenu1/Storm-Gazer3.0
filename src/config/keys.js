export const keys =
  process.env.NODE_ENV === "production"
    ? import("./prod").then(({ keysProd }) => keysProd)
    : import("./.dev").then(({ keysDev }) => keysDev);
