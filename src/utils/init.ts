// src/newRelicInit.ts
import { generateNewRelicScript } from '../library/loggerService'

export const initializeNewRelic = (
  accountId: string,
  applicationId: string,
  licenseKey: string
) => {
  const newRelicScript = generateNewRelicScript(
    accountId,
    applicationId,
    licenseKey
  )

  // Create a script element and inject the New Relic script into the HTML head
  const scriptElement = document.createElement('script')
  scriptElement.type = 'text/javascript'
  scriptElement.textContent = newRelicScript // Use textContent instead of innerHTML
  document.head.appendChild(scriptElement)
}
