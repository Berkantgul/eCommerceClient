import { Component, Inject, OnDestroy } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
declare var $: any
@Component({
  selector: 'app-create-shopping-dialog',
  templateUrl: './create-shopping-dialog.component.html',
  styleUrls: ['./create-shopping-dialog.component.scss']
})
export class CreateShoppingDialogComponent extends BaseDialog<CreateShoppingDialogComponent> implements OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateShoppingState,
    dialogRef: MatDialogRef<CreateShoppingDialogComponent>
  ) {
    super(dialogRef)
  }

  show: boolean = false

  completed() {
    this.show = true
  }
  ngOnDestroy(): void {
    if (!this.show)
      $("#basketModal").modal("show")
  }

}

export enum CreateShoppingState {
  Yes, No
}
