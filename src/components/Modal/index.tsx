import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// icons
import { Close } from "@mui/icons-material"

type ModalProps = {
  children?: any;
  isOpen?: boolean;
  closeModal: () => void;
};

export const Modal = ({ children, isOpen = false, closeModal }: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 w-screen" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >

              <div className="relative">
                <div className="z-50 bg-zinc-700 text-zinc-50 flex justify-center items-center w-8 h-8 text-lg opacity-80 rounded-full absolute -right-3 -top-3 cursor-pointer"
                  onClick={closeModal}>
                  <Close fontSize="inherit" ></Close>
                </div>
                <Dialog.Panel className="transform overflow-hidden  bg-white text-left rounded-2xl align-middle shadow-xl transition-all">

                  {children}
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};