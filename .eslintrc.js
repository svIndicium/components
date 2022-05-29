module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		"@nuxtjs/eslint-config-typescript",
		"plugin:nuxt/recommended"
	],
	plugins: [
		"sort-class-members",
		"ordered-imports"
	],
	rules: {
		"vue/html-indent": ["warn", "tab"],
		"object-curly-spacing": "error",
		curly: "error",
		quotes: ["warn", "double"],
		indent: "off",
		"space-before-function-paren": "off",
		"no-tabs": "off",
		"no-mixed-spaces-and-tabs": "off",
		"template-curly-spacing": "off",
		"no-useless-constructor": "off",
		"import/order": "off",
		"ordered-imports/ordered-imports": ["warn", {
			"declaration-ordering": ["type", {
				ordering: ["side-effect", "namespace", "default", "destructured"],
				secondaryOrdering: ["any"]
			}],
			"specifier-ordering": "any",
			"group-ordering": [
				{ name: "Vue", match: "^vue", order: 10 },
				{ name: "Vue", match: "^@vue", order: 11 },
				{ name: "Nuxt", match: "^@nuxt", order: 12 },
				{ name: "Lib", match: "^@svindicium/lib", order: 20 },
				{ name: "Store", match: "^store", order: 30 },
				{ name: "API", match: "^api", order: 40 },
				{ name: "UI Components", match: "^ui", order: 50 },
				{ name: "Utils", match: "^utils", order: 60 },
				{ name: "Lodash", match: "^lodash-es", order: 70 },
				{ name: "Other", match: "^.*", order: 80 }
			]
		}]
	}
}
