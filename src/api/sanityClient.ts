import { createClient } from "@sanity/client";
const apiKey = "uba97uw5";

const client = createClient({
  projectId: apiKey,
  dataset: "production",
  useCdn: false, // Enable this for production, disable for development
});

export default client;
