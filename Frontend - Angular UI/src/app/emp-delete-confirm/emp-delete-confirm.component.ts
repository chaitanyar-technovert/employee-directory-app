import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-delete-confirm',
  templateUrl: './emp-delete-confirm.component.html',
  styleUrls: ['./emp-delete-confirm.component.scss']
})
export class EmpDeleteConfirmComponent {

  constructor(
    private _dialogRef: MatDialogRef<EmpDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

    onCancelClick() {
      // Close the dialog and pass the false to indicate cancellation.
      this._dialogRef.close(false);
    }
    
    onDeleteClick() {
      // Close the dialog and pass the false to indicate cancellation.
      this._dialogRef.close(true);
    }

}
