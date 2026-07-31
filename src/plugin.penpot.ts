import type { MessageThemeChange } from "./types/messages";

penpot.ui.open("penpot-lucide-icons", "", {
  height: 500,
  width: 600,
});

penpot.on("themechange", (theme: "light" | "dark") => {
  const message: MessageThemeChange = {
    __type: "themechange",
    theme
  }

  penpot.ui.sendMessage(message);
});
