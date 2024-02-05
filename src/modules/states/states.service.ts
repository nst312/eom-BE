import { Injectable, NotFoundException } from '@nestjs/common';
import { states } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatesService {
  constructor(private prisma: PrismaService) {}
  async findMyStates(country_id): Promise<states[]> {
    try {
      const myState = await this.prisma.states.findMany({
        where: {
          country_id: country_id.country_id,
        },
        orderBy: {
          name: 'asc',
        },
      });
      if (myState.length !== 0) {
        return myState;
      } else {
        throw new NotFoundException('States Not Found');
      }
    } catch (err) {
      return err.response;
    }
  }
}
