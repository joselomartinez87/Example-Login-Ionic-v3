import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createSuccess = false;
  registerCredentials = { name: '', email: '', password: '', confirmation_password: '' };

  constructor(
    private nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController
  ) {}

  public register() {
    if (this.registerCredentials.password != this.registerCredentials.confirmation_password) {
      this.showPopup("Error", 'The password confirmation does not match.');
    } else {
      this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
        error => {
          this.showPopup("Error", error);
        });
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}