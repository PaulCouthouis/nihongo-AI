import { Effect } from "effect"
import { LanguageAssessor } from "../gateway/LanguageAssessor"
import { JapaneseSentence } from "../values/JapaneseSentence"

export const assessSentenceGrammar = (sentence: Sentence) => {
  return LanguageAssessor.pipe(
    Effect.flatMap(({ assessSentenceGrammar }) =>
      assessSentenceGrammar(sentence),
    ),
  )
}
