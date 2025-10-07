import * as z from 'zod';

/** *
 * I added Zod to perform request body validation in a clean and maintainable way.
 * This could easily be replaced with a manual validation if external libraries are not desired.
 */

export const SettingInputSchema = z.object({
  deliveryMethods: z.array(
    z.object({
      name: z.string(),
      enum: z.string(),
      order: z.number().int().nonnegative(),
      isDefault: z.boolean(),
      selected: z.boolean(),
    }),
  ),
  fulfillmentFormat: z.object({
    rfid: z.boolean(),
    print: z.boolean(),
  }),
  printer: z.object({
    id: z.number().int().nonnegative().nullable(),
  }),
  printingFormat: z.object({
    formatA: z.boolean(),
    formatB: z.boolean(),
  }),
  scanning: z.object({
    scanManually: z.boolean(),
    scanWhenComplete: z.boolean(),
  }),
  paymentMethods: z.object({
    cash: z.boolean(),
    creditCard: z.boolean(),
    comp: z.boolean(),
  }),
  ticketDisplay: z.object({
    leftInAllotment: z.boolean(),
    soldOut: z.boolean(),
  }),
  customerInfo: z.object({
    active: z.boolean(),
    basicInfo: z.boolean(),
    addressInfo: z.boolean(),
  }),
});
