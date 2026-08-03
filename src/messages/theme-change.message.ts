import * as v from "valibot";

export const MessageThemeSchema = v.object({
  __type: v.literal("theme-change"),
  theme: v.picklist(["light", "dark"])
})

export type MessageTheme = v.InferOutput<typeof MessageThemeSchema>;
