import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { LdapService } from '../services/ldap/ldap.service';

@Controller('commons')
export class CommonsController {
  constructor(private readonly ldapService: LdapService) {}

  @Get('users')
  async getUsers(@Query('groupDn') groupDn: string): Promise<any> {
    if (!groupDn) {
      throw new BadRequestException('groupDn parameter is required');
    }
    return this.ldapService.getUsersInGroup(groupDn);
  }

}
