import * as _ from 'lodash';

export abstract class Global {
  static priceRound(number: number): number {
    return _.round(number, 2);
  }

  static safeSum(number1: number, number2: number) {
    return Global.priceRound((number1 * 100 + number2 * 100) / 100);
  }

  static safeMinus(number1: number, number2: number) {
    return Global.priceRound((number1 * 100 - number2 * 100) / 100);
  }

}
