# vite-exclude-dev-imports-plugin

A vite plugin to remove all
`import "foo/var?dev"`

# usage

```
import { defineConfig } from "vite";
import ExcludeDevImportsPlugin from "vite-exclude-dev-imports-plugin";

export default defineConfig({
    plugins: [
        {
            ...ExcludeDevImportsPlugin(),
            apply: 'build'
        }
    ]
});
```
