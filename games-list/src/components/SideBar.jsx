import { useState } from "react";

export default function SideBar() {
  const [bar, setBar] = useState(false);
  return (
    <div>
      <button onClick={() => setBar(!bar)}>?</button>
      <div></div>
    </div>
  );
}
