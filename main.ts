const requireAll: any = (r: any) => r.keys().forEach(r)

requireAll(require.context("./components", true))
requireAll(require.context("./utils", true))
