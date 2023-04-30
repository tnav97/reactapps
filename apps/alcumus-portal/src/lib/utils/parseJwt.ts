import { Buffer } from 'buffer';

export default function parseJwt(token) {
  try {
    const buffer = Buffer.from(token.split('.')[1], 'base64');
    const decodedString = buffer.toString('utf8');
    return JSON.parse(decodedString);
  } catch (error) {
    return {};
  }
}
