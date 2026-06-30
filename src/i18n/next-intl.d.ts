import { type Locale } from './request'
import en from '../../messages/en.json'

declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale
    Messages: typeof en
  }
}
