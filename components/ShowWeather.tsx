"use client";
import { useState, useEffect } from "react";
import { CreateColor } from "@/lib/CreateColor";
import { WeatherData, ColorMap } from "@/types/weather";

export default function ShowWeather() {
    const [city, setCity] = useState<string>("");
    const [colors, setColors] = useState<ColorMap>();
    const [gradient, setGradient] = useState<string>();
    const [weather, setWeather] = useState<WeatherData>();

    useEffect(() => {
        const getGradient = async () => {
            const gc = [
                colors?.darkest,
                colors?.darker,
                colors?.dark,
                colors?.sun,
                colors?.light,
                colors?.lighter,
                colors?.lightest
            ].join(", ");
            setGradient(gc);
        }
        getGradient();
    }, [colors]);

    useEffect(() => {
        const getColor = async () => {
            if (weather) {
                const colors = await CreateColor(weather);
                setColors(colors);
            }
        }
        getColor();
    }, [weather]);

    const getWeather = async () => {
        if (city !== "") {
            try {
                const res = await fetch(`/api/get-weather?city=${city}`);
                const data = await res.json();
                setWeather(data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex">
                <input
                    type="text"
                    value={city}
                    className="border border-stone-500 rounded-md w-fit p-0"
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    onClick={() => getWeather()}
                    className="bg-stone-500 text-white rounded-md w-fit px-2 py-1"
                >
                    Get Weather
                </button>
            </div>
            <p className="text-sm w-full">
                {JSON.stringify(weather)}
            </p>
            <div
                className="w-full h-10"
                style={{ background: `linear-gradient(to right, ${gradient})`, }}
            >
                {/* {colors && Object.entries(colors as ColorMap).map(([key, color]) => (
                    <div key={key} style={{ margin: '10px', padding: '10px', backgroundColor: color }}>
                        <strong>{key}</strong>: {color}
                    </div>
                ))} */}
            </div>
        </div>
    )
}