import CustomerAddressChangedEvent from "../customer-address-changed-event";
import EnviaConsoleLogHandler from "./envia-console-log.handler";

describe("EnviaConsoleLogHandler unit tests", () => {
  it("should log a message when handled", () => {
    const handler = new EnviaConsoleLogHandler();
    const event = new CustomerAddressChangedEvent({customerId: "1", customerName: "Cliente 1", address: "Rua 1, 123"});
    const spyConsoleLog = jest.spyOn(console, "log");

    handler.handle(event);

    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledWith("Endereço do cliente: 1, Cliente 1 alterado para: Rua 1, 123");
  });
});