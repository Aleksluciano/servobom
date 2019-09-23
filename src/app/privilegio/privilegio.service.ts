import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Privilegio } from './privilegio.model';

@Injectable({
  providedIn: 'root'
})
export class PrivilegioService {
  uid: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  getUserPrivilegios(): Observable<Privilegio[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.uid = user.uid;
          return this.db
            .collection<Privilegio>('privilegio', ref =>
            ref.where('uid', '==', user.uid)).valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
    );
  }

  async createPrivilegio(privilegio: Privilegio) {
    const user = await this.afAuth.auth.currentUser;
    return this.db.collection('privilegio').add({
      ...privilegio,
      uid: user.uid
    });
  }


  updatePrivilegio(privilegio: Privilegio) {
    return this.db
       .collection('privilegio')
       .doc(privilegio.id).update(privilegio);
  }


  deletePrivilegio(privilegioId: string) {
    return this.db
      .collection('privilegio')
      .doc(privilegioId)
      .delete();
  }


}
