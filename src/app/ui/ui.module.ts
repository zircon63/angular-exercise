import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectComponent } from './language-select/language-select.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
    declarations: [LanguageSelectComponent],
    exports: [
        LanguageSelectComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UiModule { }
