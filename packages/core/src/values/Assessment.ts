import { Brand } from "effect"

export type Assessment = ("correct" | "incorrect") & Brand.Brand<"Assessment">
export const Assessment = Brand.refined<Assessment>(
  (a) => ["correct", "incorrect"].includes(a),
  (a) => Brand.error(`Expected ${a} to be correct or incorrect`),
)
