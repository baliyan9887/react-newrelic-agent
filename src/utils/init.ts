import generateNewRelicScript from '@/library/loggerService'
import { setCookie } from '@/utils/cookies'
import { validateParams } from '@/utils/validateParams'
import { NewRelicInitParams } from '@/types'
import {
  RELIC_SERVICE_LICENSE_KEY,
  RELIC_SERVICE_ACCOUNT,
  RELIC_SERVICE_APP_NAME
} from '@/constants'

/**
 * Initializes New Relic for browser monitoring.
 *
 * This function configures New Relic for browser monitoring by dynamically generating
 * and injecting the New Relic script into the HTML head. It also provides support for
 * an optional API license key and application name, allowing for additional services and customization.
 *
 * Before initialization, it validates the provided parameters to ensure they meet the
 * required criteria. Once validated, the New Relic script is generated with the provided
 * parameters and injected into the HTML head. If an API license key is provided, it's
 * set as a cookie along with the account ID and optional application name.
 *
 * This function is designed to prevent multiple initializations of the New Relic script
 * by checking a flag. If the script is already initialized, a warning is logged, and the
 * function returns without performing any further actions.
 *
 * @param {NewRelicInitParams} params - An object containing the parameters for initializing New Relic.
 * @returns {void}
 * @throws {Error} Throws an error if any required parameters are missing or if type checks fail.
 *
 * @example
 * // Basic usage
 * initializeNewRelic({
 *   accountId: 'yourAccountId',
 *   applicationId: 'yourApplicationId',
 *   browserLicenseKey: 'yourBrowserLicenseKey'
 * });
 *
 * // Including an optional API license key and application name
 * initializeNewRelic({
 *   accountId: 'yourAccountId',
 *   applicationId: 'yourApplicationId',
 *   browserLicenseKey: 'yourBrowserLicenseKey',
 *   appName: 'yourAppName',
 *   ApiLicenseKey: 'yourApiLicenseKey'
 * });
 *
 * @see {@link https://docs.newrelic.com/docs/browser/new-relic-browser/getting-started/introduction-new-relic-browser New Relic Browser Documentation}
 */
let isNewRelicInitialized = false

export const initializeNewRelic = (params: NewRelicInitParams): void => {
  try {
    // Check if New Relic script is already initialized
    if (isNewRelicInitialized) {
      return
    }

    // Validate parameters
    validateParams(params)

    // Generate New Relic script based on provided parameters
    const newRelicScript = generateNewRelicScript(
      params.accountId,
      params.applicationId,
      params.browserLicenseKey
    )

    // Set additional cookies if API license key is provided
    if (params.ApiLicenseKey) {
      setCookie(RELIC_SERVICE_LICENSE_KEY, params.ApiLicenseKey)
      setCookie(RELIC_SERVICE_ACCOUNT, params.accountId)
      setCookie(RELIC_SERVICE_APP_NAME, params.appName || 'RelicLogger')
    }

    // Create a script element and inject the New Relic script into the HTML head
    const scriptElement = document.createElement('script')
    scriptElement.type = 'text/javascript'
    scriptElement.textContent = newRelicScript
    document.head.appendChild(scriptElement)

    // Update flag to indicate that New Relic script is initialized
    isNewRelicInitialized = true
  } catch (error: any) {
    // If there's an error during initialization, reset isNewRelicInitialized flag
    isNewRelicInitialized = false
    console.error('Error initializing New Relic:', error.message)
  }
}
