'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  time: string;
  temp: number;
}

interface IndividualChartProps {
  data: DataPoint[];
  color: string;
  title: string;
}

const IndividualChart: React.FC<IndividualChartProps> = ({ data, color, title }) => {
  // 시간을 초 단위로 변환하는 함수
  const timeToSeconds = (timeStr: string): number => {
    if (timeStr.includes('시간')) {
      return parseInt(timeStr.replace('시간', '')) * 3600;
    }
    if (timeStr.includes('분')) {
      const [minutes, seconds] = timeStr.split('분').map(part => 
        part.replace('초', '').trim()
      );
      const mins = parseInt(minutes);
      const secs = seconds ? parseInt(seconds) : 0;
      return mins * 60 + secs;
    }
    if (timeStr === '처음') {
      return 0;
    }
    return parseInt(timeStr.replace('초', ''));
  };

  // 초를 시간 형식으로 변환하는 함수
  const secondsToTimeFormat = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}초`;
    }
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      if (remainingSeconds === 0) {
        return `${minutes}분`;
      }
      return `${minutes}분 ${remainingSeconds}초`;
    }
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    if (remainingMinutes === 0) {
      return `${hours}시간`;
    }
    return `${hours}시간 ${remainingMinutes}분`;
  };

  // 데이터를 시간 순서대로 정렬
  const sortedData = data
    .map(item => ({
      ...item,
      seconds: timeToSeconds(item.time)
    }))
    .sort((a, b) => a.seconds - b.seconds);

  const chartData = {
    labels: sortedData.map(item => secondsToTimeFormat(item.seconds)),
    datasets: [
      {
        label: '온도 (°C)',
        data: sortedData.map(item => item.temp),
        borderColor: color,
        backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
        tension: 0.1,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            return `시간: ${context[0].label}`;
          },
          label: (context: any) => {
            return `온도: ${context.parsed.y}°C`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '시간',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: '온도 (°C)',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        beginAtZero: false,
        min: 0,
        max: 30,
      },
    },
  };

  return (
    <div className="w-full">
      <div className="w-full h-80">
        <Line data={chartData} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>총 {sortedData.length}개의 데이터 포인트</p>
        <p>최저 온도: {Math.min(...sortedData.map(item => item.temp))}°C</p>
        <p>최고 온도: {Math.max(...sortedData.map(item => item.temp))}°C</p>
      </div>
    </div>
  );
};

export default IndividualChart; 