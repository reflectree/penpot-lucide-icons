import packageJson from "./package.json" with { type: "json" };
import * as path from "path";

export type PenpotPermission =
  | "content:read"
  | "content:write"
  | "library:read"
  | "library:write"
  | "user:read"
  | "comment:read"
  | "comment:write"
  | "allow:downloads"
  | "allow:localstorage";

export interface PenpotManifest {
  name: string;
  description: string;
  version: 1 | 2;
  code: string;
  icon: string;
  permissions?: PenpotPermission[];
}

export function getPluginJsPath() {
  const base = process.argv.includes('dev') ? '' : process.env.BASE_PATH ?? "";

  if (base !== '') {
    return `${base}/plugin.js`;
  }

  return "plugin.js";
}

export function getPenpotManifest(pluginJsPath: string): PenpotManifest {
  return {
    name: packageJson.name,
    code: pluginJsPath,
    description: packageJson.description,
    icon: "logo.png",
    version: 2,
    permissions: ["content:write"],
  };
}
