export class RecurrenceYearly {

  public frequency: number;
  public month: number;
  public date: number;

  constructor(data: any) {
    this.frequency = Number.parseInt(data.$.yearFrequency);
    this.month = Number.parseInt(data.$.month) - 1;
    this.date = Number.parseInt(data.$.day);
  }

  public toDate(year: number): Date {
    return new Date(year, this.month, this.date);
  }
  
}
