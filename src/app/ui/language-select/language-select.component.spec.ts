import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageSelectComponent} from './language-select.component';
import {Language} from '../../@core/i18n/language';
import {anyString, capture, instance, mock, verify, when} from 'ts-mockito';
import {TranslateService} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';

describe('LanguageSelectComponent', () => {
  let component: LanguageSelectComponent;
  let fixture: ComponentFixture<LanguageSelectComponent>;
  const mockTranslateService = mock(TranslateService);
  const langList: Language[] = [
    {
      code: 'a',
      name: 'Test',
      culture: ''
    },
    {
      code: 'b',
      name: 'Test',
      culture: ''
    }
  ];
  beforeEach(async(() => {
    when(mockTranslateService.currentLang).thenReturn('test');
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LanguageSelectComponent],
      providers: [
        {
          provide: 'LANG_LIST',
          useValue: langList
        },
        {
          provide: TranslateService,
          useValue: instance(mockTranslateService)
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select current language from lang list', () => {
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.language.value).toBe('test');
  });

  it('should have observable list languages', (done) => {
    when(mockTranslateService.use(anyString())).thenReturn(of());
    fixture.detectChanges();
    component.ngOnInit();
    component.langList$.subscribe(list => {
      expect(list).toBe(langList);
      done();
    });
  });
  it('should use select language', () => {
    when(mockTranslateService.use(anyString())).thenReturn(of());
    fixture.detectChanges();
    component.ngOnInit();
    component.language.setValue('en');
    const [selected] = capture(mockTranslateService.use).last();
    expect(selected).toBe('en');
  });
});
