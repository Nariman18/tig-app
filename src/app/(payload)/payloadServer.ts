import payload from 'payload'
import config from '../../payload.config'

let isInitialized = false

export async function initPayloadServer() {
  if (!isInitialized) {
    await payload.init({
      config,
    })
    isInitialized = true
  }
}
