import { subDays } from "date-fns";
import { DataChart, DataLineChart } from "./components";



export async function AdminPage() {
  const userResponse = await fetch(process.env.URL+'/api/dashboard/admin', { method: 'GET', next: { tags: ["call", "user", "talk" ]} });
  const userChartData = await userResponse.json();

  const chartConfig = {
    call_count: {
      label: '콜횟수',
      color: '#838383'
    },
    talk_count: {
      label: '자료요청',
      color: '#a5a5a5'
    }
  }
  const barKeys = ['call_count', 'talk_count'];

  const lineChartResponse = await fetch(process.env.URL + '/api/dashboard/admin', { method: 'POST', body: JSON.stringify({ startDate: subDays(new Date(), 7), endDate: new Date() }) });
  const lineChartData = await lineChartResponse.json();
  
  return (
    <div className="max-w-7xl m-auto grid lg:grid-cols-2 sm:grid-cols-1 gap-2 p-4 mt-10">
      <div className="w-full">
        <DataChart title="유저별 통계" chartData={userChartData} chartConfig={chartConfig} dataKey={"user_name"} barKeys={barKeys} />
      </div>
      <div className="w-full">
        <DataLineChart chartData={lineChartData.data} chartConfig={lineChartData.user} dataKey={"day"}  />
      </div>
    </div>
  )
}