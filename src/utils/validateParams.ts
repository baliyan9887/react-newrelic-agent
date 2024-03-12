/**
 * @file validateParams.ts
 * @description Contains a function for validating New Relic initialization parameters.
 */

import { NewRelicInitParams } from '../types'

/**
 * Validates New Relic initialization parameters.
 * Logs styled error messages to the console if any parameter fails validation.
 * @param {NewRelicInitParams} params - The parameters to validate.
 */
export const validateParams = (params: NewRelicInitParams): void => {
  if (!params.accountId || !params.applicationId || !params.browserLicenseKey) {
    const errorMessage = `\x1b[1m\x1b[31mRelic Logger Error:\x1b[0m\x1b[1m accountId, applicationId, and browserLicenseKey are required parameters.\x1b[0m`
    console.error(errorMessage)
  }
  if (
    params.accountId &&
    (!params.accountId.trim() || typeof params.accountId !== 'string')
  ) {
    console.error(
      '\x1b[31mRelic Logger Error:\x1b[0m \x1b[1maccountId must be a non-empty string.\x1b[0m'
    )
  }

  if (
    params.applicationId &&
    (!params.applicationId.trim() || typeof params.applicationId !== 'string')
  ) {
    console.error(
      '\x1b[31mRelic Logger Error:\x1b[0m \x1b[1mapplicationId must be a non-empty string.\x1b[0m'
    )
  }

  if (
    params.browserLicenseKey &&
    (!params.browserLicenseKey.trim() ||
      typeof params.browserLicenseKey !== 'string')
  ) {
    console.error(
      '\x1b[31mRelic Logger Error:\x1b[0m \x1b[1mbrowserLicenseKey must be a non-empty string.\x1b[0m'
    )
  }

  if (params.appName && typeof params.appName !== 'string') {
    console.error(
      '\x1b[31mRelic Logger Error:\x1b[0m \x1b[1mappName must be a string if provided.\x1b[0m'
    )
  }

  if (params.ApiLicenseKey && typeof params.ApiLicenseKey !== 'string') {
    console.error(
      '\x1b[31mRelic Logger Error:\x1b[0m \x1b[1mApiLicenseKey must be a string if provided.\x1b[0m'
    )
  }
}
