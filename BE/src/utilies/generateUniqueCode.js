import crypto from 'crypto';

export const generateUniqueCode = () => {
  return crypto.randomBytes(6).toString('hex').toUpperCase(); // Generate a random 12-character code
};
