import { RequestOptions } from '@/types'
import { LOGGER_CATEGORY, LOGGER_TAGS } from '../constants/index'
import request from './httpUtils'
import { getCookie } from './cookies'

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
    const logMessage = `[${level.toUpperCase()}] | Category: ${category} | Module: ${module} | Message: ${String(
      message
    )}`

    if (this.options.isEnabled) {
      if (this.options.customErrorHandler) {
        try {
          this.options.customErrorHandler(logMessage)
        } catch (error) {
          console.error('Error in custom error handler:', error)
        }
      } else {
        console.log(logMessage)
      }

      // Log to New Relic as a custom event, if available and appropriate.
      this.logToNewRelic(message, module, category, level)
    }
  }

  private async logToNewRelic(
    message: any,
    module: string,
    category: string,
    level: string
  ) {
    // Check if New Relic is available
    // if (typeof window !== 'undefined' && (window as any).newrelic) {
    //   ;(window as any).newrelic.addPageAction('LogEvent', {
    //     level: level,
    //     category: category,
    //     module: module,
    //     message: String(message),
    //     timestamp: new Date().toISOString()
    //   })
    // }

    const lice = getCookie('lice')
    console.log('lice', lice)

    const data = {
      level: level,
      category: category,
      module: module,
      message: String(message),
      timestamp: new Date().toISOString()
    }

    console.log('Dtata', data)

    const payload = {
      eventType: 'VscodeCLI',
      status: 'true',
      errors: 'Testing from the vscode logger',
      category,
      level,
      message
    }

    const headers = {
      'Api-Key': 'c6d3f24e47660cb6e0854f80e74b56783664NRAL',
      'Content-Type': 'application/json'
      // 'Content-Length': Buffer.byteLength(payloadString),
    }

    const options: RequestOptions = {
      method: 'POST',
      url: 'https://insights-collector.newrelic.com/v1/accounts/4376467/events',
      headers,
      body: JSON.stringify(payload)
    }

    // try {
    //   const response = await request(options)
    //   console.log(`Response from New Relic: ${response}`)
    // } catch (error) {
    //   console.error(`There was an error posting to New Relic. Error: ${error}`)
    // }
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
