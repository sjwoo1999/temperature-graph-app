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

const TemperatureChart: React.FC = () => {
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

  // 데이터 정의
  const dataset1 = [
    { time: '처음', temp: 25 },
    { time: '10초', temp: 20 },
    { time: '20초', temp: 15 },
    { time: '30초', temp: 11 },
    { time: '1분', temp: 10 },
    { time: '1분 45초', temp: 9 },
    { time: '2분', temp: 8 },
    { time: '3분', temp: 8.5 },
    { time: '4분', temp: 9 },
    { time: '5분', temp: 9 },
    { time: '10분', temp: 11 },
    { time: '15분', temp: 12.5 },
    { time: '20분', temp: 13.5 },
    { time: '25분', temp: 15 },
    { time: '30분', temp: 16 },
    { time: '35분', temp: 17 },
    { time: '45분', temp: 18.5 },
    { time: '50분', temp: 19 },
    { time: '1시간', temp: 19.5 },
  ];

  const dataset2 = [
    { time: '처음', temp: 25 },
    { time: '10초', temp: 15 },
    { time: '15초', temp: 12 },
    { time: '30초', temp: 10 },
    { time: '45초', temp: 9 },
    { time: '1분', temp: 8.5 },
    { time: '1분 20초', temp: 7 },
    { time: '2분', temp: 7.5 },
    { time: '3분', temp: 8.5 },
    { time: '4분', temp: 9 },
    { time: '10분', temp: 11 },
    { time: '20분', temp: 15 },
    { time: '25분', temp: 16 },
  ];

  const dataset3 = [
    { time: '10초', temp: 8 },
    { time: '20초', temp: 7 },
    { time: '1분', temp: 6 },
    { time: '2분', temp: 7 },
    { time: '5분', temp: 7 },
    { time: '8분', temp: 6.5 },
    { time: '10분', temp: 6.3 },
    { time: '15분', temp: 7.2 },
    { time: '20분', temp: 7.5 },
    { time: '25분', temp: 7.8 },
    { time: '30분', temp: 8.4 },
    { time: '45분', temp: 9 },
    { time: '1시간', temp: 10 },
  ];

  // 시간을 초 단위로 변환하여 정렬
  const processDataset = (data: Array<{time: string, temp: number}>, label: string) => {
    return data
      .map(item => ({
        ...item,
        seconds: timeToSeconds(item.time)
      }))
      .sort((a, b) => a.seconds - b.seconds);
  };

  const sortedData1 = processDataset(dataset1, '소형 100g 일반');
  const sortedData2 = processDataset(dataset2, '소형 200g 일반');
  const sortedData3 = processDataset(dataset3, '소형 200g 단열');

  // 모든 시간 포인트를 통합하여 x축 라벨 생성
  const allTimePoints = new Set<number>();
  [...sortedData1, ...sortedData2, ...sortedData3].forEach(item => {
    allTimePoints.add(item.seconds);
  });
  
  const sortedTimePoints = Array.from(allTimePoints).sort((a, b) => a - b);
  const timeLabels = sortedTimePoints.map(seconds => secondsToTimeFormat(seconds));

  // 각 데이터셋의 온도값을 시간 포인트에 맞춰 매핑
  const getTemperatureAtTime = (data: Array<{seconds: number, temp: number}>, targetSeconds: number) => {
    const exactMatch = data.find(item => item.seconds === targetSeconds);
    if (exactMatch) return exactMatch.temp;
    
    // 가장 가까운 이전 값 찾기
    const previousValues = data.filter(item => item.seconds <= targetSeconds);
    if (previousValues.length > 0) {
      return previousValues[previousValues.length - 1].temp;
    }
    
    return null;
  };

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: '소형 100g 일반',
        data: sortedTimePoints.map(seconds => getTemperatureAtTime(sortedData1, seconds)),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.1,
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
      },
      {
        label: '소형 200g 일반',
        data: sortedTimePoints.map(seconds => getTemperatureAtTime(sortedData2, seconds)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.1,
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
      },
      {
        label: '소형 200g 단열',
        data: sortedTimePoints.map(seconds => getTemperatureAtTime(sortedData3, seconds)),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.1,
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: '온도 변화 비교 그래프',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          title: (context: any) => {
            return `시간: ${context[0].label}`;
          },
          label: (context: any) => {
            if (context.parsed.y !== null) {
              return `${context.dataset.label}: ${context.parsed.y}°C`;
            }
            return undefined;
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
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          온도 변화 비교 그래프
        </h2>
        <p className="text-gray-600 text-lg">
          세 가지 다른 조건에서의 온도 변화를 비교해보세요.
        </p>
      </div>
      <div className="w-full h-[500px]">
        <Line data={chartData} options={options} />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">소형 100g 일반</h3>
          <p>최저: {Math.min(...sortedData1.map(item => item.temp))}°C</p>
          <p>최고: {Math.max(...sortedData1.map(item => item.temp))}°C</p>
          <p>데이터 포인트: {sortedData1.length}개</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">소형 200g 일반</h3>
          <p>최저: {Math.min(...sortedData2.map(item => item.temp))}°C</p>
          <p>최고: {Math.max(...sortedData2.map(item => item.temp))}°C</p>
          <p>데이터 포인트: {sortedData2.length}개</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-800 mb-2">소형 200g 단열</h3>
          <p>최저: {Math.min(...sortedData3.map(item => item.temp))}°C</p>
          <p>최고: {Math.max(...sortedData3.map(item => item.temp))}°C</p>
          <p>데이터 포인트: {sortedData3.length}개</p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureChart; 