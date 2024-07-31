"use client";
import { Marker } from "react-leaflet";
import { useRef } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface positionType {
    lat: number;
    lng: number;
}

export default function ShowMap({ position }: { position?: positionType }) {
    if (!position) {
        position = { lat: 35.681236, lng: 139.767125 };
    }
    const mapRef = useRef(null);
    return (
        <MapContainer style={{ height: "25vh", width: "100%" }} center={[35.681236, 139.767125]} zoom={13} ref={mapRef}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}