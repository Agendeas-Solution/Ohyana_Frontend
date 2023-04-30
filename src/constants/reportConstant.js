import moment from 'moment'
export const REPORT = {
  PERIODSELECTOR: [
    { value: '7 days', type: 'day-7' },
    { value: '30 days', type: 'day-30' },
    { value: '90 Days', type: 'day-90' },
    {
      value: `${moment().format('MMMM')}`,
      type: `month-${moment().format('MMMM')}`,
    },
    {
      value: `${moment().subtract(1, 'months').format('MMMM')}`,
      type: `month-${moment().subtract(1, 'months').format('MMMM')}`,
    },
    {
      value: `${moment().subtract(2, 'months').format('MMMM')}`,
      type: `month-${moment().subtract(2, 'months').format('MMMM')}`,
    },
    {
      value: `${moment().subtract(3, 'months').format('MMMM')}`,
      type: `month-${moment().subtract(3, 'months').format('MMMM')}`,
    },
    {
      value: `${moment().format('YYYY')}`,
      type: `year-${moment().format('YYYY')}`,
    },
    {
      value: `${moment().subtract(1, 'year').format('YYYY')}`,
      type: `year-${moment().subtract(1, 'year').format('YYYY')}`,
    },
  ],
}
