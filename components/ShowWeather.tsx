"use client";
import { useState, useEffect } from "react";
import { CreateColor } from "@/lib/CreateColor";
import { WeatherData, ColorMap } from "@/types/weather";
import SearchCity from "@/utils/SearchCity";
import type { CityOptionType, onSearchChangeType } from "@/types/weather";

export default function ShowWeather() {
    const [city, setCity] = useState<string>("");
    const [colors, setColors] = useState<ColorMap>();
    const [gradient, setGradient] = useState<string>();
    const [weather, setWeather] = useState<WeatherData>();

    const handleSearchChange: onSearchChangeType = (selectedOption: CityOptionType | null) => {
        setCity(selectedOption?.label || "");
        console.log(selectedOption);
    };

    useEffect(() => {
        const getGradient = async () => {
            if (colors) {
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
            <div className="flex gap-3">
                <SearchCity onSearchChange={handleSearchChange} />
                <button
                    onClick={() => getWeather()}
                    className="bg-stone-500 text-white rounded-md w-fit px-2 py-1"
                >
                    Weather
                </button>
            </div>
            <p className="text-sm w-full overflow-auto">
                {JSON.stringify(weather)}
            </p>
            <div
                className="w-full h-10"
                style={{ background: `linear-gradient(to right, ${gradient})`, }}
            />
        </div>
    )
}