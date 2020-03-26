import { RecurrenceByDay } from './RecurrenceByDay';

export class RecurrenceMonthlyByDay extends RecurrenceByDay {

  public frequency: number;

  constructor(data: any) {
    super(data);
    this.frequency = Number.parseInt(data.$.monthFrequency);
  }
  
}
