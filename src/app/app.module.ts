import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonMissingTranslationHandler} from './@core/i18n/missing-translation.handler';
import {translateStaticLoader} from './@core/i18n/translate.loader';
import {LANG_LIST, Language, provideLanguageList} from './@core/i18n/language';
import {MockApiModule} from './@mock-api/mock-api.module';
import {MOCK_API_CONFIG} from './@mock-api/mock-api.config';


export function applicationInit(translate: TranslateService, langList: Language[]): () => Promise<void> {
  return () => {
    translate.addLangs(langList.map(lang => lang.code));
    translate.setDefaultLang(langList[0].code);
    return translate.use(langList[0].code).toPromise();
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MockApiModule.withMocks(MOCK_API_CONFIG),
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CommonMissingTranslationHandler,
      },
      loader: {
        provide: TranslateLoader,
        useFactory: translateStaticLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideLanguageList(LANG_LIST),
    {
      provide: APP_INITIALIZER,
      useFactory: applicationInit,
      deps: [TranslateService, 'LANG_LIST'],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
