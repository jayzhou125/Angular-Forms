import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-setting-form',
  templateUrl: './user-setting-form.component.html',
  styleUrls: ['./user-setting-form.component.css']
})
export class UserSettingFormComponent implements OnInit {

  originalUserSettings : UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  }
  
  startDate: Date | undefined;
  startTime: Date | undefined;
  userRating = 0;
  maxRating = 10;
  isReadonly = false;

  userSettings : UserSettings = { ...this.originalUserSettings }
  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]> | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
    this.startTime = new Date();
  }

  onBlur(field: NgModel){
    console.log('in onBlur: ', field.valid);
  }

  onHttpError(errorResponse: any){
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm){
    console.log('in onSubmit: ', form.value);

    // if (form.valid){
    //   this.dataService.postUserSettingsForm(this.userSettings).subscribe(
    //     result => console.log('success: ', result),
    //     error => this.onHttpError(error)
    //   );
    // }
    // else{
    //   this.postError = true;
    //   this.postErrorMessage = "Please fix the above errors"
    // }
  }

}
