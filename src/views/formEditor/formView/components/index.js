const requireComponent = require.context('./', true, /\w+\.vue$/)
let comps = {}
requireComponent.keys().map(fileName => {
    let comp = requireComponent(fileName).default;
    if (comp && comp.name) comps[comp.name] = comp
})
export default comps;