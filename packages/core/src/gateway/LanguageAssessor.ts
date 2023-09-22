import { Context, Effect } from "effect"
import { Sentence } from "../values/Sentence"
import { Assessment } from "../values/Assessment"
import { ParseError } from "@effect/schema/ParseResult"

export type LanguageAssessor = {
  readonly assessSentenceGrammar: (
    sentence: Sentence,
  ) => Effect.Effect<never, ParseError, Assessment>
}
export const LanguageAssessor = Context.Tag<LanguageAssessor>()
