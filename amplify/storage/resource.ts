import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "af-portfolio-storage",
  access: (allow) => ({
    "pantonify/*": [allow.guest.to(["read"])],
    "amazon/*": [allow.guest.to(["read"])],
    "radiosity/*": [allow.guest.to(["read"])],
    "resume/*": [allow.guest.to(["read"])],
    "light-drawing/*": [allow.guest.to(["read"])],
  }),
});
