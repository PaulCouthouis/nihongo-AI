import { JapaneseSentence } from "nihongo-ai-core/src/values/Sentence"
import { openAi } from "../openAi"

export const completeSentenceGrammarAssessment = (sentence: Sentence) => {
  return openAi.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        You're a Japanese teacher able to tell whether or not a Japanese sentence is grammatically correct.

        I'm going to write you a sentence in Japanese, and you have to reply only in JSON format without explain.
        You must judge whether the phrase is grammatically correct and set "correct" or "incorrect" in an "assessment" property.
      `,
      },
      {
        role: "assistant",
        content: `cl
        Understood, please provide the Japanese sentence, and I will respond in the specified JSON format.
      `,
      },
      {
        role: "user",
        content: sentence,
      },
    ],
    model: "gpt-3.5-turbo",
  })
}
