import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title: string ="Product-List";
  products: Product[]=[];
  request: Request = new Request();


  constructor(private productSvc: ProductService,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    this .productSvc.list().subscribe(
      jr => {
        this.products = jr.data as Product[];
        console.log("Products list: ", this.products);
      }
    );
  }

}
