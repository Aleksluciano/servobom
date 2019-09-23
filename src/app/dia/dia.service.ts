import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap} from 'rxjs/operators';
import { DiaSemana } from './dia.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiaService {
uid: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  getUserDias(): Observable<DiaSemana> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.uid = user.uid;
          return this.db
            .collection<DiaSemana>('diaSemana').doc<DiaSemana>(this.uid).valueChanges();
        } else {
          return null;
        }
      }),
    );
  }


  updateDias(diaSemana: DiaSemana) {
    diaSemana.uid = this.uid;
    if (this.uid) {
    return this.db
       .collection('diaSemana')
       .doc(this.uid).set(diaSemana, {merge: true});
    }
  }


}
