import meowIndexTable from "$lib/index-table.json" with { type: "json" };

export type IndexTableItem = (typeof meowIndexTable)[number];

export const indexTable = meowIndexTable;
