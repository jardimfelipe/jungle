import { rgba } from "polished"

export const protectionLevelData = [
  {
    level: 'Ótima',
    amount: 16,
    color: rgba('#011F3B', 0.3)
  },
  {
    level: 'Boa',
    amount: 18,
    color: rgba('#011F3B', 0.3)
  },
  {
    level: 'Moderada',
    amount: 50,
    color: '#0CC3E7'
  },
  {
    level: 'Leve',
    amount: 16,
    color: rgba('#011F3B', 0.3)
  },
]

export const chartDataPopulation = [
  {
    datasets: [
      {
        label: null,
        data: [68.2, 100 - 68.2],
        backgroundColor: ['#0062FF', '#F1F5FA'],
        borderWidth: 0,
      },
    ],
  },
  {
    datasets: [
      {
        label: null,
        data: [85, 100 - 85],
        backgroundColor: ['#0062FF', '#F1F5FA'],
        borderWidth: 0,
      },
    ],
  },
  {
    datasets: [
      {
        label: null,
        data: [70.4, 100 - 70.4],
        backgroundColor: ['#0062FF', '#F1F5FA'],
        borderWidth: 0,
      },
    ],
  },
  {
    datasets: [
      {
        label: null,
        data: [66.66, 100 - 66.66],
        backgroundColor: ['#0062FF', '#F1F5FA'],
        borderWidth: 0,
      },
    ],
  },
  {
    datasets: [
      {
        label: null,
        data: [75, 100 - 75],
        backgroundColor: ['#0062FF', '#F1F5FA'],
        borderWidth: 0,
      },
    ],
  },
]