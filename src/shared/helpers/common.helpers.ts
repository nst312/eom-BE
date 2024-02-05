import * as fs from 'fs';

export const convertToINR = (amount: number): string => {
  return new Number(amount).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });
};

const base64_encode = (file) => {
  const bitmap = fs.readFileSync(file);
  return Buffer.from(bitmap).toString('base64');
};

export const CommonHelpers = {
  convertToINR,
  base64_encode,
};
