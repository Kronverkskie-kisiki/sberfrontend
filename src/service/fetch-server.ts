export const fetchServer = async <T>(
  url: string,
  method = 'GET',
  body: any = null,
  headers: any = { 'Access-Control-Allow-Origin': '*' },
) => {
  try {
    const r = await fetch(url, { method, body, headers, mode: 'no-cors' });
    return await r.json() as T;
  } catch {
    console.log(`Could not fetch ${url}`);
  }
};
