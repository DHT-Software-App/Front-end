import { useEffect, useState } from "react"

// icons
import { Add, Clear } from '@mui/icons-material';
import { Popover, Transition } from "@headlessui/react";

type DynamicListProps = {
  values: string[];
  title: string;
  onChange: (values: string[]) => void;
}

export const DynamicList = ({
  values,
  onChange,
  title
}: DynamicListProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredValues, setFilteredValues] = useState<string[]>(values);

  // states warnings
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  // effects
  useEffect(() => {
    if (inputValue) {
      filterMatches(inputValue);
    } else {
      setFilteredValues(values);
    }
  }, [inputValue]);

  useEffect(() => {
    if (values) {
      setFilteredValues(values)
    }
  }, [values]);

  // handlers
  const filterMatches = (value: string) => {
    setFilteredValues(
      values.filter((prev) => prev.match(new RegExp(value, 'i')))
    )
  }

  const handleOnAdd = (value: string) => {
    // Verificar si se intenta agregar un valor ya existente.
    if (filteredValues.length == 1 && value.match(new RegExp(`^${filteredValues[0]}$`, 'i'))) {
      setIsDuplicate(true);
    } else {
      onChange([...values, value]);
    }

  }

  const handleOnRemove = (value: string) => {
    onChange(
      values.filter((prev: string) => prev != value)
    );

  }

  const handleOnInputChange = (ev: any) => {
    const { value } = ev.target;

    // Limpianzo errores
    if (isDuplicate) {
      setIsDuplicate(false);
    }

    setInputValue(value.trim());
  }


  return <div className="flex flex-col py-2 rounded-sm space-y-2">
    <label
      className="capitalize text-base font-semibold text-slate-700"
    >
      {title}
    </label> <Popover className="relative">

      {({ open }) => <>
        <div className="relative max-w-fit">
          <Popover.Button>

            <div className={`capitalize text-start text-base font-medium  ${open ? 'bg-neutral-100 text-slate-400 shadow-inner' : 'bg-neutral-100 text-slate-700'} 
          rounded-md pl-6 pr-6 py-3 w-full md:w-72 focus:ring-blue-500 focus:border-blue-500 
          block dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-100`}>
              <span>{title}</span>

              <span className="font-bold ml-1">({values.length})</span>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl cursor-pointer">
              <Add className={`w-5 h-5 ${open ? 'text-zinc-300' : 'text-zinc-500'} dark:text-zinc-400`} fontSize="inherit" />
            </div>
          </Popover.Button>

        </div>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0">

          <Popover.Panel className="absolute z-10 mt-1">
            <div className="bg-white rounded-md shadow-md flex flex-col w-full md:w-72">
              <div className={`flex text-base  bg-slate-50 shadow-inner
            rounded-t-md  w-full text-zinc-900 outline-none focus:ring-blue-500 
             dark:bg-zinc-700 dark:border-zinc-600  dark:text-white 
            dark:focus:ring-blue-500 duration-100 `}>
                <input
                  type="text"
                  value={inputValue} onChange={handleOnInputChange}
                  className={`pl-6 pr-6 py-3 bg-transparent outline-none placeholder-slate-300 dark:placeholder-zinc-400`}
                  placeholder="Type" />


                <div className="flex items-center pr-3 " >
                  <span onClick={() => handleOnAdd(inputValue)} className={`text-white text-center bg-blue-light uppercase font-bold shadow-sm rounded-full px-3 cursor-pointer`} style={{ fontSize: '10px' }} >
                    add
                  </span>
                </div>

              </div>

              {

                filteredValues.length ?
                  <ul className="text-base">
                    {
                      filteredValues.map((value: string, index: number) =>
                        <li key={index} className="flex select-none px-4 py-4  justify-between hover:bg-zinc-100 text-zinc-700">
                          <div dangerouslySetInnerHTML={{
                            __html:
                              inputValue ?
                                value.replace(inputValue, `<span class="font-bold px-1 py-0.5 rounded-md ${isDuplicate ? 'text-red-700 bg-red-100' : 'text-yellow-700 bg-yellow-100'}">${inputValue}</span>`)
                                : value
                          }}></div>


                          <a className="cursor-pointer text-base text-zinc-500 hover:text-zinc-700" onClick={() => handleOnRemove(value)}>
                            <Clear fontSize="inherit" />
                          </a>


                        </li>
                      )
                    }
                  </ul> :

                  <div className="px-4 py-2 font-medium text-slate-500">No Matching</div>
              }
            </div>



          </Popover.Panel>

        </Transition>
      </>
      }
    </Popover >
  </div>

}

