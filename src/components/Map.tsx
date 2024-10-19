import L from "leaflet";
import { FC } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ImLocation } from "react-icons/im";
import { LayerGroup, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import usePanelStore, { TMarker } from "../store/usePanelStore";

const MapComponent: FC<{ markerList: TMarker[] }> = ({ markerList }) => {
  const houseMap = useMap();

  const setPanelCollapse = usePanelStore((state) => state.setCollapse);
  const setPanelData = usePanelStore((state) => state.setData);
  const panelData = usePanelStore((state) => state.data);

  const createMarkerIcon = (id: string) =>
    L.divIcon({
      html: renderToStaticMarkup(
        <ImLocation
          size={30}
          className={id === panelData.id ? "text-green-500" : "text-sky-500"}
        />
      ),
      className: "",
      iconSize: [30, 30], // Size of the custom icon
    });

  return (
    <div>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayerGroup>
        <button>test</button>
      </LayerGroup>
      <MarkerClusterGroup
        chunkDelay={200}
        pmIgnore={true}
        animateAddingMarkers={true}
        disableClusteringAtZoom={18}
        chunkedLoading
      >
        {markerList.map((marker) => {
          const { id, name, address, location } = marker;
          const { latitude, longitude } = location.toJSON();
          return (
            <Marker
              icon={createMarkerIcon(id)}
              position={[latitude, longitude]}
              key={`${latitude} ${longitude}`}
              eventHandlers={{
                click: () => {
                  setPanelCollapse(false);
                  setPanelData(marker);
                  houseMap.setZoom(18);
                  houseMap.flyTo([latitude, longitude], 18);
                },
              }}
            >
              <Popup>
                {name} <br /> {address}
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </div>
  );
};

export default MapComponent;
