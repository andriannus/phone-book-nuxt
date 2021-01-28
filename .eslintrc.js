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
        "newlines-between": "always-and-inside-groups",
        pathGroups: [
          {
            pattern: "./**",
            group: "sibling",
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
