function genResult(entry, modules) {
    return `
    (function (modules) {
        function require(moduleId) {
            const [modudeFn, mapping] = modules[moduleId];
            function mapRequire(relativePath) {
                return require(mapping[relativePath]);
            }
            const module = {
                exports: {}
            }
            modudeFn(mapRequire, module, module.exports);
            return module.exports;
        }
        require('${entry}');
    })({${modules}})
    `
}

function genModules(graph) {
    return Object.entries(graph).reduce((modules, [filename, {
        code,
        mapping
    }]) => {
        return modules += `'${filename}': [
            function(require, module, exports) {
                ${code}
            },
            ${JSON.stringify(mapping)},
        ],`
    }, '')
}

function bundle(entry, graph) {
    const modules = genModules(graph);
    const result = genResult(entry, modules);
    return result
}

module.exports = {
    bundle
}