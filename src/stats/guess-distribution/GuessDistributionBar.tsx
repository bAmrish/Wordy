import { Bar } from 'react-chartjs-2';
import classes from './GuessDistribution.module.css';

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
import { createRef, FC, useEffect, useState } from 'react';
import GameModel from '../../game/models/game.model';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import HelperService from '../../game/service/helper';

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
  const [color, setColor] = useState('#6eeee3');
  const colorAlpha = `${color}66`;
  const hiddenDiv = createRef<HTMLDivElement>();
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
        title: {
          display: true,
          text: 'Guess Distribution',
          color,
          font: {
            weight: 'normal',
            size: 16,
            family: 'Raleway',
          },
        },
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

  games
    .filter(game => game.status === 'WON')
    .forEach(game => {
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

  useEffect(() => {
    if (hiddenDiv.current) {
      const rgbColor = getComputedStyle(hiddenDiv.current).getPropertyValue(
        'background-color'
      );
      const color = HelperService.rgbToHex(rgbColor);

      if (color) {
        setColor(color);
      }
    }
  }, [hiddenDiv]);

  // noinspection RequiredAttributes
  return (
    <>
      <div ref={hiddenDiv} className={classes['guess-hidden']} />
      {/*@ts-ignore*/}
      <Bar options={options} data={chartData} />
    </>
  );
};

export default GuessDistributionBar;
