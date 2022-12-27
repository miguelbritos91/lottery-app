import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  numbers: any[] = []
  numbersRegistered: any[] = []
  rows: any[] = []

  constructor(private dbService: DbServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadNumbers()
    this.handleRefresh()
  }

  handleRefresh(event?: any) {    
    this.dbService.getNumbersRegistered().then((data)=>{
      console.log('MB: numeros registrados:', data)
      this.numbersRegistered = data;
      console.log('MB: numeros:'+JSON.stringify(this.numbersRegistered))
      this.loadNumbers()
      event.target.complete()
    })
  };

  loadNumbers(){
    this.numbers = []
    this.rows = []
    this.getNumbersRegistered()
    for (let j = 0; j < 10; j++) {
      this.numbers = []
      for (let i = 0; i < 10; i++) {
        const value = i+(10*j)
        const number = {
          register: false,
          value: value,
          name: null,
          lastname: null,
          phone:null
        }
        // console.log('MB: ya tengo los numeros'+JSON.stringify(this.numbersRegistered))
        const val = this.numbersRegistered.filter((el) => el.value == value)
        if (val.length > 0) {
          console.log('MB: exist'+JSON.stringify(val))
          this.numbers.push(val[0])
        }else{
          this.numbers.push(number)
        }
      }
      this.rows.push(this.numbers)
    }
    console.log('MB: load numbers')
  }

  registerNumber(num:any){
    localStorage.setItem('numberSelect', '');
    localStorage.setItem('numberSelect', JSON.stringify(num));
    this.router.navigate(['/register'])
  }

  getNumbersRegistered(){
    this.dbService.getNumbersRegistered().then((data)=>{
      this.numbersRegistered = data;
    })
  }

  gotoSorteo(){
    localStorage.setItem('numbersRegistered', '');
    localStorage.setItem('numbersRegistered', JSON.stringify(this.numbersRegistered));
    this.router.navigate(['/lottery'])
  }
}
