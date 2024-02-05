import { Injectable, NotFoundException } from '@nestjs/common';
import { cities } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}
  async findMyCities(state_id): Promise<cities[]> {
    try {
      const myState = await this.prisma.cities.findMany({
        where: {
          state_id: state_id.state_id,
        },
        orderBy: {
          name: 'asc',
        },
      });
      if (myState.length !== 0) {
        return myState;
      } else {
        throw new NotFoundException('Cities Not Found');
      }
    } catch (err) {
      return err.response;
    }
  }
}
