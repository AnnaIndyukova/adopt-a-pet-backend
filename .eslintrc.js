module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
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
  rules: {
    "no-console": "off",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "no-restricted-syntax": [
      "error",
      {
        selector: "CallExpression[callee.name='eslint-disable']",
        message: "eslint-disable is forbidden.",
      },
      {
        selector: "CallExpression[callee.name='eslint-disable-line']",
        message: "eslint-disable-line is forbidden.",
      },
      {
        selector: "CallExpression[callee.name='eslint-disable-next-line']",
        message: "eslint-disable-next-line is forbidden.",
      },
    ],
  },
};
