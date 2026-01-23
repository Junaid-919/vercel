import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://backend-vercel-zeta-eight.vercel.app/api/get_location_data/'
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      setLocations(result || []);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      setLoading(false);
    }
  };

  // initial fetch
  fetchData();

  // fetch every 5 seconds
  const intervalId = setInterval(fetchData, 5000);

  // cleanup on unmount
  return () => clearInterval(intervalId);
}, []);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Get the last record
  const lastLocation = locations.length ? locations[locations.length - 1] : null;

  if (!lastLocation) return <div>No locations available</div>;

  const position = [parseFloat(lastLocation.latitude), parseFloat(lastLocation.longitude)];

  return (
    <div>
      <h1>Executive Location</h1>
      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={position}
          icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41],
          })}
        >
          <Popup>
            Latitude: {lastLocation.latitude} <br />
            Longitude: {lastLocation.longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
