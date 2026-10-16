# `@transl8.ai/plugin-sdk` changelog

## Bump policy

Semver, on the shape of the exported TypeScript contracts (not on platform
runtime behavior, which can change without a bump as long as the shapes
below hold).

- **Major** — a breaking contract change: a field removed, a field's type
  narrowed/changed incompatibly, `PluginType`/`PluginExecution` losing a
  variant, or a required field added to an existing exported type.
- **Minor** — new exported type, new optional field, or a new
  `PluginType`/`PluginExecution` variant added (additive).
- **Patch** — docs/comments only, no change to any exported type's shape.

## 0.1.0 — 2026-09-07

Initial package: `PluginDefinition` (`InlinePluginDefinition` |
`HttpPluginDefinition`), `PluginType`, `PluginExecution`,
`isInlinePlugin`/`isHttpPlugin`, QA result types (`QaValidationResult`,
`QaValidationContext`, `PluginGlossaryTerm`, `PluginValidatorFn`), the
`http-webhook` wire contract (`HttpWebhookRequestBody`/
`HttpWebhookResponseBody`), and `PLUGIN_SDK_CONTRACT_VERSION`.
