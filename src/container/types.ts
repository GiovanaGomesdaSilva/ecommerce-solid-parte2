import { PrismaClient } from "@prisma/client/extension";
import { EtherealMailProvider } from "../providers/EtherealMailProvider";

export const TYPES = {
    PrismaClient: Symbol('PrismaCliente'),
    MailProvider: Symbol('MailProvider'),
    ProductRepository: Symbol('ProductRepository'),
    OrderRepository: Symbol('OrderRepository'),
    PaymentMethod: Symbol('PaymentMethod'),
    PaymentMethodRegistry: Symbol('PaymentMethodRegistry'),
    NotificationService: Symbol('NotificationService'),
    OrderService: Symbol('OrderService'),
    OrderController: Symbol('OrderController'),
}