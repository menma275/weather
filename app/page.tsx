import ShowWeather from "@/components/ShowWeather";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ShowWeather />
      <ShowWeather />
    </main>
  );
}
