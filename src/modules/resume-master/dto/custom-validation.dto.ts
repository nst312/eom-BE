import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsYearValidation', async: false })
export class IsYearValidation implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    if (args.value) {
      return propertyValue > args.object[args.constraints[0]];
    } else {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be greater than ${args.constraints[0]}`;
  }
}
