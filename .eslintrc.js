module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "prettier",
    "prettier/vue",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: ["builtin", "external", "sibling", "parent", "index"],
        "newlines-between": "always-and-inside-groups",
        pathGroups: [
          {
            pattern: "./**",
            group: "sibling",
          },
          {
            pattern: "../**",
            group: "parent",
          },
          {
            pattern: "@/**",
            group: "index",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
  },
};
