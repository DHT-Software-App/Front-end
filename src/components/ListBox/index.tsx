import { useEffect, useState } from "react";

// Headless Utilities
import { Listbox as HeadListBox, Transition } from "@headlessui/react";

// icons
import { UnfoldMore } from '@mui/icons-material';

type ListBoxProps<T extends Record<string, any>> = {
  displayName: (keyof T)[];
  defaultItem: T;
  items: T[];
  label?: string;
  required?: boolean;
  onSelect: (item: T) => void;
};

export const ListBox = <T extends Record<string, any>>({
  displayName,
  defaultItem,
  items,
  label,
  required = false,
  onSelect
}: ListBoxProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T>(defaultItem);

  useEffect(() => {
    if (selectedItem) {
      onSelect(selectedItem);
    }
  }, [selectedItem]);

  return <HeadListBox as="div" value={selectedItem} onChange={setSelectedItem} className="relative">

    <div className="space-y-2 py-2">
      {/* Label */}
      {
        label &&
        <HeadListBox.Label className="text-base font-semibold text-slate-700">
          {label} {required && <span className="text-red-400">*</span>}
        </HeadListBox.Label>
      }

      {/* Button */}
      <HeadListBox.Button className="text-base font-semibold tracking-wide text-zinc-500 flex justify-between items-center gap-x-2 placeholder-slate-400 
      bg-neutral-100 rounded-md outline-none pl-6 pr-6 py-3 focus:outline-none focus:ring-2 
      focus:ring-inset focus:ring-slate-600 duration-100 w-full">
        {displayName.map((value: keyof T) => selectedItem[value]).join(' ')}
        <UnfoldMore fontSize="small" color="info" />
      </HeadListBox.Button>
    </div>


    {/* Options */}

    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0">

      <HeadListBox.Options className="absolute left-0 mt-2 rounded-md bg-white border-zinc-200 shadow-lg border w-full pt-2 max-h-48 overflow-auto">
        {
          items.map((item: T, index: number) => (
            <HeadListBox.Option key={index} value={item}>
              {({ selected, active }) => (
                <div
                  className={`block select-none px-4 py-2 mb-2 text-sm ${selected && "text-white font-semibold bg-zinc-700"
                    } text-gray-700 ${selected || 'hover:bg-zinc-100'} ${active && !selected ? 'bg-zinc-100' : ''}`}
                >
                  {displayName.map((value: keyof T) => item[value]).join(' ')}
                </div>
              )}
            </HeadListBox.Option>
          ))
        }
      </HeadListBox.Options>
    </Transition>


  </HeadListBox>
}