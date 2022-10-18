"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const es_module_lexer_1 = require("es-module-lexer");
const magic_string_1 = require("magic-string");
exports.default = () => {
    return {
        name: 'exclude-css-plugin',
        enforce: 'post',
        async transform(code) {
            try {
                await es_module_lexer_1.init;
                let _s;
                const s = () => _s || (_s = new magic_string_1.default(code));
                const [imports] = (0, es_module_lexer_1.parse)(code);
                for (const i of imports) {
                    if (!i.n || i.d !== -1)
                        continue;
                    if (i.n.match(/\?dev/)) {
                        s().overwrite(i.ss, i.se, '').toString();
                    }
                }
                if (_s) {
                    return {
                        code: _s.toString(),
                        map: _s.generateMap(),
                    };
                }
                /* tslint:disable */
            }
            catch (e) { }
        },
    };
};
