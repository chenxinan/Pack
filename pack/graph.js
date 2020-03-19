const {
    genCode
} = require('./genCode')

const graph = {};

function genGraph(filePath) {
    const file = genCode(filePath);
    graph[filePath] = file;
    for (let relativePath of file.dependencies) {
        const absolutePath = file.mapping[relativePath];
        if (!graph[absolutePath]) {
            genGraph(absolutePath)
        }
    }
    return graph;
}

function initGraph(entry) {
    return genGraph(entry)
}

module.exports = {
    // graph,
    initGraph,
}