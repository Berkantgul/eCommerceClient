import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private toastrService: CustomToastrService) { }

  ngOnInit(): void {
    this.toastrService.message("Merhaba", "Deneme", {
      messageType: ToastrMessageType.Success,
      toastrPosition: ToastrPosition.BottomRight
    })
  }

}
