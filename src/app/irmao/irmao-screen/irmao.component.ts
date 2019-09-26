import { IrmaoService } from './../irmao.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IrmaoDialogComponent } from '../irmao-dialog/irmao-dialog.component';
import { DiaService } from 'src/app/dia/dia.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { PrivilegioService } from 'src/app/privilegio/privilegio.service';
import { Irmao, Dado } from '../irmao.model';
import { Subscription } from 'rxjs';
import { DiaSemana } from 'src/app/dia/dia.model';
import { Privilegio } from 'src/app/privilegio/privilegio.model';
import { switchMap } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-irmao',
  templateUrl: './irmao.component.html',
  styleUrls: ['./irmao.component.scss']
})
export class IrmaoComponent implements OnInit, OnDestroy {
  sub: Subscription;
  diaSemana: DiaSemana;
  privilegios: Privilegio[] = [];
  displayedColumns: string[] = ['indice', 'ações', 'nome'];
  dataSource: MatTableDataSource<Irmao>;

  constructor(
    private irmaoService: IrmaoService,
    private diaService: DiaService,
    private dialog: MatDialog,
    private privilegioService: PrivilegioService
  ) {}

  ngOnInit() {
    // this.sub = this.irmaoService.getUserIrmaos()
    // .subscribe(irmaos => this.dataSource = new MatTableDataSource(irmaos));
    this.sub = this.diaService
      .getUserDias()
      .pipe(
        switchMap(diaSemana => {
          const dias = diaSemana.dias.filter(a => a.isActive);
          this.diaSemana = null;
          this.diaSemana = diaSemana;
          this.diaSemana.dias = dias;
          return this.privilegioService.getUserPrivilegios();
        }),
        switchMap(privilegios => {
          this.privilegios = privilegios;
          this.diaSemana.dias.forEach((dia, idx) => {
            const privilegiosDia = this.privilegios.filter(
              priv => priv.dia === dia.name
            );
            this.diaSemana.dias[idx].priv = privilegiosDia;
          });
          return this.irmaoService.getUserIrmaos();
        })
      )
      .subscribe(irmaos => {
        this.dataSource = new MatTableDataSource(irmaos);
      });
  }

  openDialog(item?: Irmao): void {

    const novoIrmao = { id: '', name: '', privilegios: [], compromisso: [] };
    this.criaListaDeDiasComOsPrivilegios(novoIrmao);
    if (item) {
      this.setaListaDeDiasComOsPrivilegios(novoIrmao, item);
    }

    const dialogRef = this.dialog.open(IrmaoDialogComponent, {
      width: '600px',
      data: item
        ? { irmao: { ...novoIrmao }, isNew: false }
        : { irmao: { ...novoIrmao } as Irmao, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.irmaoService.createIrmao(result.irmao);
        } else {
          this.irmaoService.updateIrmao(result.irmao);
        }
      }
    });
  }

  deleteIrmao(irmao: Irmao) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { item: irmao.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.irmaoService.deleteIrmao(irmao.id);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  criaListaDeDiasComOsPrivilegios(novoIrmao: any) {

    this.diaSemana.dias.forEach(a => {
      const privilegio = [];
      a.priv.forEach(b => {
        privilegio.push({
          id: b.id,
          name: b.name,
          data: new Date(),
          existe: false
        });
      });

      novoIrmao.privilegios.push({ nameDia: a.name, privilegio });
    });

  }

  setaListaDeDiasComOsPrivilegios(novoIrmao: any, item: Irmao) {
    const seconds = 'seconds';
    novoIrmao.name = item.name;
    novoIrmao.id = item.id;
 
    if(item.compromisso.length > 0){
      item.compromisso.forEach((a,idx) =>{
        novoIrmao.compromisso.push(new Date(a[seconds] * 1000));
      })
    }
    novoIrmao.privilegios.forEach(a => {
      const dia = item.privilegios.find(b => a.nameDia === b.nameDia);
      if (dia) {
        a.privilegio.forEach(c => {
          const priv = dia.privilegio.find(d => d.id === c.id);
          if (priv) {
            c.data = new Date(priv.data[seconds] * 1000);
            c.existe = priv.existe;
          }
        });
      }
    });
  }
}
