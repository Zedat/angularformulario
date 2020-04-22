import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  brand: any;
  db:any;

  constructor(db: AngularFirestore) {
    this.db = db;
  }

  getBrand(): Observable<any> {
    return this.db.collection('marca').snapshotChanges();
  }

  createModel(model) {
     return new Promise<any>((resolve, reject) =>{
        this.db
            .collection("modelo")
            .add(model)
            .then(res => {}, err => reject(err));
    }); 
  }
}
