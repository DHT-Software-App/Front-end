import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "components/Avatar";
export const ProfileCollapse = () => {
	return (
		<div className="flex p-6 font-mono">
			<div className="flex-none w-48 mb-10 relative z-10 rounded-full">
				<Avatar
					src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
					alt=""
					className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg"
				/>
			</div>
			<form className="flex-auto pl-6 w-52">
				<div className="relative flex flex-wrap items-baseline pb-6 before:bg-slate-100 before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
					<h1 className="relative w-full flex-none mb-2 text-lg font-semibold text-blue-dark">
						Luis Miguel
					</h1>
					<div className="relative text-sm text-stone-600">Administrator</div>
				</div>
				<div className="flex items-baseline my-6">
					<div className="space-x-3 flex text-sm font-medium"></div>
				</div>
				<div className="flex space-x-2 mb-4 text-sm font-medium">
					<div className="flex space-x-4">
						<button
							type="submit"
							className="bg-white border-2 font-black uppercase tracking-wider text-xs  px-5 py-3 rounded-md"
						>
							change <FontAwesomeIcon icon={faImagePortrait} />
						</button>
					</div>
				</div>
				<p className="text-xs leading-6 text-slate-500">Change your photo.</p>
			</form>
		</div>
	);
};
