import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { countries } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { CountriesService } from './countries.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Country')
@Controller('Countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  async findCountries(): Promise<countries[]> {
    return this.countriesService.findCountries();
  }
}
