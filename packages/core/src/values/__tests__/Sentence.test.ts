import { describe, expect, it } from "vitest"
import { parseJapaneseSentence } from "../JapaneseSentence"
import { Either } from "effect"

describe("Sentence", () => {
  it("is a japanese sentence", () => {
    const sentence = parseJapaneseSentence("僕はＰａｕｌです。")

    expect(Either.isRight(sentence)).toBe(true)
  })

  it("is not a japanese sentence", () => {
    const sentence = parseJapaneseSentence("I am Paul.")

    expect(Either.isLeft(sentence)).toBe(true)
  })
})
