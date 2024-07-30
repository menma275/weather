import type { WeatherData, ColorMap } from "@/types/weather";

export function CreateColor(weather: WeatherData): ColorMap {
    const weatherScore = (weather.weather[0].main === "Clear") ? 1 :
                         (weather.weather[0].main === "Clouds") ? 0.5 : 0.2;

    const cloudScore = weather.clouds.all / 100;
    const humidityScore = weather.main.humidity / 100;
    const visibilityScore = weather.visibility / 10000;

    // utcの時間を取得
    const date = new Date();
    const UTCHours = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();
    // utcからの差分timezoneを使って現地時間を計算
    const hour = (UTCHours + (weather.timezone / 3600)) % 24;
    
    console.log(hour, minute, second);

    let windSpeedScore = 0;
    if (weather.wind.speed <= 1) {
        windSpeedScore = 1;
    } else if (weather.wind.speed <= 3) {
        windSpeedScore = 0.8;
    } else if (weather.wind.speed <= 5) {
        windSpeedScore = 0.6;
    } else {
        windSpeedScore = 0.4;
    }

    const totalScore = (0.3 * weatherScore +
                        0.3 * cloudScore +
                        0.2 * humidityScore +
                        0.1 * visibilityScore +
                        0.1 * windSpeedScore);

    const colorMap = {
        darkest: totalScore > 0.1 ? "#3b3b3b" : "#1c1c1c",
        darker: totalScore > 0.3 ? "#6c6c6c" : "#4a4a4a",
        dark: totalScore > 0.5 ? "#8c8c8c" : "#6b6b6b",
        sun: totalScore > 0.7 ? "#FF4500" : "#FFD700",
        light: totalScore > 0.6 ? "#FF6347" : "#FFA07A",
        lighter: totalScore > 0.4 ? "#FFA07A" : "#FFDEAD",
        lightest: totalScore > 0.2 ? "#FFD700" : "#F0E68C"
    } as ColorMap;

    return colorMap;
}
