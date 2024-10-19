import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import usePanelStore, { TMarker } from "@/store/usePanelStore";
import { Map } from "leaflet";

export const SearchInput: React.FC<{
  markerList: TMarker[];
  mapRef: React.RefObject<Map>;
}> = ({ markerList = [], mapRef }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const setMarkerData = usePanelStore((state) => state.setData);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? markerList.find((marker) => marker.name === value)?.name
            : "Tìm kiếm..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 z-[2000]">
        <Command>
          <CommandInput placeholder="Tìm kiếm..." />
          <CommandList>
            <CommandEmpty>Không tìm thấy.</CommandEmpty>
            <CommandGroup>
              {markerList.map((mark) => (
                <CommandItem
                  key={mark.id}
                  value={mark.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setMarkerData(mark);
                    setOpen(false);

                    const { longitude, latitude } = mark.location.toJSON();
                    mapRef.current?.flyTo([latitude, longitude], 18);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === mark.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <p>{mark.name}</p>
                    <p className="text-xs opacity-80">{mark.address}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
