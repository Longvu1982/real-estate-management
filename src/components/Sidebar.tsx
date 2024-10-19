import { Map } from "leaflet";
import { FC, RefObject } from "react";
import { BiMoney } from "react-icons/bi";
import { FaLocationArrow, FaLocationDot } from "react-icons/fa6";
import { IoMdResize } from "react-icons/io";
import { cn } from "../lib/utils";
import usePanelStore, { TMarker } from "../store/usePanelStore";
import { SearchInput } from "./SearchInput";

const Sidebar: FC<{ markerList: TMarker[]; mapRef: RefObject<Map> }> = ({
  markerList,
  mapRef,
}) => {
  const isCollaped = usePanelStore((state) => state.isCollaped);
  const markerData = usePanelStore((state) => state.data);
  const handleToggleCollapse = usePanelStore((state) => state.toggleCollapse);

  const { area, name, address, description, location, price } = markerData;

  const { longitude, latitude } = location?.toJSON() ?? {};

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 z-[1000] w-96 transition-[left] bg-gray-50 pointer-events-auto shadow-md max-w-full p-6 ",
        isCollaped ? "-left-96" : "left-0"
      )}
    >
      <SearchInput markerList={markerList} mapRef={mapRef} />
      {markerData.name ? (
        <div className="mt-6">
          <h2 className="text-2xl">{name}</h2>
          <p>{description}</p>

          <div className="flex flex-col gap-2 py-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2 w-24 text-sky-700">
                <IoMdResize />
                <strong>Diện tích:</strong>
              </div>
              <p className="font-semibold">{area} km²</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2 w-24 text-sky-700">
                <FaLocationDot />
                <strong>Địa chỉ:</strong>
              </div>
              <p className="font-semibold">{address}</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2 w-24 text-sky-700">
                <FaLocationArrow /> <strong>Toạ độ:</strong>{" "}
              </div>
              <p className="font-semibold">{`${latitude} - ${longitude}`}</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2 w-24 text-sky-700">
                <BiMoney /> <strong>Giá</strong>{" "}
              </div>
              <p className="font-semibold">{price} VND</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2">Không có dữ liệu hiển thị</div>
      )}

      <div
        className="absolute cursor-pointer top-1/2 -right-8 -translate-y-1/2 bg-white w-8 h-16 rounded-tr-md rounded-br-md flex items-center justify-center bold text-xl border-l-[1px] shadow-md"
        onClick={handleToggleCollapse}
      >
        {isCollaped ? `>` : `<`}
      </div>
    </div>
  );
};

export default Sidebar;
