/**
 * Wire contract for the `http-webhook` plugin: the JSON body the platform
 * sends to a plugin's webhook and the JSON body it accepts in response.
 *
 * An author implementing a webhook validator can type both ends of the
 * exchange against these two types.
 */

/** POSTed by the platform to the tenant's configured webhook URL. */
export interface HttpWebhookRequestBody {
  sourceText: string;
  outputText: string;
  targetLocale: string | null;
  contentType: string | null;
  key: string | null;
}

/**
 * Expected JSON response body. `valid` is required; an unparseable or
 * missing-`valid` response makes the platform fail open (the output is
 * treated as valid): webhook validation is advisory.
 */
export interface HttpWebhookResponseBody {
  valid: boolean;
  reason?: string;
}
