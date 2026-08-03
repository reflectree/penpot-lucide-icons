<script lang="ts">
  import Fuse from "fuse.js";
  import { indexTable } from "../index-table";
  import { Debounced } from "runed";
  import type { SendIcon } from "../messages/send-icon.message";

  const fuse = new Fuse(indexTable, {
    keys: [{ name: "name", weight: 2 }, "aliases", "tags", "categories"],
  });

  let search = $state("");
  const debouncedSearch = new Debounced(() => search, 500);

  const searchResults = $derived(fuse.search(debouncedSearch.current));

  const icons = $derived.by(() => {
    if (search !== "") {
      return searchResults.map((it) => it.item);
    } else {
      return indexTable;
    }
  });
</script>

<input
  placeholder={`Search ${icons.length} icons`}
  bind:value={search}
  class={[
    "sticky top-15 bg-b-tertiary rounded-lg w-full",
    "p-1 pt-2 pl-3 -outline-offset-1 outline-1 outline-transparent",
    "focus:outline-a-tertiary focus:bg-b-primary",
  ]}
/>

<div class="overflow-y-auto text-f-primary">
  <div class="flex flex-wrap justify-between pt-3 h-max">
    {#each icons as item}
      <button
        class="hover:bg-b-secondary rounded-md p-3"
        onclick={() => {
          parent.postMessage(
            { __type: "send-icon", svg: item.svg, title: item.name } satisfies SendIcon,
            "*",
          );
        }}
      >
        {@html item.svg}
      </button>
    {/each}
  </div>
</div>
