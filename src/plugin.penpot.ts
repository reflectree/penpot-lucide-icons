import { type MessageTheme } from "./messages/theme-change.message";
import { SendIconSchema } from "./messages/send-icon.message";
import { parse } from "valibot";

penpot.ui.open("penpot-lucide-icons", "", {
  height: 500,
  width: 333,
});

penpot.on("themechange", (theme: "light" | "dark") =>
  penpot.ui.sendMessage({
    __type: "theme-change",
    theme,
  } satisfies MessageTheme),
);

penpot.ui.onMessage((data) => {
  const sendIcon = parse(SendIconSchema, data);
  const shape = penpot.createShapeFromSvg(sendIcon.svg);

  
  if (!shape) return;

  shape.name = `lucide/${sendIcon.title}`

  const selection = penpot.selection;

  if (selection.length > 0) {
    // If they have something selected, center the icon relative to that target
    const target = selection[0];
    shape.x = Math.round(target.x + (target.width / 2) - (shape.width / 2));
    shape.y = Math.round(target.y + (target.height / 2) - (shape.height / 2));
  } else {
    // Otherwise, center it perfectly in their screen
    shape.x = Math.round(penpot.viewport.center.x - (shape.width / 2));
    shape.y = Math.round(penpot.viewport.center.y - (shape.height / 2));
  }

  penpot.selection = [shape];
});
