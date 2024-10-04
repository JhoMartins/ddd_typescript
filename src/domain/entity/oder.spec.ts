import Order from "./order";
import OrderItem from "./order_item";

describe("Oder unit tests", () => {
	it("Should throw a error when id is empty", () => {
    expect(() => {
      let order = new Order("", "1", []);
    }).toThrowError("Id is required");
	});

  it("Should throw a error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
	});

  it("Should throw a error when items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items are required");
	});

  it("Should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("01", "c1", [item]);

    var total = order.total();

    expect(total).toBe(200);

    const order2 = new Order("02", "c2", [item, item2]);
    var total = order2.total();
    
    expect(total).toBe(600);
	});

  it("Should throw error if the item qtd is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      const order = new Order("01", "c1", [item]);
    }).toThrowError("Quantity must be greather than zero");
	});

});