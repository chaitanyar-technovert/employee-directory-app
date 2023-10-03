import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpDeleteConfirmComponent } from '../emp-delete-confirm/emp-delete-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteDialogConfirmService {

  constructor(
    private _dialog: MatDialog
  ) { }

  openDeleteConfirmDialog(message: string) {
    return this._dialog.open(EmpDeleteConfirmComponent, {
        data: {
          msg: message
        }
      }
    )
  }
}
