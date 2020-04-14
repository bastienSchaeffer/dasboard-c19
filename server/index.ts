import express, {Request, Response, Errback} from 'express';
import next from 'next';
import {PORT} from './config/ports';

import routesConfig from './config/routes';
import {covidTimeSeriesAPIData} from './config/retrieveRedis';

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const server = express();

app.prepare();

// Routes: GET / POST
routesConfig(server);

// Populate from External CovidAPI
covidTimeSeriesAPIData();
setInterval(covidTimeSeriesAPIData, 30000);

server.all('*', (req: Request, res: Response) => {
  return handle(req, res);
});

server.listen(PORT, (err?: Errback) => {
  if (err) throw err;
  console.log(`> Ready on localhost:${PORT} - env ${process.env.NODE_ENV}`);
});

export {server};
