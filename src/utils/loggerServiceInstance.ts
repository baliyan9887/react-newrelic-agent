import LoggerService from '@/library/loggerService'

/**
 * LoggerService instance for direct usage.
 * @type LoggerService | null
 */
let loggerServiceInstance: LoggerService | null = null

function getLoggerServiceInstance(): LoggerService | null {
  return loggerServiceInstance
}

/**
 * Export the logger service instance for direct usage.
 * @type LoggerService | null
 */
export default getLoggerServiceInstance
