import { initializeNewRelic } from './utils/init'
import NewRelicLogger from './utils/newRelicLogger'

const newRelicLogger = new NewRelicLogger()

export const init = initializeNewRelic
export const relicLogger = newRelicLogger
export const runTest = () => {
  console.log('Linking and runing...')
}
