export default function GameFinder() {
  async function fetchAPI() {
    var key = process.env.REACT_APP_API_KEY;
    const response = await fetch("https://api.rawg.io/api/games?key=" + key);
    const data = await response.json();
    console.log(data.results[0].playtime);
    return "HI";
  }
  return <div>{fetchAPI()}</div>;
}
