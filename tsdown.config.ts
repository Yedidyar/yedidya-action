import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/*-action.ts", "src/*-action-post.ts", "src/upload-lib.ts"],
  format: ["cjs"],
  platform: "node",
  target: "node20",
  outDir: "lib",
  clean: true,
  noExternal: [/.*/],
  inlineOnly: false,
});
