import { Brand } from "effect"

export type Sentence = string & Brand.Brand<"Sentence">
export const Sentence = Brand.nominal<Sentence>()
