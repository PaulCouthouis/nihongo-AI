import { LanguageAssessor } from "nihongo-ai-core/src/gateway/LanguageAssessor"
import { parseAssessment } from "nihongo-ai-core/src/values/Assessment"
import { Sentence } from "nihongo-ai-core/src/values/Sentence"
import { completeSentenceGrammarAssessment } from "../completions/assessSentenceGrammarCompletion"
import { Effect, pipe } from "effect"

export const LanguageAssessorLive = LanguageAssessor.of({
  assessSentenceGrammar: (sentence: Sentence) => {
    Effect.logInfo("START: Call AI API for Assess Sentence Grammar")

    return pipe(
      Effect.promise(() => completeSentenceGrammarAssessment(sentence)),
      Effect.tap(() =>
        Effect.logInfo("END: Call AI API for Assess Sentence Grammar"),
      ),
      Effect.map((completion) => completion.choices[0].message.content),
      Effect.tap((v) => Effect.logInfo(v)),
      Effect.map((v) => JSON.parse(v ?? "")),
      Effect.map((json) => json.assessment),
      Effect.flatMap(parseAssessment),
    )
  },
})
