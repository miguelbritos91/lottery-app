import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { Store } from '@ngrx/store'
import { LocalStorageService } from '../services/local-storage.service';

interface AppState {
  numbers: any;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  numbers: any[] = []
  numbersRegistered: any[] = []
  rows: any[] = []

  constructor(private localStoreService: LocalStorageService, private router: Router, private store: Store<AppState>) {
    this.store.select('numbers').subscribe( state => {
      this.numbersRegistered = JSON.parse(state)
      this.localStoreService.setStorage('numbersRegistered', this.numbersRegistered)
      this.handleRefresh()
    })
  }

  ngOnInit(): void {
    this.loadNumbers()
    this.handleRefresh()
  }

  handleRefresh(event?:any) {    
    const data = this.localStoreService.getStorage('numberRegistered')
    this.numbersRegistered = data;
    this.loadNumbers()
    if(event) event.target.complete()
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
        const val = (this.numbersRegistered.length > 0) ? this.numbersRegistered.filter((el) => el.value == value) : []
        if (val.length > 0) {
          this.numbers.push(val[0])
        }else{
          this.numbers.push(number)
        }
      }
      this.rows.push(this.numbers)
    }
  }

  registerNumber(num:any){
    this.localStoreService.setStorage('numberSelect', {})
    this.localStoreService.setStorage('numberSelect', num)
    this.router.navigate(['/register'])
  }

  getNumbersRegistered(){
    this.numbersRegistered = this.localStoreService.getStorage('numbersRegistered')
  }

  gotoSorteo(){
    this.router.navigate(['/lottery'])
  }
}
