import {MenuSection} from './menuSection';

export class Menu {
  id: number;
  name: string;
  menuSections: MenuSection[];

  // TODO: add back-end types
  constructor(menuObject) {
    this.id = menuObject.MenuId;
    this.name = menuObject.Name;
    const menuSections: MenuSection[] = [];
    menuObject.MenuSections.forEach(menuSectionObject => {
      menuSections.push(new MenuSection(menuSectionObject));
    });
    this.menuSections = menuSections;
  }
}
