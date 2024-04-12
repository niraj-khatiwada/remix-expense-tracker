import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*"],
      routes: (defineRoutes) => {
        return createRoutesFromFolders(defineRoutes, {
          ignoredFilePatterns: ["**/.*", "**/*.css"],
        });
      },
    }),
    tsconfigPaths(),
  ],
});
