import { switchMap } from 'rxjs/operators';
import { DiaService } from './../../dia/dia.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, pipe } from 'rxjs';
import { DiaSemana } from 'src/app/dia/dia.model';
import { MatDialog } from '@angular/material';
import { PrivDialogComponent } from '../dialogs/priv-dialog.component';
import { Privilegio } from '../privilegio.model';
import { PrivilegioService } from '../privilegio.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-privilegio',
  templateUrl: './privilegio.component.html',
  styleUrls: ['./privilegio.component.scss']
})
export class PrivilegioComponent implements OnInit, OnDestroy {
  sub: Subscription;
  diaSemana: DiaSemana;
  privilegios: Privilegio[] = [];

  constructor(private diaService: DiaService,
              private dialog: MatDialog,
              private privilegioService: PrivilegioService) { }

  ngOnInit() {

    this.sub = this.diaService
    .getUserDias()
    .pipe(
      switchMap(diaSemana => {
      const dias = diaSemana.dias.filter(a => a.isActive);
      this.diaSemana = null;
      this.diaSemana = diaSemana;
      this.diaSemana.dias = dias;
      return this.privilegioService.getUserPrivilegios();
    })).subscribe(privilegios => {
      this.privilegios = privilegios;
      this.diaSemana.dias.forEach((dia, idx) => {
        const privilegiosDia = this.privilegios.filter(priv => priv.dia === dia.name);
        // this.diaSemana.dias[idx] = { ...{ privi: privilegiosDia} , ...dia } ;
        this.diaSemana.dias[idx].priv = privilegiosDia;
        console.log(dia);
      });
      console.log(this.diaSemana);
      });



  }

  openDialog(name: string, item?: Privilegio ): void {

    const dialogRef = this.dialog.open(PrivDialogComponent, {
      width: '500px',
      data: item ? { privi: { ...item }, isNew: false } : { privi: { name: '', nivel: '', dia: name } as Privilegio , isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.privilegioService.createPrivilegio(result.privi);
        } else {
          this.privilegioService.updatePrivilegio(result.privi);
        }
      }
    });
  }


  choiceColor(color: string) {
   switch (color) {
     case '1':
      return 'yellow';
       case '2':
        return 'blue';
        case '3':
          return 'green';
          case '4':
            return 'purple';
            case '5':
       return 'orange';
     default:
       break;
   }
  }

  deletePrivilegio(privilegioId: string, privilegioName: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { item: privilegioName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.privilegioService.deletePrivilegio(privilegioId);
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
