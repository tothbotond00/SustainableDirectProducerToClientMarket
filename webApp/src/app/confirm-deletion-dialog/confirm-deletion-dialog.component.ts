import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-deletion-dialog',
  standalone: false,

  templateUrl: './confirm-deletion-dialog.component.html',
  styleUrl: './confirm-deletion-dialog.component.scss'
})
export class ConfirmDeletionDialogComponent {

  // The subject of the deletion (product, category, etc.)
  subject!: string;

  constructor(private dialogRef: MatDialogRef<ConfirmDeletionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { subject: string }) {
    this.subject = data.subject;
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }

}
