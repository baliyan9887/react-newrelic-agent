/**
 * @file LoggerService.ts
 * @description Implements the LoggerService class, providing logging capabilities with Winston and New Relic.
 */

import winston from 'winston'
import NewRelic from 'newrelic'

import type { LoggerOption } from '@/types'

type LogEventParams = { level: string; eventName: string } & Record<string, any>

class LoggerService {
  private static instance: LoggerService | null = null
  private logger: winston.Logger

  private constructor(options: LoggerOption) {
    // Configure winston logger.
    this.logger = winston.createLogger({
      level: options.level || 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'service name ' },
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
      ]
    })

    // Intialize New Relic Browser agent with provided API key and application ID
    ;(NewRelic as any)
      .config({
        license_key: options.newRelicApiKey,
        applicationID: options.newRelicApplicationId,
        agent: 'browser'
      })
      .instrument()
  }

  public static getInstance(options: LoggerOption): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService(options)
    }

    return LoggerService.instance
  }

  private sendToNewRelic(
    level: string,
    eventName: string,
    eventData: Record<string, any>
  ): void {
    // Send log event to New Relic Browser agent.
    ;(NewRelic as any).addPageAction(`${level}: ${eventName}`, eventData)
  }

  logEvent(props: LogEventParams): void {
    const { level, eventName, ...eventData } = props

    this.logger.log({ level, message: `${eventName}`, ...eventData })
    this.sendToNewRelic(level, eventName, eventData)
  }
}

export default LoggerService
