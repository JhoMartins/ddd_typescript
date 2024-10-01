import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Jhonatan Martins");
const address = new Address("Rua 1", "123", "São Paulo", "SP", "12345-678");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 100);
const item2 = new OrderItem("2", "Item 2", 150);

const order = new Order("1", customer._id, [item1, item2]);