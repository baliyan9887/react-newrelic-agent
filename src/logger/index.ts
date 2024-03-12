/**
 * @file NewRelicLogger.ts
 * @description Defines a logger class that extends the base Logger class and logs events to New Relic.
 */

import Logger from './logger'
import request from '@/utils/httpUtils'
import { getCookie } from '@/utils/cookies'
import {
  LOGGER_TAGS,
  RELIC_SERVICE_LICENSE_KEY,
  RELIC_SERVICE_ACCOUNT,
  RELIC_SERVICE_APP_NAME
} from '@/constants'

/**
 * Represents a logger class that extends the base Logger class and logs events to New Relic.
 * This class provides functionality to log events to New Relic's Insights platform, which allows
 * for centralized monitoring and analysis of application logs and metrics.
 * @class
 */
class NewRelicLogger extends Logger {
  /**
   * Logs an event to New Relic.
   * This method constructs a payload containing the event details, including the event type, message,
   * timestamp, and log level. It then sends this payload to New Relic's Insights collector endpoint
   * using HTTP POST request.
   * @param {string} event - The event to log.
   * @param {any} message - The message associated with the event.
   * @param {string} level - The log level.
   * @protected
   */
  protected async logToNewRelic(event: string, message: any, level: string) {
    // Retrieve the New Relic API key from cookies
    const apiKey = getCookie(RELIC_SERVICE_LICENSE_KEY) || ''
    // Retrieve the New Relic account ID and application name from cookies
    const accountId = getCookie(RELIC_SERVICE_ACCOUNT)
    const eventType = getCookie(RELIC_SERVICE_APP_NAME)
    // Construct the Insights collector URL
    const insightsCollectorURL = `https://insights-collector.newrelic.com/v1/accounts/${accountId}/events`

    // Construct the payload to be sent to New Relic
    const payload = {
      eventType,
      event,
      level,
      message: String(message),
      timestamp: new Date().toISOString()
    }

    // Set the headers for the HTTP request
    const headers = {
      'Api-Key': apiKey,
      'Content-Type': 'application/json'
    }

    try {
      // Send the payload to New Relic's Insights collector endpoint
      const response = await request({
        method: 'POST',
        url: insightsCollectorURL,
        headers,
        body: JSON.stringify(payload)
      })
    } catch (error) {
      // Handle any errors that occur during the HTTP request
      console.error(`Error posting to New Relic: ${error}`)
    }
  }

  /**
   * Logs an event.
   * This method overrides the base `log` method of the parent Logger class. It first logs the event
   * using the parent method, then asynchronously logs the event to New Relic using the `logToNewRelic`
   * method. Any errors that occur during the New Relic logging process are caught and logged to the console.
   * @param {string} event - The event to log.
   * @param {any} message - The message associated with the event.
   * @param {string} level - The log level.
   * @protected
   */
  protected log(event: string, message: any, level: string = LOGGER_TAGS.INFO) {
    // Log the event using the parent method
    super.log(event, message, level)
    // Asynchronously log the event to New Relic
    this.logToNewRelic(event, message, level).catch(console.error)
  }
}

export default NewRelicLogger
