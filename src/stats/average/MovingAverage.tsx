import classes from './MovingAverage.module.css';

import { createRef, FC, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import GameModel from '../../game/models/game.model';
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import HelperService from '../../game/service/helper';

const getGuesses = (game: GameModel): number => {
  if (game.status === 'LOST') return game.rows.length + 1;
  return game.rows.filter(row => row.status === 'EVALUATED').length;
};
Chart.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

type MovingAverageValue = {
  id: number;
  guess: number;
  average: number;
  total: number;
};

// noinspection RequiredAttributes
const MovingAverage: FC<{ games: GameModel[] }> = props => {
  const movingAverage = new Map<number, MovingAverageValue>();
  const [color, setColor] = useState('#6eeee3');
  const colorAlpha = `${color}66`;
  const hiddenDiv = createRef<HTMLDivElement>();
  const games = props.games.filter(game => game.status !== 'PLAYING');
  const guess = getGuesses(games[0]);
  movingAverage.set(0, {
    id: 0,
    guess,
    average: guess,
    total: guess,
  });

  const labels: string[] = ['1'];
  const averages: number[] = [guess];

  for (let i = 1; i < games.length; i++) {
    const guess = getGuesses(games[i]);
    const prevValue = movingAverage.get(i - 1);
    // @ts-ignore
    const total = prevValue.total + guess;

    const average = total / (i + 1);
    labels.push((i + 1).toString());
    averages.push(average);
    movingAverage.set(i, {
      id: i,
      guess,
      average,
      total,
    });
  }

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

  const font = {
    weight: 'normal',
    size: 16,
    family: 'Raleway',
  };

  const smallFont = { ...font, size: 14 };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        text: 'Your Guessing Performance',
        display: true,
        position: 'bottom',
        font,
        color,
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },

    scales: {
      yAxis: {
        beginAtZero: true,
        min: 0,
        max: 7,
        title: {
          display: true,
          text: 'Average Guess',
          color,
          font,
        },

        ticks: {
          color: color,
          font: smallFont,
          padding: 5,
        },

        grid: {
          borderColor: color,
          color,
          drawTicks: true,
          drawOnChartArea: false,
        },
      },

      xAxis: {
        title: {
          display: true,
          text: 'Games',
          color,
          font,
        },
        ticks: {
          color,
          font: smallFont,
          padding: 5,
        },
        grid: {
          borderColor: color,
          color,
          drawTicks: true,
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Average Guesses',
        data: averages,
        elements: {
          line: {
            stepped: false,
            borderColor: colorAlpha,
            cubicInterpolationMode: 'monotone',
          },

          point: {
            radius: 1,
            backgroundColor: color,
          },
        },
      },
    ],
  };

  // noinspection RequiredAttributes
  return (
    <div className={classes['moving-average']}>
      <div ref={hiddenDiv} className={classes['configure-hidden']} />
      {/* @ts-ignore*/}
      <Line data={data} options={chartOptions} />
    </div>
  );
};
export default MovingAverage;
