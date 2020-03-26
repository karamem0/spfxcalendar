export class RecurrenceDaily {

  public frequency: number;
  public weekday: boolean;

  constructor(data: any) {
    this.frequency = Number.parseInt(data.$.dayFrequency);
    this.weekday = data.$.hasOwnProperty('weekday');
  }
  
}
