import { Request, Response } from 'express';

export const createGetSettingsByClientId = () => async (req: Request, res: Response) => {
  console.log('=>(get-settings-by-client-id.ts:1) req.params', req.params);

  res.send('Hello World!');
};
