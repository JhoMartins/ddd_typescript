import Order from "../entity/order";
import RepositoryInterface from "../../@shared/repository/repository-interface";

export default interface ProductRepositoryInterface extends RepositoryInterface<Order> {}