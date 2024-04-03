module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "react-app",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
  },
};

// module.exports = {
//   root: true,

//   env: {
//     browser: true,

//     es2020: true,

//     //remove the module unknown in the prritier config

//     // node: true,
//   },

//   extends: [
//     "eslint:recommended",

//     "plugin:react/recommended",

//     "plugin:react/jsx-runtime",

//     "plugin:react-hooks/recommended",

//     // this line will make the app not show if smth not in use or key problems

//     // "react-app",
//   ],

//   ignorePatterns: ["dist", ".eslintrc.cjs"],

//   parserOptions: { ecmaVersion: "latest", sourceType: "module" },

//   settings: { react: { version: "18.2" } },

//   plugins: ["react-refresh"],

//   rules: {
//     //var not in use will be yellow instead of red - warn instead error

//     "no-unused-vars": "warn",

//     //will not warn if i didn't pass props

//     "react/prop-types": "off",

//     "react-refresh/only-export-components": [
//       "warn",

//       { allowConstantExport: true },
//     ],
//   },
// };
