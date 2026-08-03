import * as v from "valibot";

export const categories = [
  "accessibility",
  "account",
  "animals",
  "arrows",
  "buildings",
  "charts",
  "communication",
  "connectivity",
  "cursors",
  "design",
  "development",
  "devices",
  "emoji",
  "files",
  "finance",
  "food-beverage",
  "gaming",
  "home",
  "layout",
  "mail",
  "math",
  "medical",
  "multimedia",
  "nature",
  "navigation",
  "notifications",
  "people",
  "photography",
  "science",
  "seasons",
  "security",
  "shapes",
  "shopping",
  "social",
  "sports",
  "sustainability",
  "text",
  "time",
  "tools",
  "transportation",
  "travel",
  "weather",
] as const;

export const IconCategorySchema = v.picklist(categories);

export type IconCategory = v.InferOutput<typeof IconCategorySchema>;

export const IconDeprecationReasonSchema = v.picklist(["icon.renamed"]);

export type IconDeprecationReason = v.InferOutput<
  typeof IconDeprecationReasonSchema
>;

export const AliasDeprecationReasonSchema = v.picklist([
  "alias.typo",
  "alias.name",
  "alias.duplicate",
]);

export type AliasDeprecationReason = v.InferOutput<
  typeof AliasDeprecationReasonSchema
>;

export const VersionNumberSchema = v.pipe(
  v.string(),
  v.regex(/v[0-9]+(\.[0-9]+)+/),
);

export type VersionNumber = v.InferOutput<typeof VersionNumberSchema>;

export const IconAliasSchema = v.object({
  name: v.string(),
  deprecated: v.boolean(),
  deprecationReason: AliasDeprecationReasonSchema,
  toBeRemovedInVersion: v.optional(VersionNumberSchema),
});

export type IconAlias = v.InferOutput<typeof IconCategorySchema>;

export const LucideIconSchema = v.object({
  aliases: v.optional(v.array(IconAliasSchema)),
  categories: v.array(IconCategorySchema),
  contributors: v.pipe(v.array(v.string()), v.minLength(1)),
  tags: v.array(v.string()),
  "use-cases": v.array(v.string()),
  deprecated: v.optional(v.boolean()),
  deprecationReason: v.optional(IconDeprecationReasonSchema),
  toBeRemovedInVersion: v.optional(VersionNumberSchema),
});

export type LucideIcon = v.InferOutput<typeof LucideIconSchema>;
