/**
 * QA validation contract: the input a validator plugin receives, the result
 * it returns, and the function signature an inline plugin implements.
 * The platform produces the context and consumes the result.
 */

/** A single glossary term the plugin can consult during validation. */
export interface PluginGlossaryTerm {
  sourceTerm: string;
  targetTerm?: string | null;
  doNotTranslate: boolean;
}

export interface QaValidationContext {
  maxLength?: number | null;
  glossary?: PluginGlossaryTerm[];
  contentType?: string | null;
  /** Target locale for locale-format-aware checks. */
  targetLocale?: string | null;
}

export interface QaValidationResult {
  valid: boolean;
  reason?: string;
  validator?: string;
}

/** Signature an `inline` plugin's `run` function must satisfy. */
export type PluginValidatorFn = (
  sourceText: string,
  outputText: string,
  context?: QaValidationContext,
) => QaValidationResult;
