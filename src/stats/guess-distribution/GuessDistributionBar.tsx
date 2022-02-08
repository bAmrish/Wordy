import { Bar } from 'react-chartjs-2';

import {
  BarElement,
  CategoryScale,
  Chart,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { FC } from 'react';
import GameModel from '../../game/models/game.model';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const GuessDistributionBar: FC<{ games: GameModel[] }> = props => {
  const color = '#6eeee3';
  const colorAlpha = `${color}66`;

  const options: ChartOptions = {
    responsive: true,

    layout: {
      padding: {
        top: 20,
      },
    },

    scales: {
      yAxis: { display: false },

      xAxis: {
        bounds: 'ticks',
        ticks: {
          color: color,
          font: {
            size: 14,
          },
          padding: 5,
        },
        grid: {
          borderColor: color,
          drawTicks: false,
          drawOnChartArea: false,
        },
      },
    },

    plugins: {
      title: {
        display: true,
        color: color,
        text: 'Guess Distribution',
        font: {
          weight: 'normal',
          size: 18,
        },
      },

      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  const games = props.games;
  const frequency: { [key: string]: number } = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
  };

  games.forEach(game => {
    const guessCount = game.rows.filter(
      row => row.status === 'EVALUATED'
    ).length;
    frequency[guessCount] += 1;
  });

  const labels: string[] = [];
  const data: number[] = [];
  for (const key in frequency) {
    labels.push(key);
    data.push(frequency[key]);
  }

  const chartData = {
    labels,
    datasets: [
      {
        // label: 'Guess Distribution',
        data,
        backgroundColor: colorAlpha,
        borderColor: color,
        barThickness: 'flex',
        elements: {
          bar: {
            borderWidth: 1,
            borderRadius: 5,
          },
        },
        datalabels: {
          anchor: 'end',
          align: 'top',
          offset: 0,
          color: color,
          font: { weight: 'bold' },
        },
      },
    ],
  };

  // noinspection RequiredAttributes
  return (
    <>
      {/*@ts-ignore*/}
      <Bar options={options} data={chartData} />
    </>
  );
};

export default GuessDistributionBar;
