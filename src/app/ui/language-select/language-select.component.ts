import {ChangeDetectionStrategy, Component, Inject, OnInit, Self} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {Language} from '../../@core/i18n/language';
import {FormBuilder} from '@angular/forms';
import {NgOnDestroy} from '../../@core/providers/ng-on-destroy.service';
import {switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class LanguageSelectComponent implements OnInit {
  public langList$: Observable<Language[]>;
  public language = this.fb.control(null);

  constructor(private readonly translate: TranslateService,
              @Inject('LANG_LIST') private readonly langList: Language[],
              private readonly fb: FormBuilder,
              @Self() private readonly ngOnDestroy$: NgOnDestroy
  ) {
  }

  ngOnInit(): void {
    this.langList$ = of(this.langList);
    this.language.setValue(this.translate.currentLang);
    this.language.valueChanges.pipe(
      switchMap(langCode => this.translate.use(langCode)),
      takeUntil(this.ngOnDestroy$)
    ).subscribe();
  }

}
