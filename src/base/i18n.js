import { createI18n } from 'vue-i18n'
import status from '@/locales/translationStatus.json'
import locales from '@/locales/index'
import localeEn from '@/locales/locale-en.json'

const defaultDateTimeFormat = {
  hourMinute: {
    hour: 'numeric',
    minute: 'numeric',
  },
  yearMonthDay: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
  longWithDayName: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
  },
  dayName: {
    weekday: 'long',
  },
  weekdayHourMinute: {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
  },
  dateAndTime: {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
  },
  dateWithDayName: {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  },
  dateLongWithDayName: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  },
}

const defaultNumberFormat = {
  twoDigitNumber: {
    minimumSignificantDigits: 2,
    maximumSignificantDigits: 2,
  },
}

const dateTimeFormats = {}
const numberFormats = {}
for (const locale of Object.values(locales)) {
  dateTimeFormats[locale.locale] = defaultDateTimeFormat
  numberFormats[locale.locale] = defaultNumberFormat
}

const i18n = createI18n({
  // Just need to include 'en' here as it is the fallback locale
  // All other locales are loaded on demand in base/datastore/i18nPlugin
  messages: {
    en: localeEn,
  },
  dateTimeFormats,
  numberFormats,
  fallbackLocale: 'en', // if you change this make sure to always load the locale too
})
export default i18n

const TEN_PM = new Date()
TEN_PM.setHours(22, 0)

const DAY_KEYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
const DAY_INDEX = DAY_KEYS.reduce((acc, key, idx) => {
  acc[key] = idx
  return acc
}, {})
const SUNDAY_INDEX = DAY_KEYS.indexOf('SU')

export function dayNameForKey (key) {
  const date = new Date()
  date.setDate(date.getDate() - date.getDay() - SUNDAY_INDEX + DAY_INDEX[key])
  return i18n.d(date, 'dayName')
}
export function dayNames () {
  return DAY_KEYS.map(dayNameForKey)
}

export function dayOptions () {
  return DAY_KEYS.map(key => ({
    label: dayNameForKey(key),
    value: key,
  }))
}

export function sortByDay (a, b) {
  return DAY_INDEX[a] - DAY_INDEX[b]
}

export const localeOptions = Object.values(locales).map(({ name, locale }) => ({
  label: name,
  value: locale,
  percentage: status[locale] / 100,
})).sort((a, b) => b.percentage - a.percentage)

// Does not work, pls fix
/*
if (module.hot) {
  module.hot.accept([
    '@/locales/locale-en.json',
  ], () => {
    i18n.setLocaleMessage('en', require('@/locales/locale-en.json'))
  })
}
*/
