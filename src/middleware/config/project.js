
const origin = location.origin

export const apiType = 'app';
export const ISDEV = process.env.NODE_ENV !== 'production';
export const apiUrl = `${origin}/api.v1.json`;
export const mockUrl = 'http://mock.91525.net:35001/';
