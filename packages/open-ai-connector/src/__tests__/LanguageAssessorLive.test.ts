import { describe, it, expect } from "vitest"
import { assessSentenceGrammar } from "nihongo-ai-core/src/usecase/assessSentenceGrammar"
import { Sentence } from "nihongo-ai-core/src/values/Sentence"
import { Effect } from "effect"
import { LanguageAssessor } from "nihongo-ai-core/src/gateway/LanguageAssessor"
import { LanguageAssessorLive } from "../adapters/LanguageAssessorLive"

describe("Language Assessor Integration Test", () => {
  it("replies with correct assessment", async () => {
    const sentence = Sentence("こんにちは、今日はいい天気ですね！")
    const program = assessSentenceGrammar(sentence)
    const runnable = Effect.provideService(
      program,
      LanguageAssessor,
      LanguageAssessorLive,
    )

    expect(await Effect.runPromise(runnable)).toBe("correct")
  })

  it("replies with incorrect assessment", async () => {
    const sentence = Sentence("こんにちはを食べる")
    const program = assessSentenceGrammar(sentence)
    const runnable = Effect.provideService(
      program,
      LanguageAssessor,
      LanguageAssessorLive,
    )

    expect(await Effect.runPromise(runnable)).toBe("incorrect")
  })
})
