import { MapContainer } from "react-leaflet";
import "./App.css";
import MapComponent from "./components/Map";
import Sidebar from "./components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { TMarker } from "./store/usePanelStore";
import db from "./lib/firebase";
import { Map } from "leaflet";

function App() {
  const [markerList, setMarkerList] = useState<TMarker[]>([]);

  useEffect(() => {
    (async () => {
      const markerRef = collection(db, "houses");
      const { docs } = await getDocs(markerRef);

      const markerList: TMarker[] =
        docs?.map((doc) => ({ ...doc.data(), id: doc.id } as TMarker)) ?? [];
      console.log(markerList[0].location.toJSON());
      console.log(markerList);
      setMarkerList(markerList);
    })();
  }, []);

  const mapRef = useRef<Map>(null);

  return (
    <div>
      <MapContainer
        ref={mapRef}
        zoomControl={false}
        center={[20.97157, 105.84365]}
        zoom={20}
      >
        <MapComponent markerList={markerList} />
      </MapContainer>
      <div className="fixed inset-0 z-[1000] pointer-events-none">
        <Sidebar mapRef={mapRef} markerList={markerList} />
      </div>
    </div>
  );
}

export default App;
