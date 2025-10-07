import { Request, Response } from 'express';
import { getDbInstance } from '../database/mongo/connection';
import { getDefaultSettingsValue } from '../modules/settings/default-values';
import { Settings } from '../entity/settings';

export const getSettingsByClientId = async (req: Request, res: Response) => {
  try {
    const paramClientId = req.params.clientId;
    const clientId = Number(paramClientId);
    if (!clientId || isNaN(clientId)) {
      res.status(400).send('Invalid clientId');
    }

    const db = getDbInstance();

    const settings = await db.collection<Settings>('settings').findOne({ clientId });
    if (settings) {
      res.json(settings);
      return;
    }

    const defaultSettings = getDefaultSettingsValue(clientId);

    await db.collection<Settings>('settings').insertOne(defaultSettings);

    res.json(defaultSettings);
  } catch (err) {
    console.error('Error in get-settings-by-client-id:', err);
    res.status(500).send('Internal Server Error');
  }
};
