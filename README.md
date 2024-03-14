# React Relic Agent

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

## Usage

First, import and initialize the New Relic agent in your React application. Typically, this should be done as early as possible in your application's entry point:

```javascript
import { initRelicBrowserAgent } from 'react-relic-agent'

initRelicBrowserAgent({
  accountId: 'YOUR_ACCOUNT_ID',
  applicationId: 'YOUR_APPLICATION_ID',
  browserLicenseKey: 'YOUR_BROWSER_LICENSE_KEY',
  appName: 'YOUR_APPLICATION_NAME', // Optional
  ApiLicenseKey: 'YOUR_API_LICENSE_KEY' // Optional
})
```

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
