import { LogStructure } from './logger-structure.dto';

export const loggerObfuscation = (
  log: LogStructure,
  isObfuscationOn = false,
): LogStructure => {
  if (!isObfuscationOn) {
    return log;
  }

  const { payload, httpDetails } = log;
  const { httpMessage } = httpDetails || {};

  return {
    ...log,
    httpDetails: {
      ...httpDetails,
      httpMessage: obfuscateValues(httpMessage),
    },
    payload: obfuscateValues(payload),
  };
};

export const obfuscateValues = (obj: any) => {
  if (obj == null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.reduce(
      (previous, current) => [...previous, obfuscateValues(current)],
      [],
    );
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    return keys.reduce((previous, currentKey) => {
      return {
        ...previous,
        [currentKey]: obfuscateValues(obj[currentKey]),
      };
    }, {});
  }

  return obfuscateSingleValue(obj);
};

export const obfuscateSingleValue = (value: any): string => {
  const valueStr = `${value}`;
  const length = valueStr.length;
  const half = Math.floor(length / 2);

  return valueStr
    .split('')
    .map((char, index) => (index >= half ? '*' : char))
    .join('');
};
