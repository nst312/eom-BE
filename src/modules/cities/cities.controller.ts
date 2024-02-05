import { Controller, Get, Request, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { cities } from '@prisma/client';

import { CitiesService } from './cities.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('City')
@Controller('Cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get(':stateId')
  @ApiOperation({ summary: 'Get cities by state id' })
  async findMyCities(@Param('stateId') state_id: number): Promise<cities[]> {
    return this.citiesService.findMyCities({ state_id: Number(state_id) });
  }
}
