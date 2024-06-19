export default function GameFinder() {
  async function fetchAPI() {
    const response = await fetch(
      "https://api.rawg.io/api/games?key=d31d87807c3c4f329ea4371eaa899a20"
    );
    const data = await response.json();
    console.log(data.results[0].playtime);
    return "HI";
  }
  return <div>{fetchAPI()}</div>;
}
