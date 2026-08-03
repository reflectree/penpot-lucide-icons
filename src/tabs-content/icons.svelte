<script lang="ts">
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import Check from "@lucide/svelte/icons/check";
  import ChevronsUp from "@lucide/svelte/icons/chevrons-up";
  import ChevronsDown from "@lucide/svelte/icons/chevrons-down";

  import Fuse from "fuse.js";
  import { indexTable } from "../index-table";
  import { Debounced } from "runed";
  import type { SendIcon } from "../messages/send-icon.message";
  import Search from "$lib/components/search.svelte";
  import { Portal, Select } from "bits-ui";
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
    <Select.Root
      type="single"
      items={store.categories}
      bind:value={store.currentCategory}
    >
      <Select.Trigger
        class={[
          "bg-b-tertiary flex items-center pr-0 pl-2 body-m",
          "text-nowrap rounded-lg rounded-l-none",
          "-outline-offset-1 outline-1 outline-transparent",
          "focus:outline-a-tertiary focus:bg-b-primary",
          "focus:bg-b-quaternary",
        ]}
      >
        <Select.Value />
        <ChevronDown class="scale-60" />
      </Select.Trigger>
      <Select.Portal>
        <Select.ContentStatic
          class={[
            "fixed h-[calc(100vh-var(--spacing)*22)] right-0.5 top-23",
            "bg-b-tertiary p-2 outline-2 rounded-md outline-b-quaternary",
          ]}
        >
          <Select.ScrollUpButton
            class="flex w-full h-max items-center justify-center"
          >
            <ChevronsUp class="size-3" />
          </Select.ScrollUpButton>
          <Select.Viewport>
            {#each store.categories as category, i (i + category.value)}
              <Select.Item
                class="flex cursor-pointer"
                value={category.value}
                label={category.label}
              >
                {#snippet children({ selected })}
                  {category.label}
                  {#if selected}
                    <div class="ml-auto">
                      <Check aria-label="check" />
                    </div>
                  {/if}
                {/snippet}
              </Select.Item>
            {/each}
          </Select.Viewport>
          <Select.ScrollDownButton
            class="flex w-full items-center justify-center"
          >
            <ChevronsDown class="size-3" />
          </Select.ScrollDownButton>
        </Select.ContentStatic>
      </Select.Portal>
    </Select.Root>
  </Portal>
{/if}

<div class="text-f-primary flex flex-wrap justify-between pt-2 h-max">
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
