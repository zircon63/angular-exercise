import {Injectable} from '@angular/core';
import {Profile} from './profile';
import {LoadingService} from '../../@core/loading/loading.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public user!: Profile;

  constructor(private loadingService: LoadingService,
              private httpClient: HttpClient) {
  }

  async getProfileUser(): Promise<Profile> {
    this.loadingService.loading('get.profile');
    try {
      const user = await this.httpClient.get<Profile>('https://blueface.com/profile').toPromise();
      this.user = user;
      return this.user;
    } finally {
      this.loadingService.end('get.profile');
    }
  }

  async setName(firstName: string, lastName: string): Promise<Profile> {
    this.loadingService.loading('set.profile');
    const user = {
      firstName: this.user.firstName,
      lastName: this.user.lastName
    };
    try {
      await this.httpClient.put<{ lastName: string, firstName: string }>('https://blueface.com/profile', {
        firstName,
        lastName
      }).toPromise();
    } catch (e) {
      this.loadingService.end('set.profile');
      throw e;
    }
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    try {
      await this.setUserEmail(firstName, lastName);
    } catch (e) {
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.loadingService.end('set.profile');
      throw e;
    }
    this.loadingService.end('set.profile');
    return this.user;
  }

  private async setUserEmail(firstName: string, lastName: string): Promise<Profile> {
    const email = `${firstName.trim()}.${lastName.trim()}@blueface.com`;
    const response = await this.httpClient.put('https://blueface.com/email', {}).toPromise();
    this.user.email = email;
    return this.user;
  }
}
