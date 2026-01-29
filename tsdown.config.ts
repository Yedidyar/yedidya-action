import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  entry: ["src/*-action.ts", "src/*-action-post.ts", "src/upload-lib.ts"],
  inlineOnly: false,
  noExternal: [/.*/],
  outDir: "lib",
  platform: "node",
  target: "node20",
});
