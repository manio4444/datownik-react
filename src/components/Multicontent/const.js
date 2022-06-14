import { RouterPaths } from 'router/consts';

export const DropdownDefault = {
  text: 'Dodaj nowy',
  prefix: 'Dodaj: ',
};

export const DropdownOptions = [
  {
    text: 'Notatka',
    icon: 'sticky note outline',
    action: 'modalNoteAdd',
    redirectAfter: RouterPaths.NOTES,
  },
  {
    text: 'Zadanie',
    icon: 'calendar check outline',
    action: 'modalTodoAdd',
  },
  {
    text: 'Wydarzenie',
    icon: 'calendar outline',
    action: 'modalEventAdd',
  },
  { divider: true },
  {
    text: 'Zakładka',
    icon: 'external',
    description: 'Not ready',
    action: 'modalBookmarkAdd',
  },
  {
    text: 'Dokument',
    icon: 'question',
    description: 'Not ready',
    action: 'modalDocAdd',
  },
  {
    text: 'Kontakt',
    icon: 'question',
    description: 'Not ready',
    action: 'modalContactAdd',
  },
  {
    text: 'Kod/hasło',
    icon: 'question',
    description: 'Not ready',
    action: 'modalPassAdd',
  },
];
