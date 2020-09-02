import {Provider} from '@angular/core';

export const LANG_LIST: Language[] = [
  {code: 'ru', name: 'Русский', culture: 'ru-RU'},
  {code: 'en', name: 'English', culture: 'en-US'},
];

export interface Language {
  code: string;
  name: string;
  culture: string;
}


export function provideLanguageList(list: Language[]): Provider {
  return {
    provide: 'LANG_LIST',
    useValue: list
  };
}
