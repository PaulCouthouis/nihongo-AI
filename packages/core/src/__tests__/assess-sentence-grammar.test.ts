import { beforeEach, describe, expect, it } from "vitest"
import { Context, Effect, Layer, pipe } from "effect"
import { LanguageAssessor } from "../gateway/LanguageAssessor"
import { assessSentenceGrammar } from "../usecase/assessSentenceGrammar"
import { Sentence } from "../values/Sentence"
import { Assessment } from "../values/Assessment"

describe("Assess Sentence Grammar", () => {
  let fixture: Fixture

  beforeEach(() => {
    fixture = buildFixture()
  })

  it("notifies correct assessment", () => {
    fixture.givenSentence("This is a grammatically correct sentence")
    fixture.whenAssessSentenceGrammar()
    fixture.thenAssessmentIs("correct")
  })

  it("notifies incorrect assessment", () => {
    fixture.givenSentence("This is a grammatically incorrect sentence")
    fixture.whenAssessSentenceGrammar()
    fixture.thenAssessmentIs("incorrect")
  })
})

const buildFixture = () => {
  let sentence: Sentence
  let program: Effect.Effect<LanguageAssessor, never, Assessment>

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

const AssessSentenceGrammarStub = (
  sentence: Sentence,
): Effect.Effect<never, never, Assessment> =>
  sentence === "This is a grammatically correct sentence"
    ? Effect.succeed(Assessment("correct"))
    : Effect.succeed(Assessment("incorrect"))
