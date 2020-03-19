const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser')
const {
    transformFromAst
} = require('@babel/core');
const traverse = require('@babel/traverse').default

// fs读取内容
// 生成ast
// 转换代码
// 读取依赖
function genCode(filename) {
    // 读取文件
    const content = fs.readFileSync(filename, 'utf-8');
    // 生成ast树
    const ast = babelParser.parse(content, {
        sourceType: 'module',
    })
    // 生成code
    const {
        code
    } = transformFromAst(ast, null, {
        presets: ['@babel/preset-env'],
    })
    // 依赖的相对路径映射到绝对路径
    const mapping = {}
    // 收集依赖
    const dependencies = []
    // 文件路径
    const dirname = path.dirname(filename)
    // 遍历所有的import模块，并将相对路径放入dependencies
    traverse(ast, {
        // import对应的类型为ImportDeclaration的AST节点
        ImportDeclaration: ({
            node
        }) => {
            const relativePath = node.source.value;
            const absolutePath = path.join(dirname, relativePath);
            dependencies.push(relativePath);
            mapping[relativePath] = absolutePath
        }
    })
    return {
        code,
        dependencies,
        mapping,
    }
}

module.exports = {
    genCode,
}