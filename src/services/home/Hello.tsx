import invariant from "tiny-invariant";
import { useEffect } from "react";

export default function Hello() {
  useEffect(() => {
    const message = "";
    invariant(message.length > 0, "メッセージが空になっています！");
  }, []);

  return <h1>Hello, world!</h1>;
}
