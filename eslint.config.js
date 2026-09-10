import js from "@eslint/js";
import tseslint from "typescript-eslint";
export default tseslint.config(
  { ignores: ["node_modules/**", ".next/**", "HorrorCorridor-V1/**", "HorrorCorridor-V2/**", "tools/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ["scripts/**/*.mjs"], languageOptions: { globals: { process:"readonly", console:"readonly", Buffer:"readonly", URL:"readonly" } } },
  { files: ["**/*.{ts,tsx}"], rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  } }
);
