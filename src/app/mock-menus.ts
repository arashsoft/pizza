import {Menu} from './menu';

export const MENUS: Menu[] = [
  {
    id: 11, name: 'Main Menu',
    menuSections: [
      {
        id: 111, name: 'Pizzas', foods: [
          {
            id: 1111,
            name: 'Pizza Margherita',
            description: 'Olive, Ground Meat',
            price: 12.35
          }, {
            id: 1112,
            name: 'Pizza second',
            description: 'Tomato',
            price: 18.99
          }, {
            id: 1111,
            name: 'Pizza third',
            description: 'Basil, olive, meat',
            price: 13.50
          }, {
            id: 1112,
            name: 'Pizza fourth',
            description: 'tomato',
            price: 18.99
          }, {
            id: 1111,
            name: 'Pizza fifth',
            description: 'olive, meat',
            price: 16.99
          }]
      },
      {
        id: 111, name: 'Beverages', foods: [
          {
            id: 1111,
            name: 'Coke',
            description: '',
            price: 2.35
          }, {
            id: 1112,
            name: 'Diet Coke',
            description: '',
            price: 4.99
          }, {
            id: 1111,
            name: 'Canada Dry',
            description: '',
            price: 3.50
          }, {
            id: 1112,
            name: 'Sprite',
            description: '',
            price: 2.75
          }]
      }
    ]
  },
  {id: 12, name: 'Lunch Special',
    menuSections: [
      {
        id: 111, name: 'Pizzas', foods: [
          {
            id: 1111,
            name: 'Pizza Margherita',
            description: 'Olive, Ground Meat',
            price: 12.35
          }, {
            id: 1112,
            name: 'Pizza second',
            description: 'Tomato',
            price: 18.99
          }, {
            id: 1111,
            name: 'Pizza third',
            description: 'Basil, olive, meat',
            price: 13.50
          }, {
            id: 1112,
            name: 'Pizza fourth',
            description: 'tomato',
            price: 18.99
          }, {
            id: 1111,
            name: 'Pizza fifth',
            description: 'olive, meat',
            price: 16.99
          }, {
            id: 1112,
            name: 'Pizza sixth',
            description: 'tomato',
            price: 17.49
          }]
      }
    ]},
];
