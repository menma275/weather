"use client";

import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import type { SearchCityProps, CityOptionType } from "@/types/weather";

const SearchCity: React.FC<SearchCityProps> = ({ onSearchChange }) => {

    const [search, setSearch] = useState<CityOptionType | null>(null);

    const handleOnChange = (searchData: CityOptionType | null) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = async (input: string) => {
        try {
            const response = await fetch(`api/get-city?input=${input}`);
            const result = await response.json();
            if (!response.ok || !result.options) {
                throw new Error("Failed to fetch data");
            }
            return {
                options: result.options
            }
        } catch (error) {
            console.error(error);
            return {
                options: []
            }
        }
    }

    return (
        <AsyncPaginate
            placeholder="Search city"
            debounceTimeout={600}
            loadOptions={loadOptions}
            onChange={handleOnChange}
            value={search}
            className="w-full"
        />
    )
}

export default SearchCity