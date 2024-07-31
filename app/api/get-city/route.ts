import { NextResponse } from "next/server";

export async function GET(request:Request) {
    try{
        const {searchParams} = new URL(request.url);
        const input = searchParams.get("input");

        if(!input) {
            return new NextResponse(JSON.stringify({options: []}), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}`;
        const geoOptions = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': `${process.env.GEO_API}`,
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        const response = await fetch(url, geoOptions);

        if(!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const options = data.data.map((city: any) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
        }));

        return new NextResponse(JSON.stringify({options}), { 
            status: 200, 
            headers: { "Content-Type": "application/json" }
        });
    } catch(error) {
        return new NextResponse(JSON.stringify({options: [], error: error}), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
