import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private sqlite: SQLite) { 
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      console.log('MB: Bases de datos OK! nueva')
      // create table numbers
      db.executeSql('CREATE TABLE IF NOT EXISTS numbers(value INT, register INT, name CHAR(100), lastname CHAR(100), phone CHAR(15))', []).then(()=>{
        console.log('MB: table numbers create ok')
      }).catch((e)=>{
        console.log('MB: Error create table', e.toString())
      })
    }).catch((e)=>{
      console.log('MB: Error create DB', e.toString())
    })
   }

   registerNumber(number:any){
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('INSERT INTO numbers(value, register, name, lastname, phone) VALUES (?, ?, ?, ?, ?)', [number.value, number.register, number.name, number.lastname, number.phone]).then(()=>{
        console.log('MB: Number register');
      }).catch((e)=>{
        console.log('MB: Error on insert', e.toString())
      })
    }).catch((e)=>{
      console.log('MB: Error on DB', e.toString())
    })
   }

   getNumbersRegistered(){
    let numbers: any[] = [];
    return this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      return db.executeSql('SELECT value, register, name, lastname, phone FROM numbers', []).then((data)=>{
        if(data.rows.length > 0 ) {
        }
        for (let i = 0; i < data.rows.length; i++) {
          const el = data.rows.item(i)
          numbers.push(el)
        }
        console.log('MB: Get Numbers'+JSON.stringify(numbers));
        return numbers;
      }).catch((e)=>{
        console.log('MB: Error on select items', e.toString())
        return numbers;
      })
    }).catch((e)=>{
      console.log('MB: Error on DB', e.toString())
      return numbers;
    })
   }

   editNumber(number:any){
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('UPDATE numbers SET name = ?, lastname = ?, phone = ? WHERE value = ?', [number.name, number.lastname, number.phone, number.value]).then(()=>{
        console.log('MB: Number edited');
      }).catch((e)=>{
        console.log('MB: Error on edited', e.toString())
      })
    }).catch((e)=>{
      console.log('MB: Error on DB', e.toString())
    })
   }

   deleteNumber(number:any){
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('DELETE FROM numbers WHERE value = ?', [number.value]).then(()=>{
        console.log('MB: Delete register');
      }).catch((e)=>{
        console.log('MB: Error on delete', e.toString())
      })
    }).catch((e)=>{
      console.log('MB: Error on DB', e.toString())
    })
   }
}
