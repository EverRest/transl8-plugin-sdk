import { describe, expect, it } from 'vitest';
import type {
  HttpPluginDefinition,
  InlinePluginDefinition,
  PluginDefinition,
} from './plugin-types';
import { isHttpPlugin, isInlinePlugin } from './plugin-types';
import type { QaValidationResult } from './qa-types';

/**
 * Compile-time + runtime proof that the public `PluginDefinition` type
 * accepts objects shaped like the platform's built-in plugins. If the
 * contract changes incompatibly, this file stops compiling.
 */
describe('PluginDefinition contract', () => {
  it('accepts an inline plugin shaped like placeholder-check', () => {
    const placeholderCheck: InlinePluginDefinition = {
      id: 'placeholder-check',
      type: 'validator',
      execution: 'inline',
      name: 'Placeholder check',
      description:
        'Flags a translation that drops, duplicates, or alters a {{placeholder}} token present in the source text.',
      run: (sourceText, outputText): QaValidationResult => {
        const ok = sourceText.includes(outputText) || outputText.length > 0;
        return ok ? { valid: true } : { valid: false, reason: 'mismatch' };
      },
    };

    const asPublicType: PluginDefinition = placeholderCheck;

    expect(isInlinePlugin(asPublicType)).toBe(true);
    expect(isHttpPlugin(asPublicType)).toBe(false);
    if (isInlinePlugin(asPublicType)) {
      expect(asPublicType.run('src', 'out')).toEqual({ valid: true });
    }
  });

  it('accepts an http plugin shaped like http-webhook', () => {
    const httpWebhook: HttpPluginDefinition = {
      id: 'http-webhook',
      type: 'validator',
      execution: 'http',
      name: 'HTTP webhook validator',
      description: 'Calls your HTTPS endpoint with source/output text.',
    };

    const asPublicType: PluginDefinition = httpWebhook;

    expect(isHttpPlugin(asPublicType)).toBe(true);
    expect(isInlinePlugin(asPublicType)).toBe(false);
  });
});
