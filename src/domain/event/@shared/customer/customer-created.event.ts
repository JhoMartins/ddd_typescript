import EventInterface from "../event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}