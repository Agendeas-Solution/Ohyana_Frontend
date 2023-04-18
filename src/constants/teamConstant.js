export const TEAM = {
  TARGETTYPE: [
    { type: 'Generate Lead', id: 0 },
    { type: 'Take Order', id: 1 },
  ],
  PERIOD: [
    { period: '7 Days', days: 7 },
    { period: '15 Days', days: 15 },
    { period: '30 Days', days: 30 },
  ],
  JOBTYPE: [
    { type: 'Office', id: 0 },
    { type: 'On Field', id: 1 },
  ],
  ATTENDANCETYPE: [
    { typeName: 'Present', type: 'P' },
    { typeName: 'Leave', type: 'L' },
    { typeName: 'Absent', type: 'A' },
    { typeName: 'Late', type: 'LT' },
  ],
  STATUSTYPE: [
    { type: 'UpComing', value: 'UPCOMING' },
    { type: 'Completed', value: 'COMPLETED' },
  ]
}
