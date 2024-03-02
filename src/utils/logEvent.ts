import LoggerService from '@/library/loggerService'
import type { LoggerOption } from '@/types'

/**
 * LoggerService instance for direct usage.
 * @type LoggerService | null
 */

let loggerServiceInstance: LoggerService | null = null

/**
 * Log an event using the logger service.
 * @param {string} level - Log level of the event.
 * @param {string} eventName - Name of the event.
 * @param {Record<string, any>} eventData - Data associated with the event.
 */

function logEvent(
  level: string,
  eventName: string,
  eventData: Record<string, any>
): void {
  if (!loggerServiceInstance) {
    throw new Error(
      'Logger Service not initialized. Call initializeLoggerService first.'
    )
  }

  loggerServiceInstance.logEvent({ level, eventName, eventData })
}
