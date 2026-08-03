import * as path from "path";
import * as fs from "fs";
import * as v from "valibot";

import { simpleGit, CleanOptions, type SimpleGit, GitError } from "simple-git";
import { Glob } from "glob";
import { LucideIconSchema, type LucideIcon } from "./schemas.ts";

const args = process.argv.slice(2);

const noGit = args.includes("--no-git");
const isStarted = args.includes("run");
const isHelp = args.includes("help") || args.includes("h") || args.length === 0;

if (isHelp || !isStarted) {
  console.log(
    `
PROGRAM:
generate-icons.ts [COMMANDS] {OPTIONS}

COMMANDS:
    show this instruction:
        help (h)
    run this script
        run

OPTIONS:
    Ignore cloning repository through git
    (lucide-ignore inside ./scripts repository cloned required):
        --no-git

DESCRIPTION:
Helps prepare icon from lucide repository to use it inside plugin.

EXAMPLES:
- npx jiti ./scripts/generate-icons.ts help # show this instruction
- npx jiti ./scripts/generate-icons.ts run # run program
- npx jiti ./scripts/generate-icons.ts run --no-git # run program but without cloning repository
        `.trim(),
  );

  process.exit(0);
}

const LUCIDE_REPO = "https://github.com/lucide-icons/lucide.git";
const CLONED_NAME = "lucide-ignore";
const repoPath = path.join(__dirname, CLONED_NAME);

if (noGit) {
  const stat = await new Promise<fs.Stats>((res, rej) =>
    fs.stat(repoPath, (err, stats) => (err ? rej(err) : res(stats))),
  );

  if (!stat.isDirectory) {
    console.log("lucide-ignore isn't a directory");
    process.exit(1);
  }
} else {
  const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

  const cloneResult = await new Promise((res) =>
    git.clone(LUCIDE_REPO, repoPath, ["--depth=1"], res),
  );

  if (cloneResult instanceof GitError) {
    console.log(cloneResult);
    process.exit(1);
  }

  console.log("~ Cloned!");
}

const pathIcons = path.join(__dirname, CLONED_NAME, "icons");

const jsonFilesGlob = path.join(pathIcons, "*.json");
const iconFilesGlob = path.join(pathIcons, "*.svg");

const jsonGlob = new Glob(jsonFilesGlob, {});
const iconGlob = new Glob(iconFilesGlob, {});

class IndexTableRecord {
  name: string = "";
  svg: string = "";
  aliases: string[] = [];
  tags: string[] = [];
  categories: string[] = [];
  useCases: string[] = [];

  static fromLucideIcon(name: string, icon: LucideIcon) {
    const it = new IndexTableRecord();

    it.name = name;

    it.aliases = (icon.aliases ?? [])
      .filter((it) => !it.deprecated)
      .map((it) => it.name);

    it.tags = icon.tags;
    it.categories = icon.categories;
    it.useCases = icon["use-cases"];

    return it;
  }
}

const indexTable: IndexTableRecord[] = [];
let jsonCounter = 0;

for await (const jsonPath of jsonGlob) {
  try {
    const info = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const json = v.parse(LucideIconSchema, info);

    if (json.deprecated) {
      continue;
    }

    const name = path.parse(jsonPath).name.replace(".json", "");

    indexTable.push(IndexTableRecord.fromLucideIcon(name, json));
  } catch (error) {
    if (v.isValiError(error)) {
      console.log(`error: ${error} on ${jsonCounter}`);
    }
  } finally {
    jsonCounter++;
  }
}

let iconCounter = 0;
for await (const _ of iconGlob) {
  iconCounter++;
}

console.log("Found:");
console.log(`JSONs (${jsonCounter}), icons (${iconCounter})`);

if (iconCounter > jsonCounter) {
  console.log("[warn]: JSONs & icons mismatch by length");
}

indexTable.forEach((indexRecord) => {
  const svg = `${indexRecord.name}.svg`;
  const pathToSvg = path.join(pathIcons, svg);
  indexRecord.svg = fs.readFileSync(pathToSvg, "utf-8");
});

const indexTableJson = JSON.stringify(indexTable);

const jsonDestination = path.join(
  __dirname,
  "..",
  "src",
  "lib",
  "index-table.json",
);

fs.writeFileSync(jsonDestination, indexTableJson);
