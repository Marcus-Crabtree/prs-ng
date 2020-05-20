import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = "Product - Edit";
  vendors: Vendor[] = [];
  product: Product = new Product();
  productId: number = 0;
  submitBtnTitle: string ="Save";
  request: Request = new Request();


  constructor(private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    //sec check
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    //getting id from url
    this.route.params.subscribe(parms => this.productId = parms["id"]);
    //get the credit for the id passed in url
    this.productSvc.get(this.productId).subscribe(
      jr => {
        this.product = jr.data as Product;
      });
    //populate lists in drop downs
    this.vendorSvc.list().subscribe(
      jr => {
        this.vendors = jr.data as Vendor[];
      });
  }

  save() {
    this.productSvc.edit(this.product).subscribe(
      jr => {
        if (jr.errors == null) {
          //success
          this.router.navigateByUrl("/product/list");
        }
        else {
          console.log("***Error editing this Product: ", this.product, jr.errors);
          alert("Error editing Product. Try again.");
        }
      });
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }
}
