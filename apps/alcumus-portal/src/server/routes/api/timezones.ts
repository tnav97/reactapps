import { Types } from '@alcumus/core';
import { Response, Router } from 'express';
import { getTimeZones } from '@vvo/tzdb';

export default async function timezones(router: Router) {
  router.get('/', async (req: Types.Request, res: Response) => {
    res.json(getTimeZones());
  });
}
