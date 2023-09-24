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

export const JapaneseSentence = string.pipe(Japanese, brand("Sentence"))
export type JapaneseSentencße = Schema.To<typeof JapaneseSentence>

export const parseJapaneseSentence = parseEither(JapaneseSentence)
