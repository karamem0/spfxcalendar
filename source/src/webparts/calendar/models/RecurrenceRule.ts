import { RecurrenceRepeat } from './RecurrenceRepeat';

export class RecurrenceRule {

  constructor(private data: any) {
  }

  public get repeatForever(): string {
    if (this.data.hasOwnProperty('repeatForever')) {
      return this.data.repeatForever;
    }
  }

  public get repeatInstances(): number {
    if (this.data.hasOwnProperty('repeatInstances')) {
      return Number.parseInt(this.data.repeatInstances);
    }
  }

  public get windowEnd(): Date {
    if (this.data.hasOwnProperty('windowEnd')) {
      return new Date(Date.parse(this.data.windowEnd));
    }
  }

  public get repeat(): RecurrenceRepeat {
    if (this.data.hasOwnProperty('repeat')) {
      return new RecurrenceRepeat(this.data.repeat);
    }
  }
  
}
