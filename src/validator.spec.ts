import { setErrorMessage, validator } from './validator';
describe('fonk-range-date-validator specs', () => {
  it('should return succeeded validation when value is a valid Date object between customArgs startDate and endDate range', () => {
    const value = new Date(2018, 11, 24, 10, 33, 30, 0);
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'RANGE_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object between customArgs startDate and endDate range by one second', () => {
    const value = new Date(2018, 11, 24, 10, 33, 30, 1);
    const startDate = new Date(2018, 11, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 11, 24, 10, 33, 30, 2);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'RANGE_DATE',
    });
  });

  it('should return failed validation when value is a valid Date object later than startDate and later than endDate range', () => {
    const value = new Date(2018, 12, 9, 15, 24, 55, 0);
    const startDate = new Date(2018, 10, 13, 22, 21, 30, 0);
    const endDate = new Date(2018, 11, 24, 10, 33, 30, 0);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: false,
      message: "Date isn't included in provided range",
      type: 'RANGE_DATE',
    });
  });

  it('should return failed validation when value is a valid Date object earlier than startDate and earlier than endDate range', () => {
    const value = new Date(2017, 5, 9, 15, 24, 55, 0);
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 11, 24, 10, 33, 30, 0);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: false,
      message: "Date isn't included in provided range",
      type: 'RANGE_DATE',
    });
  });

  it('should throw an error when it feeds value equals undefined', () => {
    const value = undefined;
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const validatorArgs = { value, customArgs: { startDate, endDate } };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should throw an error when it feeds value equals null', () => {
    const value = null;
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const validatorArgs = { value, customArgs: { startDate, endDate } };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should throw an error when it feeds value equals empty string', () => {
    const value = '';
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const validatorArgs = { value, customArgs: { startDate, endDate } };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should overwrite default message when it feeds value and message', () => {
    const value = new Date(2020, 9, 24, 10, 33, 30, 0);
    const message = 'other message';
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const result = validator({
      value,
      message,
      customArgs: { startDate, endDate },
    });

    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: 'RANGE_DATE',
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    const value = new Date(2018, 9, 24, 10, 33, 30, 0);
    setErrorMessage('other message');
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: 'RANGE_DATE',
    });
  });

  describe('CustomParams boundaries ', () => {
    it('Should throw an error if customArgs are not provided', () => {
      const value = new Date(2018, 11, 24, 10, 33, 30, 0);
      const validatorArgs = { value };

      expect(() => validator(validatorArgs)).toThrow(TypeError);
      expect(() => validator(validatorArgs)).toThrowError(
        'CustomArgs with startDate and endDate must be provided'
      );
    });
  });
});
