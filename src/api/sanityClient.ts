import { createClient } from "@sanity/client";
//const apiKey = "uba97uw5";
const apiKey = "j6m9ojxd";

const client = createClient({
  projectId: apiKey,
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false, // Enable this for production, disable for development
});

export default client;
