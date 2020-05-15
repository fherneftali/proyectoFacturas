import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  public createDoc(data: {nombre: string}){
    return this.firestore.collection('facturas').add(data);
  }

  getFacturas() {
    throw new Error('Method not implemented.');
  }
}


