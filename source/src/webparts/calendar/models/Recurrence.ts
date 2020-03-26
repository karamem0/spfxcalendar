import { RecurrenceRule } from './RecurrenceRule';

export class Recurrence {

  constructor(private data: any) {
  }

  public get rule(): RecurrenceRule {
    if (this.data.hasOwnProperty('rule')) {
      return new RecurrenceRule(this.data.rule);
    }
  }

}
