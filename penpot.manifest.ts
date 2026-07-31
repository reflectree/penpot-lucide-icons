import packageJson from "./package.json" with { type: "json" };

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

export function getPluginJsPath(unixBuildTime: number, isDev: boolean) {
  return "plugin.js";

  return isDev ? "plugin.js" : `plugin-${unixBuildTime}.js`;
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
