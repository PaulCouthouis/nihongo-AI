import { union, literal, Schema, brand } from "@effect/schema/Schema"

const Incorrect = literal("incorrect")
const Correct = literal("correct")
export const Assessment = union(Correct, Incorrect).pipe(brand("Assessment"))

export type Assessment = Schema.To<typeof Assessment>
