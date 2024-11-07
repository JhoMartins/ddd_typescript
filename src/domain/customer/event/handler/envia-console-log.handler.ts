import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed-event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle(event: CustomerAddressChangedEvent): void {
    const customerId = event.eventData.customerId;
    const customerName = event.eventData.customerName;
    const address = event.eventData.address;

    console.log(`Endereço do cliente: ${customerId}, ${customerName} alterado para: ${address}`);
  }
}