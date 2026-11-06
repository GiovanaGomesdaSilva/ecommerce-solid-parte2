import { Container } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { TYPES } from './types';
import { OrderController } from '../controllers/OrderController';
import { OrderService } from '../services/OrderService';
import { NotificationService } from '../services/NotificationService';
import { IPaymentMethod } from '../payments/IPaymentMethod';
import { PaymentMethodRegistry } from '../payments/PaymentMethodRegistry';
import { CreditCardPayment } from '../payments/CreditCardPayment';
import { DebitCardPayment } from '../payments/DebitCardPayment';
import { PixPayment } from '../payments/PixPayment';
import { IMailProvider } from '../providers/IMailProvider';
import { EtherealMailProvider } from '../providers/EtherealMailProvider';
import { ConsoleMailProvider } from '../providers/ConsoleMailProvider';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IProductRepository } from '../repositories/IProductRepository';
import { PrismaOrderRepository } from '../repositories/PrismaOrderRepository';
import { PrismaProductRepository } from '../repositories/PrismaProductRepository';
import { InMemoryOrderRepository } from '../repositories/InMemoryOrderRepository';

export function createContainer(): Container {
  const container = new Container();

  const env = process.env.APP_ENV ?? 'dev';
  if (env !== 'dev' && env !== 'test') {
    throw new Error(`APP_ENV inválido: ${env}. Use "dev" ou "test".`);
  }
  const isTest = env === 'test';

  container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());

 if (isTest) {
    container.bind<IMailProvider>(TYPES.MailProvider).to(ConsoleMailProvider).inSingletonScope();
  } else {
    container.bind<IMailProvider>(TYPES.MailProvider).to(EtherealMailProvider).inSingletonScope();
  }
    container.bind<IProductRepository>(TYPES.ProductRepository).to(PrismaProductRepository).inSingletonScope();
if (isTest) {
    container.bind<IOrderRepository>(TYPES.OrderRepository).to(InMemoryOrderRepository).inSingletonScope();
  } else {
    container.bind<IOrderRepository>(TYPES.OrderRepository).to(PrismaOrderRepository).inSingletonScope();
  }

    container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(CreditCardPayment);
    container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(DebitCardPayment);
    container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(PixPayment);

    container.bind(TYPES.PaymentMethodRegistry).to(PaymentMethodRegistry);
    container.bind(TYPES.NotificationService).to(NotificationService);
    container.bind(TYPES.OrderService).to(OrderService);
    container.bind(TYPES.OrderController).to(OrderController);

  return container;
}
