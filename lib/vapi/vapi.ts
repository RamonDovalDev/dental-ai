import Vapi from "@vapi-ai/web";

const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;

if (!apiKey) {
  throw new Error("An Api Key must be configured to use VAPI");
}

export const vapi = new Vapi(apiKey);
