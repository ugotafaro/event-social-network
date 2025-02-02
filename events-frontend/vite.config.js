// vite.config.js in todo-components
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "event",
      filename: "remoteEntry.js",
      exposes: {
        "./Event": "./src/components/Event",
        "./EventCard": "./src/components/EventCard",
        "./CreateEventModal": "./src/components/CreateEventModal",
        "./LikedEvents": "./src/components/LikedEvents",
      },
      shared: ["react"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
