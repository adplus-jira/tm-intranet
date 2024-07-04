import Header from "../components/Header";
import { SearchBar } from "./components";

export default async function Page() {

  const userList = await fetch(process.env.URL + '/api/user').then(res => res.json()).then(res => res.data);  

  return (
    <div>
      <Header />
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <SearchBar userList={userList} />
      </div>
    </div>
  )
}