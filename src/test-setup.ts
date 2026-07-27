import { getTestBed } from '@angular/core/testing'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import 'zone.js/testing'

// 1. First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())

// 2. Fix the DOM prototype for JSDOM
Object.defineProperty(HTMLElement.prototype, 'ariaLabel', {
  get() {
    return this.getAttribute('aria-label')
  },
  set(value) {
    this.setAttribute('aria-label', value)
  },
  configurable: true
})

// 3. Only load the preset now (uses the modified prototypes)

/* fixes a bug with jsdom: ignoring this error message in log */
const originalConsoleError = console.error
type Err = { message: string }
console.error = (message, ...optionalParams) => {
  try {
    if (message?.includes('Error: Could not parse CSS stylesheet')) return
  } catch (err) {
    ;(err as Err).message = `Error in console.error`
    return
  }
  originalConsoleError(message, ...optionalParams)
}
