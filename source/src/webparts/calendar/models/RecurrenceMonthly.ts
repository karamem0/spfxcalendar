export class RecurrenceMonthly {

  public frequency: number;
  public date: number;

  constructor(data: any) {
    this.frequency = Number.parseInt(data.$.monthFrequency);
    this.date = Number.parseInt(data.$.day);
  }

  public toDate(year: number, month: number): Date {
    return new Date(year, month, this.date);
  }
  
}
