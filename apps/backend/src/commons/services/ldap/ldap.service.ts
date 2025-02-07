import { Injectable, InternalServerErrorException, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import LdapClient, { SearchOptions } from 'ldapjs-client';

interface LdapSearchEntry {
    type: string;
    attributes: Record<string, any>;
}

@Injectable()
export class LdapService {
    private client: LdapClient;
    private searchBase: string;
    private readonly ldapTimeout = 10000; // Timeout in milliseconds

    constructor(private configService: ConfigService) {
        this.searchBase = this.configService.get<string>('ldap.searchBase');
        if (!this.searchBase) {
            throw new Error('LDAP searchBase is not defined in the configuration');
        }
        this.createClient();
    }

    private createClient() {
        this.client = new LdapClient({
            url: this.configService.get<string>('ldap.url'),
            timeout: this.ldapTimeout, // This applies to individual LDAP operations like search and bind
        });
    }

    private async timeoutPromise<T>(promise: Promise<T>, ms: number): Promise<T> {
        const timeout = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new RequestTimeoutException(`Operation timed out after ${ms}ms`)), ms)
        );
        return Promise.race([promise, timeout]);
    }

    private async bindClient(): Promise<void> {
        try {
            // Apply timeout to the bind operation
            await this.timeoutPromise(
                this.client.bind(
                    this.configService.get<string>('ldap.bindDN'),
                    this.configService.get<string>('ldap.bindPass')
                ),
                this.ldapTimeout
            );
        } catch (error) {
            console.error("LDAP bind error:", error);
            throw new InternalServerErrorException('Failed to bind to LDAP server');
        }
    }

    async getUsersInGroup(groupDn: string): Promise<any[]> {
        const entries = [];
        await this.bindClient();
        const searchString="OU="+groupDn+","+this.searchBase; //Seleciona o Grupo do AD que vai retornar os usuários.
        const opts: SearchOptions = {
            //filter: `(memberOf=${groupDn})`,
            scope: 'sub',               // Search entire subtree
            attributes: ['cn', 'mail', 'sAMAccountName'],
        };
    
        try {
            const results = await this.client.search(searchString, opts);
            results.forEach((entry:any) => {
                if (entry.sAMAccountName && entry.cn) {
                    entries.push({
                        user: entry.sAMAccountName,
                        name: entry.cn,
                    });
                }
            })
            return entries; // Return entries directly
        } catch (error) {
            console.error("LDAP search error:", error);
            throw new InternalServerErrorException('Failed to search LDAP');
        }
    }
    
}
