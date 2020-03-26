import * as xml2js from 'xml2js';

import { Recurrence } from '../models/Recurrence';

export class RecurrenceParser {
  public static parse(str: string): Recurrence {
    let recurrence: Recurrence;
    xml2js.parseString(str, { explicitArray: false }, (error, result) => {
      recurrence = new Recurrence(result.recurrence);
    });
    return recurrence;
  }
}
