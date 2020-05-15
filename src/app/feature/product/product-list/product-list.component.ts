import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title: string ="Product-List";
  products: Product[]=[];


  constructor(private productSvc: ProductService) { }

  ngOnInit(): void {
    this .productSvc.list().subscribe(
      jr => {
        this.products = jr.data as Product[];
        console.log("Products list: ", this.products);
      }
    );
  }

}
