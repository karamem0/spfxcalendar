export class RecurrenceWeekly {

  public frequency: number;
  public days: boolean[];

  constructor(data: any) {
    this.frequency = Number.parseInt(data.$.weekFrequency);
    this.days = [
      data.$.hasOwnProperty('su'),
      data.$.hasOwnProperty('mo'),
      data.$.hasOwnProperty('tu'),
      data.$.hasOwnProperty('we'),
      data.$.hasOwnProperty('th'),
      data.$.hasOwnProperty('fr'),
      data.$.hasOwnProperty('sa'),
    ];
  }
  
}
