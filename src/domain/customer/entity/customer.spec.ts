import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
	it("Should throw error when id is empty", () => {
		expect(() => {
			let customer = new Customer("", "Jhonatan Martins");
		}).toThrowError("Id is required");
	});

	it("Should throw error when name is empty", () => {
		expect(() => {
			let customer = new Customer("123", "");
		}).toThrowError("Name is required");
	});

	it("Should change name", () => {
		const customer = new Customer("123", "Jhonatan Martins");
		customer.changeName("Jhonatan");

		expect(customer.name).toBe("Jhonatan");
	});
	
	it("Should activate customer name", () => {
		const customer = new Customer("1", "Customer 1");
		const address = new Address("Rua 1", "123", "São Paulo", "SP", "12345-678");
		customer.Address = address;

		customer.activate();

		expect(customer.isActive()).toBe(true);
	});

	it("Should throw error when address is undefined when you activate a customer", () => {
		expect(() => {
			const customer = new Customer("1", "Customer 1");
			customer.activate();
		}).toThrowError("Address is mandatory to activate a customer ");
	});


	it("Should deactivate customer name", () => {
		const customer = new Customer("1", "Customer 1");

		customer.deactivate();

		expect(customer.isActive()).toBe(false);
	});

	it("Should add reward points", () => {
		const customer = new Customer("1", "Customer 1");
		expect(customer.rewardPoints).toBe(0);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(10);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(20);
	});

});