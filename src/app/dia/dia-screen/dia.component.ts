import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dia, DiaSemana } from '../dia.model';
import { Subscription } from 'rxjs';
import { DiaService } from '../dia.service';


@Component({
  selector: 'app-dia',
  templateUrl: './dia.component.html',
  styleUrls: ['./dia.component.scss']
})

export class DiaComponent implements OnInit, OnDestroy {

diaSemana: DiaSemana = { uid: '', dias: [{ name: 'segunda', isActive: false}, { name: 'terça', isActive: false}, { name: 'quarta',
// tslint:disable-next-line: max-line-length
isActive: false}, { name: 'quinta', isActive: false}, { name: 'sexta', isActive: false}, { name: 'sábado', isActive: false}, { name: 'domingo', isActive: false}]};
sub: Subscription;


constructor(public diaService: DiaService) { }

ngOnInit(): void {
  this.sub = this.diaService
  .getUserDias()
  .subscribe(diaSemana => {
   if (diaSemana) {
     this.diaSemana.uid = diaSemana.uid;
     this.diaSemana.dias.forEach( a => {
       const dia = diaSemana.dias.find(b => b.name === a.name);
       if (dia) {a.isActive = dia.isActive; }
     });
   }
  });
}

updateDia(item) {
  item.isActive = !item.isActive;
  this.diaService.updateDias(this.diaSemana);
}

ngOnDestroy() {
  this.sub.unsubscribe();
}

}


