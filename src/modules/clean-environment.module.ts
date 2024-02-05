import { DynamicModule, Module } from '@nestjs/common';
import { parse } from 'dotenv';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { ClientsModule } from './clients/clients.module';
import { ResumeMasterModule } from './resume-master/resume-master.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CompanyPolicyController } from './company-policy/company-policy.controller';
import { CompanyPolicyModule } from './company-policy/company-policy.module';
import * as fs from 'fs';

@Module({
  imports: [
    ImageUploadModule,
    ClientsModule,
    InvoicesModule,
    ResumeMasterModule,
  ],
})
export class CleanEnvironmentModule {
  /**
   * Remove all variables available in .env file from process.env
   *
   * @param environmentFilePath
   * @param predicate
   */
  static forPredicate(
    environmentFilePath?: string,
    predicate?: () => boolean,
  ): DynamicModule {
    if (predicate === undefined || predicate()) {
      const environmentData = fs.readFileSync(environmentFilePath ?? '.env', {
        encoding: 'utf8',
      });

      const parsed = new Set(Object.keys(parse(environmentData)));

      for (const name of Object.keys(process.env)) {
        if (parsed.has(name)) {
          delete process.env[name];
        }
      }
    }

    return {
      module: CleanEnvironmentModule,
    };
  }
}
