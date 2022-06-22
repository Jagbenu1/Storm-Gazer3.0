import { keysDev } from "./.dev";
import { keysProd } from "./prod";

export const keys = (process.env.NODE_ENV === "production") ? keysProd : keysDev;