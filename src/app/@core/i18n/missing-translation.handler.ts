import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class CommonMissingTranslationHandler extends MissingTranslationHandler{
  handle(params: MissingTranslationHandlerParams): any {
    console.warn(`Missing translate: ${params.key}`);
  }

}
