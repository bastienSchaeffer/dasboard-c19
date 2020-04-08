import {Application, Request, Response, NextFunction, Errback} from 'express';
import clientRedis from './redis';

export default (app: Application) => {
  app.get('/url', (_req: Request, res: Response) => {
    res.json({
      origin: 'express',
      date: new Date(),
    });
  });

  // -------------------------------
  // Retrieved from API on REDIS
  // -------------------------------

  app.get(
    '/timeseries',
    (_req: Request, res: Response, _next: NextFunction) => {
      return clientRedis.get('timeseries', (err: Errback, result: any) => {
        if (err) throw err;
        // If that key exist in Redis store
        if (result) {
          return res.status(200).json(JSON.parse(result));
        } else {
          res.status(500);
        }
      });
    }
  );

  app.get(
    '/latestCountries',
    (_req: Request, res: Response, _next: NextFunction) => {
      return clientRedis.get('latestCountries', (err: Errback, result: any) => {
        if (err) throw err;
        // If that key exist in Redis store
        if (result) {
          return res.status(200).json(JSON.parse(result));
        } else {
          res.status(500);
        }
      });
    }
  );

  app.get(
    '/dummyRedis',
    (_req: Request, res: Response, _next: NextFunction) => {
      return clientRedis.get('dummyRedis', (err: Errback, result: any) => {
        if (err) throw err;

        if (result) {
          return res.status(200).json(JSON.parse(result));
        } else {
          res.status(500);
        }
      });
    }
  );
};
