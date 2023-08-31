import { Effect } from "effect"
import { LanguageAssessor } from "../gateway/LanguageAssessor"
import { Sentence } from "../values/Sentence"

export const assessSentenceGrammar = (sentence: Sentence) => {
  return LanguageAssessor.pipe(
    Effect.flatMap(({ assessSentenceGrammar }) =>
      assessSentenceGrammar(sentence),
    ),
  )
}
