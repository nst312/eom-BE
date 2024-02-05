import { Controller, Get, Request, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { states } from '@prisma/client';

import { StatesService } from './states.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('State')
@Controller('States')
export class StatesController {
  constructor(private statesService: StatesService) {}

  @Get(':countryId')
  @ApiOperation({ summary: 'Get states by country id' })
  async findMyStates(
    @Param('countryId') country_id: number,
  ): Promise<states[]> {
    return this.statesService.findMyStates({ country_id: Number(country_id) });
  }
}
