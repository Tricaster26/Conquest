export default function GameFinder() {
  async function fetchAPI() {
    var key = "d31d87807c3c4f329ea4371eaa899a20";
    const response = await fetch("https://api.rawg.io/api/games?key=" + key);
    const data = await response.json();
    console.log(data.results[0].playtime);
    return "HI";
  }
  return <div>{fetchAPI()}</div>;
}
