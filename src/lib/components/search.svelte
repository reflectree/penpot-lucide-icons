<script lang="ts">
  import { cn } from "$lib/cn";
  import Search from "@lucide/svelte/icons/search";
  import type { ClassValue } from "svelte/elements";

  interface Styling {
    root: ClassValue;
    input: ClassValue;
  }

  interface Props {
    class: Partial<Styling>;
    placeholder: string;
    value: string;
  }

  let {
    class: className,
    placeholder = $bindable(""),
    value = $bindable(""),
  }: Props = $props();
</script>

<div class={["relative w-full body-m", className.root]}>
  <Search class="absolute left-2.75 top-2.25 z-10 zoom-70" />
  <input
    placeholder={placeholder}
    bind:value
    class={cn([
      "bg-b-tertiary rounded-lg w-full",
      "p-1 pt-1.25 pl-8 -outline-offset-1 outline-1 outline-transparent",
      "focus:outline-a-tertiary focus:bg-b-primary",
      className.input
    ])}
  />
</div>
