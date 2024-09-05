import { createI18n } from 'vue-i18n'

const messages = {
  de: {
    Annahmeprüfung_Neu: 'Annahmeprüfung/Neu',
    filter: 'Filter',
    savedFilter: 'Gespeicherte Filter',
    aus: 'aus',
    Aktive_Filter: 'Aktive Filter: ',
    Alle_zurücksetzen: 'Alle zurücksetzen',
    Spalten_anzeigen: 'Spalten anzeigen'
  },
  en: {
    Annahmeprüfung_Neu: 'Acceptance Test/New',
    filter: 'Filter',
    savedFilter: 'Saved Filter',
    aus: 'from',
    Aktive_Filter: 'Active Filter: ',
    Alle_zurücksetzen: 'Reset all',
    Spalten_anzeigen: 'Show columns'
  }
}

const i18n = createI18n({
  locale: 'de',
  messages
})

export default i18n
