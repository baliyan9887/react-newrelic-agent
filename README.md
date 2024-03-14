# React New-Relic Agent

A comprehensive SDK for integrating New Relic monitoring into React applications. `react-relic-agent` simplifies the process of setting up New Relic for browser monitoring, providing React developers with an easy-to-use interface for sending custom events, metrics, and logs.

## Features

- Easy New Relic initialization in React applications
- Custom event logging with New Relic
- Performance metrics tracking
- Error logging and handling

## Installation

Install `react-relic-agent` using npm:

```bash
npm install react-relic-agent
```

or using yarn

```bash
yarn add react-relic-agent
```

## Creating an app in New Relic

Before instrumenting your app using the NPM package, a Browser App should be configured in New Relic. This may be done with or without a corresponding APM agent. Once the app has been created, the Copy/Paste JavaScript code on the app's Application settings page will contain the configuration values needed to define options when instantiating the agent via the NPM package.

- If a browser app does not already exist, create one:
  - From the New Relic navigation panel, click Add Data.
  - Select the Browser monitoring data source.
  - Choose the APM or Copy/Paste method.
  - Select or name your app and click Enable.
- From the navigation panel, select Browser to view browser apps.
- Select the desired app and navigate to the Application settings page.
- From the Copy/Paste JavaScript box, copy the configuration values assigned to the NREUM object (init, info, and loader_config). You will use these configuration values when instantiating the agent using the NPM package.

## Configuration Setup

The New Relic Browser agent configuration can be obtained from your New Relic account. Once you have retrieved the configuration details, you can initialize the `initRelicBrowserAgent` function with the required parameters.

### Configuration Example

```javascript
// Configuration obtained from New Relic Browser agent
NREUM.loader_config = {
  accountID: '123456',
  trustKey: '123456',
  agentID: '789012',
  licenseKey: 'NRJS-abcdef123456',
  applicationID: '789012'
}

// Initialize New Relic Browser agent with the obtained configuration
import { initRelicBrowserAgent } from 'react-relic-agent'

initRelicBrowserAgent({
  accountId: '123456',
  applicationId: '789012',
  browserLicenseKey: 'NRJS-abcdef123456',
  ApiLicenseKey: 'INGEST-LICENSE-xyz789', // INGEST-LICENSE key from profile -> API keys (Optional)
  appName: 'YOUR_APPLICATION_NAME' // Default - RelicLogger (Optional)
})
```

### How to Use

- **Account ID (accountId):** Use the `accountID` value from the New Relic configuration and assign it to the accountId parameter in the initRelicBrowserAgent function.
- **Application ID (applicationId):** Similarly, assign the applicationID value from the New Relic configuration to the `applicationId` parameter.
- **Browser License Key (browserLicenseKey):** Use the licenseKey value from the New Relic configuration and assign it to the `browserLicenseKey` parameter.
- **API License Key (ApiLicenseKey) (Optional):** Retrieve the INGEST-LICENSE key from your New Relic profile under API keys, and assign it to the `ApiLicenseKey` parameter.
- **Application Name (appName) (Optional):** Specify your application name using the `appName parameter`. If not provided, the default name will be 'RelicLogger'.

## Logging Events

You can log custom events or errors using the logger instance:

```javascript
import { logger } from 'react-relic-agent'

// Log a custom event
logger.logEvent('UserRegistration', {
  username: 'johndoe',
  plan: 'premium'
})

// Log an error
logger.logError(new Error('Something went wrong'), {
  page: 'SignUp',
  severity: 'critical'
})
```

## API Reference

### initRelicBrowserAgent(params)

Initializes the New Relic Browser agent with the provided configuration.

| Params                   | Description                         |
| ------------------------ | ----------------------------------- |
| accountid                | Your New Relic Account ID.          |
| applicationId            | Your New Relic Application ID.      |
| browserLicenseKey        | Your New Relic Browser License Key. |
| ApiLicenseKey (Optional) | Your New Relic API License Key.     |
| appName (Optional):      | Your application name.              |

### logger

The `logger` object exposes methods for logging events and errors.

```javascript
logEvent(eventName, attributes) // Logs a custom event.
```

| Params     | Description                                   |
| ---------- | --------------------------------------------- |
| eventName  | The name of the event.                        |
| attributes | An object containing attributes of the event. |

```javascript
logError(error, attributes): //Logs an error.
```

| Params     | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
| error      | The error object.                                                   |
| attributes | An object containing additional attributes about the error context. |

## Supported Browsers

Relic's supported browser list can be accessed [here](https://docs.newrelic.com/docs/browser/new-relic-browser/getting-started/compatibility-requirements-browser-monitoring/#browser-types).

## Library Compatibility

The browser agent is designed to work seamlessly with any JavaScript library or framework you may be using. It provides a set of API methods that can easily integrate into your chosen library or framework. For example, you can export or expose the initialized agent and create a new error boundary within your React application to handle errors using the `reactRelicAgent.noticeError()` method.

### Server-Side Rendering

Many modern frameworks support server-side rendering, which can significantly improve search engine optimization (SEO) and user experience performance. It's important to understand that the browser agent needs to be imported and set up within a browser environment. It won't function properly if it's executed on a server or within the server context of a server-side rendered application. Most frameworks offer ways to ensure that certain code runs only on the client side. Be sure to consult your framework's documentation for guidance on how to handle this.

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
