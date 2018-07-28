import { Component, OnInit } from '@angular/core';

import {Menu} from '../model/menu';
import {MENUS} from '../mock-menus';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  menus: Menu[];

  constructor() { }

  ngOnInit() {
    this.menus = MENUS;
  }

}
