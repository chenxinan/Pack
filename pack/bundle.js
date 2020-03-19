function genResult(entry, modules) {
    return `
    (function (modules) {
        const cache = {};
        const count = {};
        function require(moduleId) {
            if (cache[moduleId]) return cache[moduleId];
            count[moduleId] = (count[moduleId] || 0) + 1;
            const [modudeFn, mapping] = modules[moduleId];
            function _require(relativePath) {
                const moduleId = mapping[relativePath];
                if (count[moduleId] >= 2) {
                    console.error("循环引用: %s", moduleId)
                    return;
                }
                return require(moduleId);
            }
            const module = {
                exports: {}
            }
            modudeFn(_require, module, module.exports);
            return cache[moduleId] = module.exports;
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