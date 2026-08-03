<script lang="ts">
  import { MeowTabs } from "$lib/bits/tabs";
  import { Tabs } from "bits-ui";
  import { onMount } from "svelte";
  import type { Theme } from "@penpot/plugin-types";
  import { parse } from "valibot";
  import { MessageThemeSchema } from "./messages/theme-change.message";
  import Icons from "./tabs-content/icons.svelte";
  import { UNDER_TABS_PORTAL_ID } from "./portals";
  import { store } from "./stores/store.svelte";

  function updateTheme(theme?: Theme) {
    if (theme === undefined) {
      const url = new URL(window.location.href.replace("/#/", "/"));
      const theme = url.searchParams.get("theme");
      document.documentElement.setAttribute("data-theme", theme ?? "light");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  window.addEventListener("message", (event) => {
    const theme = parse(MessageThemeSchema, event.data);

    updateTheme(theme.theme);
  });

  onMount(updateTheme);
</script>

<div class="flex flex-col">
  <Tabs.Root bind:value={store.currentTab}>
    <div class="bg-b-primary sticky top-0 pt-2 w-full">
      <MeowTabs.List class="body-s sticky h-max">
        <MeowTabs.Trigger value="icons">Icons</MeowTabs.Trigger>
        <MeowTabs.Trigger value="settings">Settings</MeowTabs.Trigger>
        <MeowTabs.Trigger value="info">Info</MeowTabs.Trigger>
      </MeowTabs.List>
      <div
        id={UNDER_TABS_PORTAL_ID}
        class={store.currentTab === "icons" ? "flex gap-1 pt-2" : ""}
      ></div>
    </div>
    <Tabs.Content value="icons" class="flex-1 h-full">
      <Icons />
    </Tabs.Content>
    <Tabs.Content value="settings">settings content</Tabs.Content>
    <Tabs.Content value="info">info content</Tabs.Content>
  </Tabs.Root>
</div>
