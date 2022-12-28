import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getStorage(name:string){
    let data = localStorage.getItem(name) || '[]';
    return JSON.parse(data)
  }

  setStorage(name:string, value:any){
    const data = JSON.stringify(value)
    localStorage.setItem(name, data)
    return true;
  }
}
