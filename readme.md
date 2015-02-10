# Browserify Global Lookup Shim

### Why?

Sometimes when you are distributing a standalone lib you want to exclude files from the build file. Instead you want them to be looked up on the window.
That is where the global lookup shim comes in handy.

### How to use

```bash
browserify src/index.js \
  --standalone Module \
  --external backbone \
  --external underscore \
  | ./node_modules/.bin/global-lookup-shim \
  --global-shim underscore:_ \
  --global-shim backbone:Backbone \
  > dist/build.js
```
