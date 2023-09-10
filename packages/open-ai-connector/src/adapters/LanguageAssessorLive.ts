import { Effect } from "effect"
import { LanguageAssessor } from "nihongo-ai-core/src/gateway/LanguageAssessor"
import { Assessment } from "nihongo-ai-core/src/values/Assessment"
import { Sentence } from "nihongo-ai-core/src/values/Sentence"

export const LanguageAssessorLive = LanguageAssessor.of({
  assessSentenceGrammar: (sentence: Sentence) => {
    const json = `
      { 
        "ok": true,
        "assessment": "incorrect"
      }
    `

    const response = JSON.parse(json)

    return Effect.succeed(Assessment(response.assessment))
  },
})
