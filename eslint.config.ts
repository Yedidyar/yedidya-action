import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import jsonc from "eslint-plugin-jsonc";
import n from "eslint-plugin-n";
import packageJson from "eslint-plugin-package-json";
import * as regexp from "eslint-plugin-regexp";
import yml from "eslint-plugin-yml";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(
    ["**/*.snap", "coverage", "lib", "node_modules", "pnpm-lock.yaml"],
    "Global Ignores",
  ),
  { linterOptions: { reportUnusedDisableDirectives: "error" } },
  {
    extends: [
      comments.recommended,
      eslint.configs.recommended,
      jsdoc.configs["flat/contents-typescript-error"],
      jsdoc.configs["flat/logical-typescript-error"],
      jsdoc.configs["flat/stylistic-typescript-error"],
      n.configs["flat/recommended"],
      regexp.configs["flat/recommended"],
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.{js,ts}"],
    ignores: ["lib/**/*"],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.config.*s", "bin/index.js"],
        },
      },
    },
    rules: {
      // These on-by-default rules work well for this repo if configured
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        { ignorePrimitives: true },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowBoolean: true, allowNullish: true, allowNumber: true },
      ],
      "n/no-unsupported-features/node-builtins": [
        "error",
        { allowExperimental: true, ignores: ["import.meta.dirname"] },
      ],

      // Stylistic concerns that don't interfere with Prettier
      "logical-assignment-operators": [
        "error",
        "always",
        { enforceForIfStatements: true },
      ],
      "no-useless-rename": "error",
      "object-shorthand": "error",
      "operator-assignment": "error",

      // https://github.com/eslint-community/eslint-plugin-n/issues/472
      "n/no-unpublished-bin": "off",
    },
    settings: {
      node: { version: ">=20.0.0" },
      perfectionist: { partitionByComment: true, type: "natural" },
    },
  },
  {
    extends: [jsonc.configs["flat/recommended-with-json"]],
    files: ["**/*.json"],
  },
  {
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.md/*.ts"],
    rules: { "n/no-missing-import": "off" },
  },
  {
    extends: [vitest.configs.recommended],
    files: ["**/*.test.*"],
    rules: { "@typescript-eslint/no-unsafe-assignment": "off" },
    settings: { vitest: { typecheck: true } },
  },
  {
    extends: [yml.configs["flat/standard"], yml.configs["flat/prettier"]],
    files: ["**/*.{yml,yaml}"],
    rules: {
      "yml/file-extension": "error",
      "yml/sort-keys": [
        "error",
        { order: { type: "asc" }, pathPattern: "^.*$" },
      ],
      "yml/sort-sequence-values": [
        "error",
        { order: { type: "asc" }, pathPattern: "^.*$" },
      ],
    },
  },
  { extends: [packageJson.configs.recommended], files: ["package.json"] },
);
