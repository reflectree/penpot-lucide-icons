import * as v from "valibot";

export const MessageThemeSchema = v.object({
  __type: v.literal("themechange"),
  theme: v.picklist(["light", "dark"])
})

export type MessageTheme = v.InferOutput<typeof MessageThemeSchema>;
