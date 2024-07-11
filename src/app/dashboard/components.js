'use client';

import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectValue, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, LineChart, Line } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"




export const CallCard = ({ cardDatas, handleSubmit }) => {

  // 네이버 아이디, 블로그 아이디, 전화한 횟수, 연락처, 추출한 url, 메모
  const [cardData, setCardData] = useState(cardDatas);
  const [selected, setSelected] = useState('');
  const [showTalk, setShowTalk] = useState(false);
  const [talkStatus, setTalkStatus] = useState('대기');

  useEffect(() => {
    setCardData(cardDatas);
    setSelected('');
    setShowTalk(false);
    setTalkStatus('대기');
  }, [cardDatas])

  useEffect(() => {
    if (selected === "자료요청") {
      setShowTalk(true);
    } else setShowTalk(false);
  }, [selected])

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm md:w-[500px] w-full p-8 m-auto mt-10">
      <form action={handleSubmit}>
        <div className="grid grid-cols-4 gap-2">
          <p className="text-sm m-auto">네이버 ID</p>
          <p className="col-span-3">{cardData.naver_id}</p>
          <p className="text-sm m-auto">블로그 ID</p>
          <p className="col-span-3">{cardData.blog_id}</p>
          <p className="text-sm m-auto">전화 횟수</p>
          <p className="col-span-3">{cardData.cnt_call}</p>
          <p className="text-sm m-auto">연락처</p>
          <p className="col-span-3">{cardData.phone}</p>
          <p className="text-sm m-auto">추출한 url</p>
          <p className="col-span-3">{cardData.extract_url}</p>
          <p className="text-sm m-auto">메모</p>
          <Textarea className="col-span-3" name="memo" defaultValue={cardData.memo} />
          <p className="text-sm m-auto">결과</p>
          <div className="col-span-3">
            <Select className="w-full" name="result" value={selected} onValueChange={(v) => setSelected(v)} >
              <SelectTrigger className="">
                <SelectValue placeholder="------" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="자료요청">자료요청</SelectItem>
                <SelectItem value="부재중">부재중</SelectItem>
                <SelectItem value="수신거부">수신거부</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {
            showTalk && (
              <>
                <p className="text-sm m-auto">자료전달</p>
                <div className="col-span-3">
                  <Select className="w-full" name="status" value={talkStatus} onValueChange={(v) => setTalkStatus(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="대기">대기</SelectItem>
                      <SelectItem value="친구추가불가">친구추가불가</SelectItem>
                      <SelectItem value="전달완료">전달완료</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>

            )
          }
          <Button className="col-span-4 mt-4" type="submit">저장</Button>
        </div>
      </form>
    </div>
  )
}

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "blue",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "red",
//   },
// }

export const DataChart = ({ title, chartData, dataKey, chartConfig, barKeys }) => {
  return (
    <>
      {chartData && chartConfig && (
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {/* <CardDescription></CardDescription> */}
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} style={{ margin: 'auto' }}>
              <BarChart accessibilityLayer data={chartData} height={500}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={dataKey}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={value => value}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                {
                  barKeys && barKeys.map((key, index) => (
                    <Bar key={index} dataKey={key} fill={`var(--color-${key})`} radius={4} />
                  ))
                }
                {/* <Bar dataKey={"call_count"} fill={`var(--color-call_count)`} radius={4} />
            <Bar dataKey={"talk_count"} fill={`var(--color-talk_count)`} radius={4} /> */}
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

    </>
  )
}

export function DataLineChart({ chartData, chartConfig, dataKey }) {
  const _chartConfig = chartConfig.map((config, index) => {
    return {
      [config.user_name]: {
        label: config.user_name,
        color: `red`,
      }
    }
  })

  const configColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'magenta', 'brown'];

  return (
    <>
      {chartData && chartConfig && (
        <Card>
          <CardHeader>
            <CardTitle>7일간 유저별 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={_chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.split('T')[0]}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                {
                  chartConfig.map((config, index) => (
                    <Line key={index} dataKey={config.user_name} type="monotone" stroke={configColors[index]} strokeWidth={2} dot={true} />
                  ))
                }
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </>

  )
}