
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
        require('src/main.js');
    })({'src/main.js': [
            function(require, module, exports) {
                "use strict";

var _speak = _interopRequireDefault(require("./speak.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _speak["default"])();
            },
            {"./speak.js":"src/speak.js"},
        ],'src/speak.js': [
            function(require, module, exports) {
                "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = speak;

var _name = require("./name.js");

var _describe = require("./describe.js");

function speak() {
  console.log("\u6211\u662F".concat(_name.name, "\uFF0C\u8FD9\u662F\u6211\u7684").concat(_describe.des));
}
            },
            {"./name.js":"src/name.js","./describe.js":"src/describe.js"},
        ],'src/name.js': [
            function(require, module, exports) {
                "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = void 0;
var name = '陈信安';
exports.name = name;
            },
            {},
        ],'src/describe.js': [
            function(require, module, exports) {
                "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.des = void 0;
var des = 'demo打包器';
exports.des = des;
            },
            {},
        ],})
    