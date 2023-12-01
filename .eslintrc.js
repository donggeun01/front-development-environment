module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    TWO: true,
    STR_TWO: true,
    VERSION: true,
    PRODUCTION: true,
    MAX_COUNT: true,
    api_domain: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
