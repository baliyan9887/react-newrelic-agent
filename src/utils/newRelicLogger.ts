// src/logger.ts
import { LOGGER_CATEGORY, LOGGER_TAGS } from '../constants/index'

interface LoggerOptions {
  isEnabled?: boolean
  customErrorHandler?: (error: any) => void
}

class NewRelicLogger {
  private options: LoggerOptions

  constructor(options: LoggerOptions = {}) {
    this.options = {
      isEnabled: true,
      customErrorHandler: undefined,
      ...options
    }
  }

  private log(
    message: any,
    module: string,
    category: string = LOGGER_CATEGORY.DEFAULT,
    level: string = LOGGER_TAGS.INFO
  ) {
    const logMessage = `[${level.toUpperCase()}] | Category: ${category} | Module: ${module} | Error: ${String(
      message
    )}`

    // Check if logger is enabled
    if (this.options.isEnabled) {
      // Check if custom error handler is provided
      if (this.options.customErrorHandler) {
        try {
          // Use the custom error handler
          this.options.customErrorHandler(logMessage)
        } catch (error) {
          console.error('Error in custom error handler:', error)
        }
      } else {
        // Default behavior: log to console
        console.log(logMessage)
      }

      // Check if New Relic is available and it's a production environment
      if ((window as any)?.newrelic && process.env.NODE_ENV === 'production') {
        // Log error to New Relic
        ;(window as any)?.newrelic.noticeError(logMessage)
      }
    }
  }

  public logInfo(
    message: any,
    module: string,
    category: string = LOGGER_CATEGORY.DEFAULT
  ) {
    this.log(message, module, category, LOGGER_TAGS.INFO)
  }

  public logWarning(
    message: any,
    module: string,
    category: string = LOGGER_CATEGORY.DEFAULT
  ) {
    this.log(message, module, category, LOGGER_TAGS.WARNING)
  }

  public logError(
    message: any,
    module: string,
    category: string = LOGGER_CATEGORY.DEFAULT
  ) {
    this.log(message, module, category, LOGGER_TAGS.ERROR)
  }
}

export default NewRelicLogger
