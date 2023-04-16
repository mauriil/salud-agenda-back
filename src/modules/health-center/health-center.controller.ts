import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { HealthCenterService } from './health-center.service';
import { CreateHealthCenterDto } from './dto/create-health-center.dto';
import { UpdateHealthCenterDto } from './dto/update-health-center.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MyLogger } from '../logger';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@ApiTags('health-center')
@Controller('health-center')
export class HealthCenterController {
  constructor(
    private readonly healthCenterService: HealthCenterService,
    private readonly logger: MyLogger,
  ) {}

  @ApiOkResponse({ type: CreateHealthCenterDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createHealthCenterDto: CreateHealthCenterDto) {
    return await this.healthCenterService.create(createHealthCenterDto);
  }

  @Get()
  findAll() {
    return this.healthCenterService.findAll();
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthCenterService.findOneById(id);
  }

  @ApiOkResponse({ type: CreateHealthCenterDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHealthCenterDto: UpdateHealthCenterDto,
  ) {
    return this.healthCenterService.update(id, updateHealthCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthCenterService.remove(+id);
  }
}
