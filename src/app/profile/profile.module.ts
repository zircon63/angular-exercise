import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfilePageComponent} from './profile-page.component';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {UiModule} from '../ui/ui.module';


@NgModule({
  declarations: [ProfilePageComponent, ProfileSettingsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    UiModule,
  ]
})
export class ProfileModule {
}
