import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = [
      new MenuItem("Users", "/user/list", "List of Users"),
      new MenuItem("Vendors", "/vendor/list","List of Vendors"),
      new MenuItem("Products", "/product/list", "List of Products"),
      new MenuItem("Log In", "/user/login", "Log In"),
    ];
  }

}
