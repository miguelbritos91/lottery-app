import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.page.html',
  styleUrls: ['./lottery.page.scss'],
})
export class LotteryPage implements OnInit {

  stateLottery:any = 'init'
  numbersRegistered:any = []
  winer1:any = {}
  winer2:any = {}

  constructor(private router: Router, private localStoreService: LocalStorageService, private alertController: AlertController) {
    const dataStorage = this.localStoreService.getStorage('numbersRegistered')
    this.numbersRegistered = dataStorage ?? []
  }

  ngOnInit() { }

  initLottery(){
    if(this.numbersRegistered.length > 1){
      this.stateLottery = 'lottery'
      this.startLottery()
    }else{
      this.loteryEmptyAlert()
    }
  }

  backToHome(){
    this.router.navigate(['/'])
  }

  startLottery(){
    let win1 = 0
    let win1Data = {
      value: null,
      register: null,
      name: null,
      lastname: null,
      phone: null,
    }
    let win2 = 0
    let win2Data = {
      value: null,
      register: null,
      name: null,
      lastname: null,
      phone: null,
    }
    const min = 0
    const max = this.numbersRegistered.length - 1
    let lotteryFinish = false
    while(!lotteryFinish){
      win1 = this.random(min,max)
      win2 = this.random(min,max)
      win1Data = this.numbersRegistered[win1]
      win2Data = this.numbersRegistered[win2]
      if (win1 != win2 && (win1Data.name != win2Data.name || win1Data.lastname != win2Data.lastname)) {
        this.winer1 = win1Data
        this.winer2 = win2Data
        lotteryFinish = true
      }
    }
    setTimeout(() => {
      this.stateLottery = 'finish'
    }, 3000);
  }

  random(min:any, max:any) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  async loteryEmptyAlert() {
    const alert = await this.alertController.create({
      header: 'No hay números registrados para realizar el sorteo',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.backToHome()
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss()
  }
}
