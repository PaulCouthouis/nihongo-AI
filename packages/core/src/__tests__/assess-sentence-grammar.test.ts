import { beforeEach, describe, expect, it } from "vitest"
import { Effect } from "effect"
import { LanguageAssessor } from "../gateway/LanguageAssessor"
import { assessSentenceGrammar } from "../usecase/assessSentenceGrammar"
import { Sentence } from "../values/Sentence"
import { Assessment } from "../values/Assessment"
import { ParseError } from "@effect/schema/ParseResult"

describe("Assess Sentence Grammar", () => {
  let fixture: Fixture

  beforeEach(() => {
    fixture = buildFixture()
  })

  it("notifies correct assessment", () => {
    fixture.givenSentence("こんにちは、今日はいい天気ですね！")
    fixture.whenAssessSentenceGrammar()
    fixture.thenAssessmentIs("correct")
  })

  it("notifies incorrect assessment", () => {
    fixture.givenSentence("こんにちはを食べる")
    fixture.whenAssessSentenceGrammar()
    fixture.thenAssessmentIs("incorrect")
  })
})

const buildFixture = () => {
  let sentence: Sentence
  let program: Effect.Effect<LanguageAssessor, ParseError, Assessment>

  return {
    givenSentence: (input: string) => {
      sentence = Sentence(input)
    },
    whenAssessSentenceGrammar: () => {
      program = assessSentenceGrammar(sentence)
    },
    thenAssessmentIs: (output: "correct" | "incorrect") => {
      const runnable = Effect.provideService(
        program,
        LanguageAssessor,
        LanguageAssessor.of({
          assessSentenceGrammar: AssessSentenceGrammarStub,
        }),
      )

      expect(Effect.runSync(runnable)).toEqual(output)
    },
  }
}
type Fixture = ReturnType<typeof buildFixture>

const AssessSentenceGrammarStub = (sentence: Sentence) =>
  sentence === "こんにちは、今日はいい天気ですね！"
    ? Effect.succeed(Assessment("correct"))
    : Effect.succeed(Assessment("incorrect"))
