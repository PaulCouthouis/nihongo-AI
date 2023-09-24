import { Context, Effect } from "effect"
import { JapaneseSentence } from "../values/JapaneseSentence"
import { Assessment } from "../values/Assessment"
import { ParseError } from "@effect/schema/ParseResult"

export type LanguageAssessor = {
  readonly assessSentenceGrammar: (
    sentence: Sentence,
  ) => Effect.Effect<never, ParseError, Assessment>
}
export const LanguageAssessor = Context.Tag<LanguageAssessor>()
