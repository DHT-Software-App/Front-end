import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export type DropMetaOption = {
	display: string;
	value: any;
};

type DropDownProps = {
	label?: string;
	required?: boolean;
	children?: any;
	value: DropMetaOption;
	onChange: (ev: any) => void;
};

export const DropDown = ({
	label,
	required = false,
	children,
	value,
	onChange,
}: DropDownProps) => {
	return (
		<Listbox as="div" className="relative" value={value} onChange={onChange}>
			<div className="flex flex-col py-2 rounded-sm space-y-2">
				{label && (
					<label className="text-sm font-semibold text-slate-700">
						{label} {required && <span className="text-red-400">*</span>}
					</label>
				)}
				<Listbox.Button className="text-sm flex justify-between items-center placeholder-slate-400 bg-neutral-100 font-normal rounded-md outline-none pl-6 pr-6 py-3">
					{value.display}
					<FontAwesomeIcon icon={faCaretDown} className="text-sm" />
				</Listbox.Button>
			</div>

			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Listbox.Options className="absolute left-0 mt-2 rounded-md bg-white border-zinc-200 shadow-lg border w-64 pt-2">
					{children}
				</Listbox.Options>
			</Transition>
		</Listbox>
	);
};
