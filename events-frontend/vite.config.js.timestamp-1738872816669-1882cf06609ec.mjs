// vite.config.js
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import react from "file:///app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import federation from "file:///app/node_modules/@originjs/vite-plugin-federation/dist/index.mjs";
import tailwindcss from "file:///app/node_modules/@tailwindcss/vite/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    cors: true
  },
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
        "./CreatedEvents": "./src/components/CreatedEvents"
      },
      shared: ["react"]
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  },
  preview: {
    host: "localhost",
    port: 4173,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcuanNcIjsvLyB2aXRlLmNvbmZpZy5qcyBpbiB0b2RvLWNvbXBvbmVudHNcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgZmVkZXJhdGlvbiBmcm9tIFwiQG9yaWdpbmpzL3ZpdGUtcGx1Z2luLWZlZGVyYXRpb25cIjtcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgY29yczogdHJ1ZSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdGFpbHdpbmRjc3MoKSxcbiAgICBmZWRlcmF0aW9uKHtcbiAgICAgIG5hbWU6IFwiZXZlbnRcIixcbiAgICAgIGZpbGVuYW1lOiBcInJlbW90ZUVudHJ5LmpzXCIsXG4gICAgICBleHBvc2VzOiB7XG4gICAgICAgIFwiLi9FdmVudFwiOiBcIi4vc3JjL2NvbXBvbmVudHMvRXZlbnRcIixcbiAgICAgICAgXCIuL0V2ZW50Q2FyZFwiOiBcIi4vc3JjL2NvbXBvbmVudHMvRXZlbnRDYXJkXCIsXG4gICAgICAgIFwiLi9DcmVhdGVFdmVudE1vZGFsXCI6IFwiLi9zcmMvY29tcG9uZW50cy9DcmVhdGVFdmVudE1vZGFsXCIsXG4gICAgICAgIFwiLi9MaWtlZEV2ZW50c1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvTGlrZWRFdmVudHNcIixcbiAgICAgICAgXCIuL0NyZWF0ZWRFdmVudHNcIjogXCIuL3NyYy9jb21wb25lbnRzL0NyZWF0ZWRFdmVudHNcIixcbiAgICAgIH0sXG4gICAgICBzaGFyZWQ6IFtcInJlYWN0XCJdLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIG1vZHVsZVByZWxvYWQ6IGZhbHNlLFxuICAgIHRhcmdldDogXCJlc25leHRcIixcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBob3N0OiBcImxvY2FsaG9zdFwiLFxuICAgIHBvcnQ6IDQxNzMsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbiAgICB9LFxuICB9LCAgXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxpQkFBaUI7QUFFeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxRQUNQLFdBQVc7QUFBQSxRQUNYLGVBQWU7QUFBQSxRQUNmLHNCQUFzQjtBQUFBLFFBQ3RCLGlCQUFpQjtBQUFBLFFBQ2pCLG1CQUFtQjtBQUFBLE1BQ3JCO0FBQUEsTUFDQSxRQUFRLENBQUMsT0FBTztBQUFBLElBQ2xCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsSUFDZixRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQLCtCQUErQjtBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
