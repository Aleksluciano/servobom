import { ShellComponent } from './shell/shell.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule, MatMenuModule, MatBadgeModule, MatDialogModule } from '@angular/material';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

const components = [ShellComponent, ConfirmDialogComponent];

const modules = [
  CommonModule,
  RouterModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatDialogModule
];


@NgModule({
  declarations: [...components],
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
