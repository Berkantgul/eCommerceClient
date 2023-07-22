import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }


  openDialog(dialogParameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width,
      height: dialogParameters.options?.height,
      data: dialogParameters.data
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == dialogParameters.data) {
        dialogParameters.callBack()
      }
    });
  }
}

export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  callBack: () => void;
  options?: Partial<DialogOptions> = new DialogOptions()
}

export class DialogOptions {
  width?: string = "250px";
  height?: string = "250px";
  position?: DialogPosition
}
