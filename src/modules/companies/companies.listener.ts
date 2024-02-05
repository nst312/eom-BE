import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesListener {
  static async ignoreSoftDeleted(params, next) {
    if (params.model == 'companies') {
      if (params.action == 'findUnique') {
        params.action = 'findFirst';
        params.args.where['deletedAt'] = null;
      }
      if (params.action == 'findMany') {
        // Find many queries
        if (params.args.where != undefined) {
          if (params.args.where.deletedAt == undefined) {
            // Exclude deleted records if they have not been explicitly requested
            params.args.where['deletedAt'] = null;
          }
        } else {
          params.args['where'] = { deletedAt: null };
        }
      }
    }
    return next(params);
  }
}
