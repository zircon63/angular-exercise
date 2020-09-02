import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-profile-page',
  template: `
    <h1>
      Profile page
    </h1>
    <div class="header">
      <nav>
        <a routerLink="./settings">
          <li>Settings</li>
        </a>
      </nav>
      <app-language-select></app-language-select>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {

}
