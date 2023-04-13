export const CLIENT = {
  STAGE: [
    { stage: 'Intiate', id: 0 },
    { stage: 'No Response', id: 1 },
    { stage: 'Irrelevant', id: 2 },
    { stage: 'Inter-Mediate', id: 3 },
    { stage: 'Confirm', id: 4 },
    { stage: 'Closed', id: 5 },
  ],

  FOLLOWUP: [
    { type: 'FIELD', fieldName: 'Field' },
    { type: 'CALL', fieldName: 'Call' },
    { type: 'WHATSAPP', fieldName: 'WhatsApp' },
    { type: 'EMAIL', fieldName: 'Email' },
    { type: 'OTHER', fieldName: 'Other' },
  ],
  CLIENTTYPE: [
    { type: true, fieldName: 'Domestic' },
    { type: false, fieldName: 'International' },

  ],

}
