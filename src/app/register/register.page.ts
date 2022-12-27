import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  number:any = {}
  editData:any = false

  constructor(private dbService: DbServiceService, private router: Router, private alertController: AlertController) { 
    this.number = {}
   }

  ngOnInit() {
    this.getNumberSelected()
  }

  backToHome(){
    localStorage.setItem('numberSelect', '');
    this.router.navigate(['/'])
  }

  getNumberSelected(){
    const itemStorage = JSON.parse(localStorage.getItem('numberSelect') ?? '')
    const item = {
      value: itemStorage.value,
      register: itemStorage.register ?? false,
      name: itemStorage.name ?? '',
      lastname: itemStorage.lastname ?? '',
      phone: itemStorage.phone ?? '',
    }
    this.number = item
    console.log('MB:'+this.number)
  }

  register(){
    if(this.number.name != '' || this.number.lastname != ''){
      this.number.register = true
      console.log('MB;'+this.number)
      this.dbService.registerNumber(this.number)
      this.backToHome()
    }
  }

  edit(){
    console.log('MB;'+this.number)
    this.dbService.editNumber(this.number)
    this.backToHome()
  }

  delete(){
    console.log('MB;'+this.number)
    this.dbService.deleteNumber(this.number)
    this.backToHome()
  }

  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Eliminar registro',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('MB: cancel delete');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('MB: confirm delete');
            this.delete()
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
