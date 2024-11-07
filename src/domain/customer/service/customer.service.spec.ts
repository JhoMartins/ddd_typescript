import { Sequelize } from "sequelize-typescript";
import Address from "../value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import EnviaConsoleLog1Handler from "../event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../event/handler/envia-console-log-2.handler";
import CustomerService from "./customer.service";
import EnviaConsoleLogHandler from "../event/handler/envia-console-log.handler";

describe("Customer service unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepo = new CustomerRepository();
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();

    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const customerService = new CustomerService(customerRepo, eventDispatcher);

    const customer = await customerService.createCustomer("Customer 1");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      number: null,
      street: null,
      city: null,
      state: null,
      zipcode: null,
      rewardPoints: customer.rewardPoints
    });

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it ("should change customer address", async () => {
    const customerRepo = new CustomerRepository();
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    const customerService = new CustomerService(customerRepo, eventDispatcher);

    const customer = await customerService.createCustomer("Customer 1");
    const address = new Address("Street 1", "123", "City 1", "State 1", "12345");

    await customerService.changeAddress(customer, address);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      number: address.number,
      street: address.street,
      city: address.city,
      state: address.state,
      zipcode: address.zip,
      rewardPoints: customer.rewardPoints
    });

    expect(spyEventHandler).toHaveBeenCalled();
  });
});