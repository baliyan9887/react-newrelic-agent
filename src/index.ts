import { initializeNewRelic } from './utils/init'
import NewRelicLogger from './utils/newRelicLogger'

const loggerInstance = new NewRelicLogger()

export const initRelicBrowserAgent = initializeNewRelic
export const logger = loggerInstance
