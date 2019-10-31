import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

// TODO: Add validator type
const VALIDATOR_TYPE = 'RANGE_DATE';

interface CustomArgs {
  startDate: Date;
  endDate: Date;
}

const BAD_PARAMETER = 'Value must be a valid Date object';
const MISSING_ARGS = 'CustomArgs with startDate and endDate must be provided';

let defaultMessage = "Date isn't included in provided range";
export const setErrorMessage = message => (defaultMessage = message);

const isDefined = value => value !== void 0 && value !== null && value !== '';

export const validator: FieldValidationFunctionSync<CustomArgs> = ({
  value,
  message = defaultMessage,
  customArgs,
}) => {
  if (!customArgs) {
    throw new TypeError(MISSING_ARGS);
  }

  const { startDate, endDate } = customArgs;

  if (!(value instanceof Date)) {
    throw new TypeError(BAD_PARAMETER);
  }

  const succeeded = !isDefined(value) || (value > startDate && value < endDate);

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(
          (message as string) || defaultMessage,
          customArgs
        ),
    type: VALIDATOR_TYPE,
  };
};
