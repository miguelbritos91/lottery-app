import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.getNumberSelected()
  }

  initLottery(){
    if(this.numbersRegistered.length > 1){
      this.stateLottery = 'lottery'
      this.startLottery()
    }else{
      this.loteryEmptyAlert()
    }
  }

  backToHome(){
    localStorage.setItem('numbersRegistered', '');
    this.router.navigate(['/'])
  }

  getNumberSelected(){
    this.numbersRegistered = []
    this.numbersRegistered = JSON.parse(localStorage.getItem('numbersRegistered') ?? '')
    console.log('MB: numbers'+JSON.stringify(this.numbersRegistered));
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
    console.log('MB win '+JSON.stringify(this.winer1));
    console.log('MB win '+JSON.stringify(this.winer2));
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
            console.log('MB: Aceptar')
            this.backToHome()
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss()
  }
}
