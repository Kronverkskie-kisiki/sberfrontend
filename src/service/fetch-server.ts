export const fetchServer = <T>(
  url: string,
  method = 'GET',
  body: any = null,
  headers: any = { 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
) => fetch(url, { method, body: JSON.stringify(body), headers, mode: 'no-cors' }).then((r) => r.json() as T);

