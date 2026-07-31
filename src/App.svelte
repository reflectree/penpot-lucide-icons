<script lang="ts">
  import { MeowTabs } from "$lib/bits/tabs";
  import { Tabs } from "bits-ui";
  import { onMount } from "svelte";
  import type { Theme } from "@penpot/plugin-types";
  import { parse } from "valibot";
  import { MessageThemeSchema } from "./messages/theme-change.message";

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
  })

  onMount(updateTheme);
</script>

<div class="pt-3">
  <Tabs.Root value="icons">
    <MeowTabs.List class="body-s">
      <MeowTabs.Trigger value="icons">Icons</MeowTabs.Trigger>
      <MeowTabs.Trigger value="settings">Settings</MeowTabs.Trigger>
      <MeowTabs.Trigger value="info">Info</MeowTabs.Trigger>
    </MeowTabs.List>
    <div class="pt-3">
      <Tabs.Content value="icons">icons content</Tabs.Content>
      <Tabs.Content value="settings">settings content</Tabs.Content>
      <Tabs.Content value="info">info content</Tabs.Content>
    </div>
  </Tabs.Root>
</div>
