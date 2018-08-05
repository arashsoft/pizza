import {Menu} from './model/menu';
import {FoodAnswer} from './model/foodAnswer';
import {Food} from './model/food';

export const MENUS: Menu[] = [
  {
    id: 11, name: 'Main Menu',
    menuSections: [
      {
        id: 111, name: 'Pizzas', foods: [
          new Food(
            1111,
            'Pizza Margherita',
            'Olive, Ground Meat',
            12.35,
            undefined,
            [
              {
                id: 12,
                name: 'Toppings',
                items: [
                  new FoodAnswer(
                    8723,
                    'Mutti Peeled Tomatoes'
                  ),
                  new FoodAnswer(
                    8723,
                    'Rapini'
                  ),
                  new FoodAnswer(
                    8723,
                    'Cherry Tomatoes'
                  ),
                  new FoodAnswer(
                    8723,
                    'Portobello Mushrooms'
                  ),
                  new FoodAnswer(
                    8723,
                    'Extra virgin olive oil'
                  )
                ]
              },
              {
                id: 15,
                name: 'Beverages',
                items: [
                  new FoodAnswer(
                    8723,
                    'Coke',
                    1.99
                  ),
                  new FoodAnswer(
                    8723,
                    'Diet Coke',
                    1.99
                  ),
                  new FoodAnswer(
                    8723,
                    'Canada Dry',
                    2.25
                  ),
                  new FoodAnswer(
                    8723,
                    'Sprite',
                    2.75
                  ),
                  new FoodAnswer(
                    8723,
                    'water',
                    1.50
                  )
                ]
              }
            ]
          ), new Food(
            1112,
            'Pizza second',
            'Tomato',
            18.99
          ), new Food(
            1111,
            'Pizza third',
            'Basil, olive, meat',
            13.50
          ), new Food(
            1112,
            'Pizza fourth',
            'tomato',
            18.99
          ), new Food(
            1111,
            'Pizza fifth',
            'olive, meat',
            16.99
          )]
      },
      {
        id: 111, name: 'Beverages', foods: [
          new Food(
            1111,
            'Coke',
            '',
            2.35
          ), new Food(
            1112,
            'Diet Coke',
            '',
            4.99
          ), new Food(
            1111,
            'Canada Dry',
            '',
            3.50
          ), new Food(
            1112,
            'Sprite',
            '',
            2.75
          )]
      }
    ]
  },
  {
    id: 12, name: 'Lunch Special',
    menuSections: [
      {
        id: 111, name: 'Pizzas', foods: [
          new Food(
            1111,
            'Pizza Margherita',
            'Olive, Ground Meat',
            12.35
          ), new Food(
            1112,
            'Pizza second',
            'Tomato',
            18.99
          ), new Food(
            1111,
            'Pizza third',
            'Basil, olive, meat',
            13.50
          ), new Food(
            1112,
            'Pizza fourth',
            'tomato',
            18.99
          ), new Food(
            1111,
            'Pizza fifth',
            'olive, meat',
            16.99
          ), new Food(
            1112,
            'Pizza sixth',
            'tomato',
            17.49
          )]
      }
    ]
  },
];
