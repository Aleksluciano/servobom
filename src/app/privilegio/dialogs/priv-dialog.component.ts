import { browser } from 'protractor';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-priv-dialog',
  template: `
    <h1 mat-dialog-title>Criar privilégio - {{ data.privi.dia }}</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input
          type="text"
          placeholder="Nome"
          matInput
          [(ngModel)]="data.privi.name"
        />
      </mat-form-field>
      <br />
      <label>Nível:</label>
      <mat-button-toggle-group
        appearance="legacy"
        name="fontStyle"
        aria-label="Font Style"
        [(ngModel)]="data.privi.nivel"
      >
        <mat-button-toggle *ngFor="let item of niveis" value="{{ item }}">{{
          item
        }}</mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button
        [disabled]="!data.privi.name || !data.privi.nivel"
        mat-button
        [mat-dialog-close]="{
          privi: {
            id: data.privi?.id || '',
            name: data.privi.name,
            dia: data.privi.dia,
            nivel: data.privi.nivel
          },
          isNew: data.isNew
        }"
      >
        {{ data.isNew ? "Criar" : "Salvar" }}
      </button>
    </div>
  `,
  styles: [
    `
      mat-button-toggle-group {
        margin-left: 15px;
        margin-top: 5px;
      }

      mat-form-field {
        width: 100%;
      }

      h1 {
        text-align: center;
      }
    `
  ]
})
export class PrivDialogComponent {
  niveis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  constructor(
    public dialogRef: MatDialogRef<PrivDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
