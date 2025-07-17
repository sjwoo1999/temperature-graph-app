import TemperatureChart from '../components/TemperatureChart';
import IndividualChart from '../components/IndividualChart';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            온도 변화 모니터링 시스템
          </h1>
          <p className="text-lg text-gray-600">
            다양한 조건에서의 온도 변화를 비교 분석해보세요
          </p>
        </div>
        
        {/* 개별 그래프들 */}
        <div className="space-y-12">
          {/* 1. 소형 100g 일반 */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              1. 소형 100g 일반
            </h2>
            <IndividualChart 
              data={[
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
              ]}
              color="rgb(75, 192, 192)"
              title="소형 100g 일반 온도 변화"
            />
          </section>

          {/* 2. 소형 200g 일반 */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              2. 소형 200g 일반
            </h2>
            <IndividualChart 
              data={[
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
              ]}
              color="rgb(255, 99, 132)"
              title="소형 200g 일반 온도 변화"
            />
          </section>

          {/* 3. 소형 200g 단열 */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              3. 소형 200g 단열
            </h2>
            <IndividualChart 
              data={[
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
              ]}
              color="rgb(54, 162, 235)"
              title="소형 200g 단열 온도 변화"
            />
          </section>

          {/* 4. 비교 그래프 */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              4. 온도 변화 비교 그래프
            </h2>
            <TemperatureChart />
          </section>
        </div>
      </div>
    </div>
  );
}
