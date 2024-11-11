import { MapContainer, TileLayer } from "react-leaflet";

interface MapProps {
  children: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ children }) => {
  return (
    <>
      <MapContainer
        center={[17.9459, 105.97]}
        zoom={7}
        style={{
          width: "100vw",
          height: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </>
  );
};

export default Map;
