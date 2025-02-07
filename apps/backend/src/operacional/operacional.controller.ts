import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OperacionalService } from './operacional.service';
import { getAtendentesByFilialDTO } from './dto/getAtendentesByFilial.dto';

@Controller('operacional')
export class OperacionalController {
  constructor(private readonly operacionalService: OperacionalService) {}

  @Get('atendentes')
  async getAtendentesByFilial(@Query() filialDTO: getAtendentesByFilialDTO): Promise<any> {
    const filial = filialDTO.filial;
    return this.operacionalService.getAtendentesByFilial(filial);
  }

    // @Post()
  // create(@Body() createOperacionalDto: CreateOperacionalDto) {
  //   return this.operacionalService.create(createOperacionalDto);
  // }

  // @Get()
  // findAll() {
  //   return this.operacionalService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.operacionalService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOperacionalDto: UpdateOperacionalDto) {
  //   return this.operacionalService.update(+id, updateOperacionalDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.operacionalService.remove(+id);
  // }
}
