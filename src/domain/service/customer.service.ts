import {v4 as uuid} from "uuid";
import CustomerRepositoryInterface from "../repository/customer-reposity.interface";
import EventDispatcherInterface from "../event/@shared/event-dispatcher.interface";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "../event/@shared/customer/customer-created.event";
import Address from "../entity/address";
import CustomerAddressChangedEvent from "../event/@shared/customer/customer-address-changed-event";
export default class CustomerService {
  private customerRepo: CustomerRepositoryInterface;
  private eventDispatcher: EventDispatcherInterface;

    constructor(customerRepo: CustomerRepositoryInterface, eventDispatcher: EventDispatcherInterface) {
      this.customerRepo = customerRepo;
      this.eventDispatcher = eventDispatcher;
    }

    async createCustomer(name: string): Promise<Customer> {
      const customer = new Customer(uuid(), name);
      await this.customerRepo.create(customer);
      this.eventDispatcher.notify(new CustomerCreatedEvent({customerId: customer.id, customerName: customer.name}));
      
      return customer;
    }

    async changeAddress(customer: Customer, address: Address): Promise<Customer> {
      customer.changeAddress(address);
      await this.customerRepo.update(customer);
      this.eventDispatcher.notify(new CustomerAddressChangedEvent({customerId: customer.id, customerName: customer.name, address: address.toString()}));
      
      return customer;
    }
}