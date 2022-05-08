import { Listbox } from "@headlessui/react";

export const DropDownItem = ({ children, ...props }: any) => {
	return (
		<Listbox.Option {...props}>
			{({ active, selected }) => (
				<div
					className={`block px-4 py-2 mb-2 text-sm ${
						selected ? "font-semibold" : ""
					} text-gray-700 hover:bg-zinc-100`}
				>
					{children}
				</div>
			)}
		</Listbox.Option>
	);
};
