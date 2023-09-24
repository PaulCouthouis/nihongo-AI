import { describe, it, expect } from "vitest"
import { assessSentenceGrammar } from "nihongo-ai-core/src/usecase/assessSentenceGrammar"
import { JapaneseSentence } from "nihongo-ai-core/src/values/JapaneseSentence"
import { Effect } from "effect"
import { LanguageAssessor } from "nihongo-ai-core/src/gateway/LanguageAssessor"
import { LanguageAssessorLive } from "../adapters/LanguageAssessorLive"

describe("Language Assessor Integration Test", () => {
  it("replies with correct assessment", async () => {
    const sentence = JapaneseSentence("こんにちは、今日はいい天気ですね！")
    const program = assessSentenceGrammar(sentence)
    const runnable = Effect.provideService(
      program,
      LanguageAssessor,
      LanguageAssessorLive,
    )

    expect(await Effect.runPromise(runnable)).toBe("correct")
  })

  it("replies with incorrect assessment", async () => {
    const sentence = JapaneseSentence("こんにちはを食べる")
    const program = assessSentenceGrammar(sentence)
    const runnable = Effect.provideService(
      program,
      LanguageAssessor,
      LanguageAssessorLive,
    )

    expect(await Effect.runPromise(runnable)).toBe("incorrect")
  })
})
