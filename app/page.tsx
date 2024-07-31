import ShowWeather from "@/components/ShowWeather";
import ShowMap from "@/components/ShowMap";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full max-w-6xl m-auto p-6 py-12">
      <ShowWeather />
      <ShowWeather />
    </main>
  );
}
