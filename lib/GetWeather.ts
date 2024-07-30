export const GetWeather = async (city: string) => {
    try {
        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
        console.error(error);
    }
}