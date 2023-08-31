import { Context, Effect } from "effect"
import { Sentence } from "../values/Sentence"
import { Assessment } from "../values/Assessment"

export type LanguageAssessor = {
  readonly assessSentenceGrammar: (
    sentence: Sentence,
  ) => Effect.Effect<never, never, Assessment>
}
export const LanguageAssessor = Context.Tag<LanguageAssessor>()
