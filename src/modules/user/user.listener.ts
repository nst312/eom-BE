import { Injectable } from '@nestjs/common';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';

@Injectable()
export class UserListener {
  static async onCreated(params, next) {
    // Check incoming query type
    if (params.model == 'users') {
      if (params.action === 'create') {
        const password = params.args['data'].password;

        const encryptedPass = await AuthHelpers.hash(password);

        params.args['data'] = {
          ...params.args['data'],
          password: encryptedPass,
        };
      }
    }

    return next(params);
  }
}
