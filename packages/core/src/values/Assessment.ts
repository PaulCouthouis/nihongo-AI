import {
  union,
  literal,
  Schema,
  brand,
  parseEither,
} from "@effect/schema/Schema"

export const Assessment = literal("correct", "incorrect").pipe(
  brand("Assessment"),
)
export type Assessment = Schema.To<typeof Assessment>

export const parseAssessment = parseEither(Assessment)
