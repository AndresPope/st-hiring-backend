import { Request, Response } from 'express';
import { getDbInstance } from '../database/mongo/connection';
import { SettingInputSchema } from '../modules/settings/settings-schema';

export const updateSettingsByClientId = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const clientId = Number(req.params.clientId);

    if (!body) {
      res.status(400).send('Request body is required');
      return;
    }

    if (!clientId || isNaN(clientId)) {
      res.status(400).send('Invalid clientId');
    }

    const settingsInput = SettingInputSchema.safeParse(body);

    if (!settingsInput.success) {
      res.status(400).json({ message: 'Invalid settings input', errors: settingsInput.error });
      return;
    }

    const db = getDbInstance();

    const existingSettings = await db.collection('settings').findOne({ clientId });
    if (!existingSettings) {
      res.status(404).send('Settings not found for the given clientId');
      return;
    }

    await db.collection('settings').updateOne({ clientId }, { $set: settingsInput.data });

    res.json({
      message: 'Settings updated successfully',
      settings: settingsInput.data,
    });
  } catch (e) {
    console.error('Error in update-settings-by-client-id:', e);
    res.status(500).send('Internal Server Error');
  }
};
