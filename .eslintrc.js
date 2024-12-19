module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
    "next/typescript",
  ],
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-no-bind": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-sort-props": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/prop-types": "off",
    "prettier/prettier": "warn",
    "react/jsx-uses-react": "off",
    "react/jsx-uses-vars": "error",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "always", children: "ignore" },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
