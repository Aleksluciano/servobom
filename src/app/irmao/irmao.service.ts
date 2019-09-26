import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Irmao } from './irmao.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IrmaoService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  getUserIrmaos(): Observable<Irmao[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<Irmao>('irmao', ref =>
            ref.where('uid', '==', user.uid)).valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
    );
  }

  async createIrmao(irmao: Irmao) {
    const user = await this.afAuth.auth.currentUser;
    return this.db.collection('irmao').add({
      ...irmao,
      uid: user.uid
    });
  }


  updateIrmao(irmao: Irmao) {
    return this.db
       .collection('irmao')
       .doc(irmao.id).update(irmao);
  }


  deleteIrmao(irmaoId: string) {
    return this.db
      .collection('irmao')
      .doc(irmaoId)
      .delete();
  }
}
