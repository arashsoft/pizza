import {MenuSection} from './menuSection';

export class Menu {
  id: number;
  name: string;
  menuSections: MenuSection[];
  sortOrder: number;

  // TODO: add back-end types
  constructor(menuObject) {
    this.id = menuObject.Id;
    this.name = menuObject.Name;
    this.sortOrder = menuObject.Order;
    const menuSections: MenuSection[] = [];
    menuObject.MenuSections.forEach(menuSectionObject => {
      menuSections.push(new MenuSection(menuSectionObject));
    });
    menuSections.sort(function(subMenu1, subMenu2) {
      return subMenu1.sortOrder - subMenu2.sortOrder;
    });
    this.menuSections = menuSections;
  }
}
