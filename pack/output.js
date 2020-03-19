const fs = require('fs').promises;
const path = require('path')

// DFC先序删除文件和文件夹
async function rmdirAsync(filePath) {
    let stat = await fs.stat(filePath)
    if (stat.isFile()) {
        await fs.unlink(filePath)
    } else {
        let dirs = await fs.readdir(filePath)
        dirs = dirs.map(dir => rmdirAsync(path.join(filePath, dir)))
        await Promise.all(dirs)
        await fs.rmdir(filePath)
    }
}

async function outputFile(output, content) {
    const filePath = path.join(output.path, output.filename);
    // 移除output文件夹
    await rmdirAsync(output.path);
    // 生成output文件夹
    await fs.mkdir(output.path);
    // 写入bundle
    await fs.writeFile(filePath, content);
    console.log(`文件已经打包到${filePath}`);
}

module.exports = {
    outputFile
}