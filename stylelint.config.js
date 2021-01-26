module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-sass-guidelines",
    "stylelint-config-suitcss",
    "stylelint-config-prettier",
  ],
  plugins: ["stylelint-scss"],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "string-quotes": "double",
    "selector-class-pattern": null,
  },
};
