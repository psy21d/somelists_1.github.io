import { vueI18n } from '@/i18n/i18n'
import VueI18n from 'vue-i18n'

export const generateScope = ((i) => () => i++)(0)

/**
 * @param messages
 * @example Simple usage
 * const { $t } = i18nScope({
 *   ru: {
 *     message: "Привет мир!"
 *   },
 *   en: {
 *     message: "Hello world!"
 *   }
 * })
 * $t('message') // `Привет мир!` or `Hello World!`
 */
export const i18nScope = (messages: VueI18n.LocaleMessages) => {
  const scope = generateScope()
  const languages = Object.keys(messages)
  languages.forEach((lang: VueI18n.Locale) => {
    const i18nMessages = vueI18n.getLocaleMessage(lang)

    vueI18n.setLocaleMessage(lang, {
      ...i18nMessages,
      [scope]: messages[lang]
    })
  })
  return {
    $t: (key: string, params: any = {}) => vueI18n.t(`${scope}.${key}`, params).toString()
  }
}
