export interface Settings {
  clientId: number;
  deliveryMethods: {
    name: string;
    enum: string;
    order: number;
    isDefault: boolean;
    selected: boolean;
  }[];
  fulfillmentFormat: {
    rfid: boolean;
    print: boolean;
  };
  printer: {
    id: number | null;
  };
  printingFormat: {
    formatA: boolean;
    formatB: boolean;
  };
  scanning: {
    scanManually: boolean;
    scanWhenComplete: boolean;
  };
  paymentMethods: {
    cash: boolean;
    creditCard: boolean;
    comp: boolean;
  };
  ticketDisplay: {
    leftInAllotment: boolean;
    soldOut: boolean;
  };
  customerInfo: {
    active: boolean;
    basicInfo: boolean;
    addressInfo: boolean;
  };
}
