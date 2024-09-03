import dotenv from "dotenv";

dotenv.config();

const environment = {
  svPort: process.env.svPort,
  svHost: process.env.svHost,
  zvToken: process.env.zvToken,
  trToken: process.env.trToken
};

export default environment;