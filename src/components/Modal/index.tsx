import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");
const el = document.createElement("div");

const ModalPortalWrapper = ({ children }: any) => {
	useEffect(() => {
		modalRoot?.appendChild(el);

		return () => {
			modalRoot?.removeChild(el);

			console.log(modalRoot);
		};
	}, []);

	return createPortal(children, el);
};

type ModalProps = {
	opacity?: boolean;
	props?: any;
	children?: any;
	open?: boolean;
};

export const Modal = ({
	opacity = false,
	children,
	open = false,
}: ModalProps) => {
	return (
		<ModalPortalWrapper>
			<div
				id="modal-component-container"
				className={`fixed inset-0 ${open ? "" : "hidden"} z-50`}
			>
				<div className="modal-flex-container max-h-screen flex flex-col items-center pt-4 pl-4 pr-4 pb-20 text-center sm:p-0">
					<div
						className={`modal-bg-container fixed inset-0  ${
							opacity ? "bg-black bg-opacity-75" : ""
						}`}
					></div>
					<div
						className="modal-container inline-block align-bottom bg-white rounded-lg 
text-left shadow-xl overflow-auto transform transition-all sm:my-8 sm:align-middle 
"
					>
						{children}
					</div>
				</div>
			</div>
		</ModalPortalWrapper>
	);
};
