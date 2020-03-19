const {
    entry,
    output,
} = require('../pack.config');
const {
    initGraph,
} = require('./graph');
const {
    bundle
} = require('./bundle');
const {
    outputFile
} = require('./output');

// 初始化依赖树
const graph = initGraph(entry);
// 组装模块
const bundled = bundle(entry, graph);
// 输出包
outputFile(output, bundled);