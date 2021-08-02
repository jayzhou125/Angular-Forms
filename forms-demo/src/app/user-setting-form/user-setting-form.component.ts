import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
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

  userSettings : UserSettings = { ...this.originalUserSettings }
  postError = false;
  postErrorMessage = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
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
    console.log('in onSubmit: ', form.valid);

    if (form.valid){
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error => this.onHttpError(error)
      );
    }
    else{
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors"
    }
  }

}
