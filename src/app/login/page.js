import { getUserData } from "../api/commonApi";

const HomePage = async () => {
  const result = await getUserData();
  
  return (
    <>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default HomePage;