import { Plugin } from 'vite';
import { init, parse } from 'es-module-lexer';
import MagicString from 'magic-string';

export const ExcludeDevImportsPlugin = (): Plugin => {
  return {
    name: 'vite-exclude-dev-imports-plugin',
    enforce: 'post',
    async transform(code: string) {
      try {
        await init;
        let _s: MagicString | undefined;
        const s = () => _s || (_s = new MagicString(code));
        const [imports] = parse(code);

        for (const i of imports) {
          if (!i.n || i.d !== -1) continue;
          if (i.n.match(/\?dev/)) {
            s().overwrite(i.ss, i.se, '').toString();
          }
        }
        if (_s) {
          return {
            code: (_s as MagicString).toString(),
            map: (_s as MagicString).generateMap(),
          };
        }
        /* tslint:disable */
      } catch (e) {}
    },
  };
};
