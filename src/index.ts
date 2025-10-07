import express from 'express';
import { knex } from 'knex';
import dbConfig from './knexfile';
import { createEventDAL } from './dal/events.dal';
import { createTicketDAL } from './dal/tickets.dal';
import { createGetEventsController } from './controllers/get-events';
import { connectDatabase } from './database/mongo/connection';
import { createGetSettingsByClientId } from './controllers/get-settings-by-client-id';

// initialize Knex
const Knex = knex(dbConfig.development);

// Initialize DALs
const eventDAL = createEventDAL(Knex);
const TicketDAL = createTicketDAL(Knex);

const app = express();

app.get('/settings/:clientId', createGetSettingsByClientId());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/events', createGetEventsController({ eventsDAL: eventDAL, ticketsDAL: TicketDAL }));

app.get('/', (_req, res) => {
  res.json({ message: 'Hello API' });
});

app.listen(3000, async () => {
  await connectDatabase();
  console.log('Server Started');
});
