import {
  Schema,
  brand,
  filter,
  parseEither,
  string,
} from "@effect/schema/Schema"

import { isJapanese } from "wanakana"

const Japanese = filter((s: string) => isJapanese(s), {
  message: () => "Must be japanese.",
})

export const Sentence = string.pipe(Japanese, brand("Sentence"))
export type Sentence = Schema.To<typeof Sentence>

export const parseJapaneseSentence = parseEither(Sentence)
