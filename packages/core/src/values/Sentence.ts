import { Schema, brand, string } from "@effect/schema/Schema"

export const Sentence = string.pipe(brand("Sentence"))
export type Sentence = Schema.To<typeof Sentence>
