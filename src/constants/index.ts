/**
 * @file constants.ts
 * @description Defines constants used throughout the logger package.
 */

/**
 * Logger categories.
 * @constant {Object.<string>} LOGGER_CATEGORY
 * @property {string} DEFAULT - Default logger category.
 * // Add more categories as needed...
 */
export const LOGGER_CATEGORY = {
  DEFAULT: 'Default'
  // Add more categories as needed...
} as const

/**
 * Logger tags.
 * @constant {Object.<string>} LOGGER_TAGS
 * @property {string} INFO - Information log tag.
 * @property {string} WARNING - Warning log tag.
 * @property {string} ERROR - Error log tag.
 */
export const LOGGER_TAGS = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
} as const

/**
 * New Relic service license key constant.
 * @constant {string} RELIC_SERVICE_LICENSE_KEY
 */
export const RELIC_SERVICE_LICENSE_KEY = '_re_service_lic'

/**
 * New Relic service account constant.
 * @constant {string} RELIC_SERVICE_ACCOUNT
 */
export const RELIC_SERVICE_ACCOUNT = '_re_service_ac'

/**
 * New Relic service application name constant.
 * @constant {string} RELIC_SERVICE_APP_NAME
 */
export const RELIC_SERVICE_APP_NAME = '_re_service_app'
