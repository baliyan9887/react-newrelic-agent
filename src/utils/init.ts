import generateNewRelicScript from '@/library/loggerService'
import { setCookie } from './cookies'
/**
 * Initializes New Relic for browser monitoring.
 *
 * This function sets up New Relic for browser monitoring by dynamically
 * generating and injecting the New Relic script into the HTML head. It also
 * allows the inclusion of an optional API license key for additional services.
 *
 * @param {string} accountId - The New Relic account ID associated with your account.
 * @param {string} applicationId - The unique identifier for the New Relic application.
 * @param {string} browserLicenseKey - The license key required for New Relic browser monitoring.
 * @param {string} [ApiLicenseKey] - An optional API license key for additional services.
 *
 * @returns {void}
 *
 * @throws {Error} Throws an error if any of the required parameters are not provided.
 *
 * @example
 * // Basic usage
 * initializeNewRelic('yourAccountId', 'yourApplicationId', 'yourBrowserLicenseKey');
 *
 * // Including an optional API license key
 * initializeNewRelic('yourAccountId', 'yourApplicationId', 'yourBrowserLicenseKey', 'yourApiLicenseKey');
 *
 * @see {@link https://docs.newrelic.com/docs/browser/new-relic-browser/getting-started/introduction-new-relic-browser New Relic Browser Documentation}
 */
export const initializeNewRelic = (
  accountId: string,
  applicationId: string,
  browserLicenseKey: string,
  ApiLicenseKey?: string
): void => {
  // Generate New Relic script based on provided parameters
  const newRelicScript = generateNewRelicScript(
    accountId,
    applicationId,
    browserLicenseKey
  )

  // Set additional cookies if API license key is provided
  if (ApiLicenseKey) {
    setCookie('_re_service_lic', ApiLicenseKey)
    setCookie('_re_service_ac', accountId)
  }

  // Create a script element and inject the New Relic script into the HTML head
  const scriptElement = document.createElement('script')
  scriptElement.type = 'text/javascript'
  scriptElement.textContent = newRelicScript
  document.head.appendChild(scriptElement)
}
