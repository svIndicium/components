const requireAll: any = (r: any) => r.keys().forEach(r)

requireAll(require.context("./api", true, /\.vue|.ts$/))
requireAll(require.context("./components", true, /\.vue|.ts$/))
requireAll(require.context("./utils", true, /\.vue|.ts$/))
