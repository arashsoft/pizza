import {MenuSection} from './menuSection';

export class Menu {
  id: number;
  name: string;
  menuSections: MenuSection[];
  sortOrder: number;
  startDate: Date;
  endDate: Date;

  constructor(menuObject) {
    this.id = menuObject.Id;
    this.name = menuObject.Name;
    this.sortOrder = menuObject.Order;
    const menuSections: MenuSection[] = [];

    menuObject.CurrentWeekOnlineOrderingHours.every(hoursObject => {
      if (hoursObject.IsToday) {
        this.startDate = new Date(parseInt(hoursObject.Start.substring(6, 19), 10));
        this.endDate = new Date(parseInt(hoursObject.End.substring(6, 19), 10));
        return false;
      }
      return true;
    });

    menuObject.MenuSections.forEach(menuSectionObject => {
      menuSections.push(new MenuSection(menuSectionObject, this.startDate, this.endDate));
    });
    menuSections.sort(function (subMenu1, subMenu2) {
      return subMenu1.sortOrder - subMenu2.sortOrder;
    });
    this.menuSections = menuSections;
  }
}
