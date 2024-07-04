import Header from "../components/Header";
import { TalkTable } from "./components";


export default function Page() {

  return (
    <div>
      <Header />
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <h1>톡 관리</h1>
        <TalkTable />
      </div>
    </div>
  )
}