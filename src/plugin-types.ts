import type { PluginValidatorFn } from './qa-types';

/**
 * Plugin definition contract: what a plugin is and how it runs.
 * `provider` / `connector` / `prompt_pack` are reserved names, not
 * implemented. The contract supports validator plugins only.
 */
export type PluginType = 'validator';

/**
 * How the plugin runs. `inline` — a pure function shipped and deployed with
 * the platform (never third-party code). `http` — the platform calls out to
 * a tenant-configured HTTPS webhook (see `HttpWebhookRequestBody` /
 * `HttpWebhookResponseBody` below for the wire contract). Neither variant
 * loads or executes third-party code inside this SDK or the platform
 * process — see the package README's non-goals.
 */
export type PluginExecution = 'inline' | 'http';

interface PluginDefinitionBase {
  id: string;
  type: PluginType;
  name: string;
  description: string;
}

export interface InlinePluginDefinition extends PluginDefinitionBase {
  execution: 'inline';
  run: PluginValidatorFn;
}

export interface HttpPluginDefinition extends PluginDefinitionBase {
  execution: 'http';
}

export type PluginDefinition = InlinePluginDefinition | HttpPluginDefinition;

export function isInlinePlugin(
  definition: PluginDefinition,
): definition is InlinePluginDefinition {
  return definition.execution === 'inline';
}

export function isHttpPlugin(
  definition: PluginDefinition,
): definition is HttpPluginDefinition {
  return definition.execution === 'http';
}
