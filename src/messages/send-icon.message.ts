import * as v from "valibot";

export const SendIconSchema = v.object({
  __type: v.literal("send-icon"),
  svg: v.pipe(v.string(), v.nonEmpty()),
  title: v.pipe(v.string(), v.nonEmpty()),
})

export type SendIcon = v.InferOutput<typeof SendIconSchema>;
