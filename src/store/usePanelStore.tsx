import { GeoPoint } from "firebase/firestore";
import { create } from "zustand";

export type TMarker = {
  id: string;
  address: string;
  area: number;
  description: string;
  location: GeoPoint;
  name: string;
  price: number;
};

type TPanelStore = {
  isCollaped: boolean;
  data: TMarker;
  toggleCollapse: () => void;
  setCollapse: (isCollaped: boolean) => void;
  setData: (data: TMarker) => void;
};

const usePanelStore = create<TPanelStore>((set) => ({
  isCollaped: true,
  data: {} as TMarker,
  toggleCollapse: () => set((state) => ({ isCollaped: !state.isCollaped })),
  setCollapse: (isCollaped: boolean) => set({ isCollaped }),
  setData: (data: TMarker) => set({ data }),
}));

export default usePanelStore;
