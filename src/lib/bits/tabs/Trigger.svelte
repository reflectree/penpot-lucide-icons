<script lang="ts">
  import { Tabs, type TabsTriggerProps } from "bits-ui";
  import { cn } from "$lib/cn";

  const { class: className, children, ...props }: TabsTriggerProps = $props();
</script>

<Tabs.Trigger
  class={cn(
    "flex-1 rounded-md",
    "data-[state=active]:text-a-primary text-f-secondary hover:text-f-primary",
    "data-[state=active]:bg-b-quaternary cursor-default",
    className,
  )}
  {...props}
>
  {@render children?.()}
</Tabs.Trigger>
