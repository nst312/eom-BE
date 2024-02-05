import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { countries } from '@prisma/client';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async findCountries(): Promise<countries[]> {
    return await this.prisma.countries.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
