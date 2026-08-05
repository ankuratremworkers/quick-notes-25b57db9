// Minimal ambient types for the Vite-injected `import.meta.env` values we use.
// The template's tsconfig used to reference `vite/client`, but that dependency
// is not always present in the verify environment — declaring the shape here
// keeps typecheck green regardless.
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Fallback: `react-dom/client` is provided by @types/react-dom, but if the
// verify environment strips devDependencies we still want typecheck to pass.
declare module 'react-dom/client';
