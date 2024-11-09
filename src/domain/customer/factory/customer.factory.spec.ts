import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("CustomerFactory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Customer A");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street 1", "1", "City 1", "SP", "Zipcode 1");
    const customer = CustomerFactory.createWithAddress("Customer A", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.Address).toBe(address);
  });
});