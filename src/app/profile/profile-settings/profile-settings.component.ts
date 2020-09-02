import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Self} from '@angular/core';
import {ProfileService} from '../state/profile.service';
import {combineLatest, defer, noop, Observable} from 'rxjs';
import {Profile} from '../state/profile';
import {finalize, map, take, takeUntil, tap} from 'rxjs/operators';
import {FormBuilder, Validators} from '@angular/forms';
import {NgOnDestroy} from '../../@core/providers/ng-on-destroy.service';
import {repeatUntil} from '../../@operators/repeat-until';
import {canNotBeEmpty} from '../../@core/validators/can-not-be-empty.validator';
import {LoadingService} from '../../@core/loading/loading.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class ProfileSettingsComponent implements OnInit {
  public profile$: Observable<Profile>;
  public settings = this.fb.group({
    firstName: this.fb.control(null, [Validators.required, canNotBeEmpty]),
    lastName: this.fb.control(null, [Validators.required, canNotBeEmpty])
  });
  public loading$ = combineLatest([
    this.loadingService.isLoading$('get.profile').pipe(
      map(loading => ({loading, message: 'profile.loading.get-profile'}))
    ),
    this.loadingService.isLoading$('set.profile').pipe(
      map(loading => ({loading, message: 'profile.loading.set-profile'}))
    ),
  ]).pipe(
    map(loadings => {
      const item = loadings.find(loading => loading.loading);
      return item ? item.message : false;
    })
  );

  constructor(private readonly profileService: ProfileService,
              private readonly fb: FormBuilder,
              private readonly changeDetectorRef: ChangeDetectorRef,
              public readonly loadingService: LoadingService,
              @Self() private readonly ngOnDestroy$: NgOnDestroy) {
  }

  ngOnInit(): void {
    this.loadingService.anyLoading$.pipe(
      takeUntil(this.ngOnDestroy$)
    ).subscribe(anyLoading => {
      if (anyLoading) {
        this.settings.disable();
      } else {
        this.settings.enable();
      }
    });
    this.profile$ = defer(() => this.profileService.getProfileUser()).pipe(
      repeatUntil(error => error.hasOwnProperty('error')),
      tap((user) => {
        this.settings.setValue({
          firstName: user.firstName,
          lastName: user.lastName
        });
      })
    );
  }

  saveProfile(): void {
    const {firstName, lastName} = this.settings.value;
    const setName$ = defer(() => this.profileService.setName(firstName, lastName));
    this.settings.setErrors(null);
    setName$.pipe(
      take(1),
      finalize(() => this.changeDetectorRef.detectChanges())
    ).subscribe(noop, e => {
      if (e.error === 'error.profile.email-generation') {
        this.settings.setValue({
          firstName: this.profileService.user.firstName,
          lastName: this.profileService.user.lastName
        });
      }
      this.settings.setErrors({
        api: e.error
      });
    });
  }

}
