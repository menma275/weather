import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const {searchParams} = new URL(request.url);
    const city = searchParams.get("city");

    if(city === ""){
        return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}&units=metric`);
        const weather = await response.json();
        return NextResponse.json(weather, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
    }
}