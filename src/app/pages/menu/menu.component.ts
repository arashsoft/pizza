import { Component, OnInit } from '@angular/core';
import {Menu} from '../../model/menu';
import {MENUS} from '../../mock-menus';


@Component({
  selector: 'app-page-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Menu[];

  constructor() { }

  ngOnInit() {
    this.menus = MENUS;
  }

}
