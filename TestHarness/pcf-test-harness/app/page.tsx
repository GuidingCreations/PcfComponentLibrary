import Image from "next/image";
import HomePage from "./pages/homePage";

export default function Home() {
  return (
    <div className=" h-[100vh] flex items-center justify-center bg-stone-950">
      <HomePage />
    </div>
  );
}
