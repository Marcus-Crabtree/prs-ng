import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-create',
  templateUrl: '../vendor-maint-shared/vendor-maint.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {
  title: string ="Vendor-Create";
  vendor: Vendor = new Vendor;
  submitBtnTitle: string ="Create";

  constructor(private vendorSvc: VendorService,
              private router: Router) { }

  ngOnInit(): void {
  }



  save() {
    this.vendorSvc.create(this.vendor).subscribe(
      jr => {
        if(jr.errors==null){
this.router.navigateByUrl("/vendor/list");
        }
      }
    );
  }

}
