/**
 * @file New Relic Integration Package
 * @description
 * function to set up New Relic for browser monitoring and exposes a New Relic Logger instance.
 */

// Import New Relic initialization function from the utils folder
import { initializeNewRelic } from '../utils/init'

// Import New Relic Logger class from the utils folder
import NewRelicLogger from '../logger'
// Create an instance of the New Relic Logger
const loggerInstance = new NewRelicLogger()

// Expose New Relic initialization function as initRelicBrowserAgent
export const initRelicBrowserAgent = initializeNewRelic

// Expose New Relic Logger instance as logger
export const logger = loggerInstance
