import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-irmao-dialog',
  templateUrl: './irmao-dialog.component.html',
  styleUrls: ['./irmao-dialog.component.scss']
})
export class IrmaoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<IrmaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCompromisso(date){
    this.data.irmao.compromisso.push(date._validSelected);
  }

}
