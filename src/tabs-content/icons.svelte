<script lang="ts">
  import Fuse from "fuse.js";
  import { indexTable } from "../index-table";
  import { Debounced } from "runed";
  import type { SendIcon } from "../messages/send-icon.message";
  import Search from "$lib/components/search.svelte";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import { Portal } from "bits-ui";
  import { UNDER_TABS_PORTAL_ID, via } from "../portals";
  import { store } from "../stores/store.svelte";

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

{#if store.currentTab === "icons"}
  <Portal to={via(UNDER_TABS_PORTAL_ID)}>
    <Search
      class={{ input: "rounded-r-none" }}
      placeholder={`Search ${icons.length} icons`}
      bind:value={search}
    />
    <button
      class={[
        "bg-b-tertiary flex items-center gap-1 p-0 pl-2 body-m",
        "text-nowrap rounded-lg rounded-l-none",
        "-outline-offset-1 outline-1 outline-transparent",
        "focus:outline-a-tertiary focus:bg-b-primary",
      ]}
    >
      All categories
      <ChevronDown class="scale-60" />
    </button>
  </Portal>
{/if}

<div
  class="text-f-primary flex flex-wrap justify-between pt-2 h-max"
>
  {#each icons as item}
    <button
      class="hover:bg-b-secondary rounded-md p-3"
      onclick={() => {
        parent.postMessage(
          {
            __type: "send-icon",
            svg: item.svg,
            title: item.name,
          } satisfies SendIcon,
          "*",
        );
      }}
    >
      {@html item.svg}
    </button>
  {/each}
</div>
