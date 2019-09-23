import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <h1>Confirmação!</h1>
  <p>Quer mesmo deletar o item {{ data.item }} ?</p>
  <div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancelar</button>
  <button mat-button [mat-dialog-close]="true" >
    Confirmar
  </button>
</div>
  `,

})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
