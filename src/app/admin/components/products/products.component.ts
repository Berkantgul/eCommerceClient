import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.httpClientService.get({ controller: "Products" }).subscribe(data => console.log(data))
    // this.httpClientService.post({ controller: "/Products" }, { name: 'Kağıt', stock: "1500", price: 15 }).subscribe()
    // this.httpClientService.update({ controller: "Products" }, { id: 'a858747f-42a7-4775-8896-a2ee5a3c3639', stock: 45, name: 'renkli kağıt', price: 80 }).subscribe()
    // this.httpClientService.delete({ controller: "Products" }, "ef5c904a-d2a9-4cd1-8bea-a2b74e324b3d").subscribe(() => { err => { console.log(err.error) } })

    this.httpClientService.get({ fullEndPoint: "https://jsonplaceholder.typicode.com/posts" }).subscribe(data => console.log(data))
  }




}
