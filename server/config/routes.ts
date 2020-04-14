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

  app.get('/world', (_req: Request, res: Response, _next: NextFunction) => {
    return clientRedis.get('world', (err: Errback, result: string) => {
      if (err) throw err;
      // If that key exist in Redis store
      if (result) {
        return res.status(200).json(JSON.parse(result));
      } else {
        res.status(500);
      }
    });
  });

  app.get(
    '/continents',
    (_req: Request, res: Response, _next: NextFunction) => {
      return clientRedis.get('continents', (err: Errback, result: string) => {
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

  app.get('/countries', (_req: Request, res: Response, _next: NextFunction) => {
    return clientRedis.get('countries', (err: Errback, result: string) => {
      if (err) throw err;
      // If that key exist in Redis store
      if (result) {
        return res.status(200).json(JSON.parse(result));
      } else {
        res.status(500);
      }
    });
  });

  app.get('/timeline', (_req: Request, res: Response, _next: NextFunction) => {
    return clientRedis.get('timeline', (err: Errback, result: string) => {
      if (err) throw err;
      // If that key exist in Redis store
      if (result) {
        return res.status(200).json(JSON.parse(result));
      } else {
        res.status(500);
      }
    });
  });

  app.get('/health', (_req: Request, res: Response, _next: NextFunction) => {
    return clientRedis.get('health', (err: Errback, result: string) => {
      if (err) throw err;

      if (result) {
        return res.status(200).json(JSON.parse(result));
      } else {
        res.status(500);
      }
    });
  });
};
