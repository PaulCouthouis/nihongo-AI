import OpenAI from "openai"

export const openAi = new OpenAI({
  apiKey: import.meta.env.VITE_INTEGRATION_TEST_KEY, // defaults to process.env["OPENAI_API_KEY"]
})
