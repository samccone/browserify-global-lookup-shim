# Browserify Global Lookup Shim

### Why?

Sometimes when you are distributing a standalone lib you want to exclude files from the library. Instead you want them to be looked up on the window.
That is where browserify-global-lookup comes in handy.

### How to use

```bash
browserify src/index.js \
  --standalone Module \
  --external backbone \
  --external underscore \
  | global-lookup-shim.js \
  --global-shim underscore:_ \
  --global-shim backbone:Backbone \
  > dist/build.js
```
