import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class OperacionalService {
  constructor(@InjectDataSource('protheusConnection') private readonly protheusDataSource: DataSource) {}
  async getAtendentesByFilial(filial: number): Promise<any> {
    const rawQuery = `
    SELECT COUNT(*) as TotalAtendentes FROM AA1010 WITH(NOLOCK) WHERE D_E_L_E_T_ = '' AND AA1_FILIAL = @0  AND AA1_MSBLQL = '2'`;  // Your raw SQL query
    return this.protheusDataSource.query(rawQuery, [filial]);     // Executes the raw query
  }
  // create(createOperacionalDto: CreateOperacionalDto) {
  //   return 'This action adds a new operacional';
  // }

  // findAll() {
  //   return `This action returns all operacional`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} operacional`;
  // }

  // update(id: number, updateOperacionalDto: UpdateOperacionalDto) {
  //   return `This action updates a #${id} operacional`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} operacional`;
  // }
}
