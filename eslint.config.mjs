import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended", "airbnb-base", "prettier"), {
    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "no-console": "off",

        "no-underscore-dangle": ["error", {
            allow: ["_id"],
        }],

        "no-unused-vars": ["error", {
            argsIgnorePattern: "next",
        }],

        "no-restricted-syntax": ["error", {
            selector: "CallExpression[callee.name='eslint-disable']",
            message: "eslint-disable is forbidden.",
        }, {
            selector: "CallExpression[callee.name='eslint-disable-line']",
            message: "eslint-disable-line is forbidden.",
        }, {
            selector: "CallExpression[callee.name='eslint-disable-next-line']",
            message: "eslint-disable-next-line is forbidden.",
        }],
    },
}, {
    files: ["**/.eslintrc.{js,cjs}"],

    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: 5,
        sourceType: "commonjs",
    },
}];