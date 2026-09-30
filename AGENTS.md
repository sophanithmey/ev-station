# Agent Rules & Coding Standards

## 1. File Length Limitation (150–200 Lines Max)
- **Hard Limit**: Every file (`.ts`, `.tsx`, `.css`) must remain strictly within 150–200 lines.
- **Decomposition**: When a file approaches 150 lines, proactively refactor:
  - Extract sub-components into dedicated files under `src/components/`.
  - Extract business, state, or calculation logic into custom hooks under `src/hooks/`.
  - Move shared types, constants, and helper utilities into separate modules.
- **Single Responsibility**: Each file must have one clear, focused purpose.

## 2. Clean Code & Architecture
- **Readability**: Write clean, self-documenting code with clear, descriptive naming conventions.
- **Strict TypeScript**: Enforce strict typing. Do not use `any` or loose assertions. Explicitly type component props and function return signatures.
- **Minimal Complexity**: Use early returns and guard clauses to minimize nested logic (maximum 2–3 indentation levels).
- **Linter Compliance**: Maintain zero warnings and zero errors with `yarn lint` (`oxlint`).

## 3. Strict Separation of Components and Hooks
- **Components (`src/components/`)**:
  - Focus purely on UI rendering, layout, and presentation.
  - Keep JSX declarative and lightweight.
  - Never embed heavy algorithms, side-effects, browser API bindings, or complex business logic directly in component bodies.
- **Hooks (`src/hooks/`)**:
  - Encapsulate all state management, data fetching, geolocation, filter/search algorithms, and event subscriptions in dedicated custom hooks (`use-*.ts`).
  - Return well-typed, memoized state and handler functions (`useCallback`, `useMemo`).

## 4. Package Manager & Environment (Yarn & NVM)
- **Package Manager**: Use `yarn` exclusively (`yarn add`, `yarn install`, `yarn build`, `yarn lint`).
  - Never use `npm` or `pnpm`.
  - Never generate or commit `package-lock.json` or `pnpm-lock.yaml`.
- **Node Environment**: Respect `.nvmrc` (Node 22+).
  - Always ensure the correct node version is used via `nvm use` when running terminal commands and build tasks.

## 5. Dev Server Policy
- **No Dev Server**: Do not run or keep running the local dev server (`yarn dev`, `vite`).
- **Validation**: Validate changes strictly via static analysis and build verification:
  - Lint: `yarn lint`
  - Build & Typecheck: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use && yarn build`

## 6. Tailwind CSS v4 & SonarQube Alignment
- **Tailwind v4 Modern Syntax**:
  - Use native Tailwind v4 `@import "tailwindcss";` and `@theme` definitions in CSS.
  - Do not introduce legacy `@tailwind` directives or deprecated `tailwind.config.js`.
- **SonarQube Quality Compliance**:
  - **No Duplicate Classes**: Avoid duplicate utility classes on the same element (e.g., repeated utility tokens).
  - **No Conflicting Utilities**: Prevent mutually conflicting styles on a single element (e.g., `p-2 p-4`, `text-sm text-lg`, `flex block`).
  - **No `!important` Overuse**: Forbid `!` or `!important` in component classes. Restrict `!important` strictly to scoped third-party library CSS overrides (e.g., Leaflet).
  - **Design Tokens**: Prefer standard utility classes or variables defined in `@theme` rather than arbitrary bracket notation (`w-[287px]`, `bg-[#123456]`).
  - **Logical Class Grouping**: Order classes predictably (Layout/Position -> Flex/Grid -> Spacing -> Sizing -> Typography -> Background/Border -> Effects -> Modifiers/Responsive).
  - **Semantic HTML & Accessibility**: Ensure WCAG contrast compliance, explicit button types (`type="button"`), and proper semantic labels/ARIA tags.
