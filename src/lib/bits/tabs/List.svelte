<script lang="ts">
  import { Tabs, type TabsListProps } from "bits-ui";
  import { cn } from "$lib/cn";

  const { class: className, children, ...props }: TabsListProps = $props();
</script>

<Tabs.List
  class={cn("flex rounded-lg bg-b-secondary p-0.5 h-9", className)}
  {...props}
>
  {@render children?.()}
</Tabs.List>
