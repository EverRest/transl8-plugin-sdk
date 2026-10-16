# `@transl8.ai/plugin-sdk`

Stable TypeScript **contracts** for transl8.ai validator plugins: types,
result shapes, and version constants. No runtime, no plugin loader, no
sandbox — this package cannot execute anything.

## Install

```bash
npm install @transl8.ai/plugin-sdk
```

Release history and the bump policy: [CHANGELOG.md](./CHANGELOG.md).

## Usage

```ts
import type {
  PluginDefinition,
  InlinePluginDefinition,
  QaValidationResult,
  QaValidationContext,
  HttpWebhookRequestBody,
  HttpWebhookResponseBody,
} from '@transl8.ai/plugin-sdk';
import { isInlinePlugin, isHttpPlugin, PLUGIN_SDK_CONTRACT_VERSION } from '@transl8.ai/plugin-sdk';

// Type an inline validator plugin definition (same shape the platform's
// built-in plugins use):
const myValidator: InlinePluginDefinition = {
  id: 'my-validator',
  type: 'validator',
  execution: 'inline',
  name: 'My validator',
  description: 'Flags something in the translated output.',
  run: (sourceText, outputText, context): QaValidationResult => {
    return outputText.length > 0 ? { valid: true } : { valid: false, reason: 'empty output' };
  },
};

// Or type both ends of an `http-webhook` handler:
function handleWebhook(body: HttpWebhookRequestBody): HttpWebhookResponseBody {
  return { valid: body.outputText.length > 0 };
}
```

`isInlinePlugin` / `isHttpPlugin` narrow a `PluginDefinition` by its
`execution` field.

## Relationship to the platform

These types describe the contract between the transl8.ai platform and a
validator plugin. The platform builds the `QaValidationContext`, calls the
plugin, and consumes the `QaValidationResult`. For `http-webhook` plugins it
POSTs an `HttpWebhookRequestBody` and reads an `HttpWebhookResponseBody`.

The package has no runtime dependencies and imports nothing from the platform:
`PluginGlossaryTerm`, for example, is a standalone structural type. A change to
the contract is a change to these types and follows the semver policy below.
`src/plugin-types.test.ts` is a type-level test that assigns objects shaped
like real plugin definitions to the public types, so an incompatible change
stops it compiling.

## Semver policy

Stated as policy, not enforced by tooling beyond the bump-policy table in
[CHANGELOG.md](./CHANGELOG.md) (there is no automated public-API diff check).

**Breaking contract changes require a major version bump.** A change is
breaking if it removes an exported type/field, narrows a field's type, or
removes a `PluginType`/`PluginExecution` variant a plugin author could have
been depending on. Additive changes (new optional field, new type, new
execution/plugin-type variant) are minor. Anything that touches no exported
type's shape is a patch.

## Non-goals

- VS Code–style marketplace UI
- Running arbitrary plugin JS in workers
- Replacing `http-webhook` with in-browser validators

More broadly: this package never loads or executes plugin code, third-party
or otherwise. Execution stays in the platform (built-in inline plugins and an
SSRF-guarded HTTP webhook caller). Dynamic tenant-authored JS or
install-at-runtime plugins are out of scope.

## Build / test

```bash
npm install
npm run typecheck   # tsc --noEmit
npm test            # vitest run
npm run build       # esbuild -> dist/index.js, tsc -> dist/types/*.d.ts
```

## License

MIT, see [LICENSE](./LICENSE).
