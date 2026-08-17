/**
 * Next ships types for `*.module.css` only, so a plain side-effect import like
 * `import "./globals.css"` in a layout has no declaration to resolve to.
 *
 * TypeScript 5.9 (this project's version) ignores that silently, but newer
 * versions — including the one your editor may bundle — report "Cannot find
 * module or type declarations for side-effect import". This declares the
 * plain-CSS case so it's clean under either.
 *
 * The more specific `*.module.css` pattern from Next still wins for CSS
 * modules, so this doesn't weaken their typing.
 */
declare module "*.css";
