import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import { GetNumbersRegistersAction } from '../redux/redux.actions';
import { LocalStorageService } from '../services/local-storage.service';

interface AppState {
  numbers: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  number:any = {}
  editData:any = false
  numbersRegistered: any[] = []

  constructor(private localStoreService: LocalStorageService, private router: Router, private alertController: AlertController, private store: Store<AppState>) { 
    this.number = {}
    const dataStorage = this.localStoreService.getStorage('numbersRegistered')
    this.numbersRegistered = dataStorage ?? []
    this.store.select('numbers').subscribe( state => {
      this.numbersRegistered = JSON.parse(state)
    })
  }

  ngOnInit() {
    this.getNumberSelected()
  }

  backToHome(){
    this.localStoreService.setStorage('numberSelect', {})
    this.router.navigate(['/'])
  }

  getNumberSelected(){
    const itemStorage = this.localStoreService.getStorage('numberSelect')
    const item = {
      value: itemStorage.value,
      register: itemStorage.register ?? false,
      name: itemStorage.name ?? '',
      lastname: itemStorage.lastname ?? '',
      phone: itemStorage.phone ?? '',
    }
    this.number = item
  }

  register(){
    if(this.number.name != '' || this.number.lastname != ''){
      this.number.register = true
      this.numbersRegistered.push(this.number)
      this.localStoreService.setStorage('numbersRegistered', this.numbersRegistered)
      const action = new GetNumbersRegistersAction()
      this.store.dispatch(action)
      this.backToHome()
    }
  }

  edit(){
    const idx = this.numbersRegistered.findIndex(i => i.value === this.number.value)
    this.numbersRegistered[idx] = this.number
    this.localStoreService.setStorage('numbersRegistered', this.numbersRegistered)
    const action = new GetNumbersRegistersAction()
    this.store.dispatch(action)
    this.backToHome()
  }

  delete(){
    const idx = this.numbersRegistered.findIndex(i => i.value === this.number.value)
    this.numbersRegistered.splice(idx, 1)
    this.localStoreService.setStorage('numbersRegistered', this.numbersRegistered)
    const action = new GetNumbersRegistersAction()
    this.store.dispatch(action)
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
