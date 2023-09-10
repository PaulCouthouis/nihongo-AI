import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_INTEGRATION_TEST_KEY, // defaults to process.env["OPENAI_API_KEY"]
})

export const main = async () => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
          You're a Japanese teacher able to tell whether or not a Japanese sentence is grammatically correct. 

          I'm going to write you a sentence in Japanese, and you have to reply only in JSON format without explain. 
          If what you receive is not a Japanese sentence, then you must respond with a JSON with an "ok" property of false and an "error" property of "not japanese". 
          If what you receive is a Japanese phrase, there's no "error" property and the "ok" property is set to true. 
          You must then judge whether the phrase is grammatically correct and set "correct" or "incorrect" in an "assessment" property.
        `,
      },
      {
        role: "assistant",
        content: `
          Understood, please provide the Japanese sentence, and I will respond in the specified JSON format.
        `,
      },
      {
        role: "user",
        content: `
        I am Paul.
        `,
      },
    ],
    model: "gpt-3.5-turbo",
  })

  const json = JSON.parse(completion.choices[0].message.content ?? "")
  console.log(json)
}
