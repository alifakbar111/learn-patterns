# Tree Shaking
### Reduce the bundle size by eliminating dead code

It can happen that we add code to our bundle that isn't used anywhere in our application. This piece of **dead code** can be eliminated in order to reduce the size of the bundle, and prevent unnecessarily loading more data! The process of eliminating dead code before adding it to our bundle, is called **tree-shaking**.

<br>

### Concepts
Tree shaking is aimed at removing code that will never be used from a final JavaScript bundle.

For most modern JavaScript apps that use a module bundler (like webpack or Rollup), your bundler is what you would expect to automatically remove dead code. ⁣⁣ ⁣⁣

### Imports
Only modules defined with the ES2015 module syntax (import and export) can be tree-shaken. The way you import modules specifies whether the module can be tree-shaken or not.

Tree shaking starts by visiting all parts of the entry point file with side effects, and proceeds to traverse the edges of the graph until new sections are reached.

Once the traversal is completed, the JavaScript bundle includes only the parts that were reached during the traversal.

### Side Effects
When we're importing an ES6 module, this module gets executed instantly. It could happen that although we're not referencing the module's exports anywhere in our code, the module itself affects the global scope while it's being executed (polyfills or global stylesheets, for example). This is called a **side effect**. The module cannot be tree-shaken due to the special behavior when it's being imported!

