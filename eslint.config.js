import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";


export default defineConfig([
  pluginJs.configs.recommended,
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { globals: globals.node },
    rules: {
      semi: 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error',
    },
   },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
]);