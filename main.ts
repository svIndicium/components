const requireAll: any = (r: any) => r.keys().forEach(r)

requireAll(require.context("./analytics", true))
