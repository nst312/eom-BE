import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { UserListener } from '../user/user.listener';
import { CompaniesListener } from '../companies/companies.listener';

import { PRISMA_CLIENT_OPTIONS } from './prisma.config';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  [x: string]: any;
  constructor() {
    super({ ...PRISMA_CLIENT_OPTIONS });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on('error', (_e) => {
      // Do something
    });

    this.$on('query', async (e) => {
      console.log(`${e.query} ${e.params}`);
    });

    this.$use(UserListener.onCreated);
    this.$use(CompaniesListener.ignoreSoftDeleted);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
