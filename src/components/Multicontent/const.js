import { RouterPaths } from "../../router/consts";

export const DropdownOptions = [
    {
        text: "Notatka",
        icon: 'sticky note outline',
        action: 'modalNoteAdd',
        redirectAfter: RouterPaths.NOTES,
    },
    {
        text: "Zadanie",
        icon: 'calendar check outline',
        description: 'Not ready',
        action: 'modalTodoAdd',
    },
    {divider: true},
    {
        text: "Wydarzenie",
        icon: 'calendar outline',
        description: 'Not ready',
        action: 'modalEventAdd',
    },
    {
        text: "Zakładka",
        icon: 'external',
        description: 'Not ready',
        action: 'modalBookmarkAdd',
    },
    {
        text: "Dokument",
        icon: 'question',
        description: 'Not ready',
        action: 'modalDocAdd',
    },
    {
        text: "Kontakt",
        icon: 'question',
        description: 'Not ready',
        action: 'modalContactAdd',
    },
    {
        text: "Kod/hasło",
        icon: 'question',
        description: 'Not ready',
        action: 'modalPassAdd',
    },
];
