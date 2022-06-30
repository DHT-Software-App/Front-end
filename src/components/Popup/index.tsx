import { ReactNode } from "react";

type PopupProps = {
  title: ReactNode;
  description: ReactNode;
  cancel?: () => void;
  accept: () => void;
  icon: ReactNode;
  iconBg: string;
  acceptTitle: string;
  acceptClasses: string;
};

export const Popup = ({
  title: Title,
  description: Description,
  accept,
  cancel,
  icon: Icon,
  acceptTitle,
  acceptClasses,
  iconBg,
}: PopupProps) => {
  return (
    <>
      <div className="modal-wrapper bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:max-w-lg">
        <div className="modal-wrapper-flex sm:flex sm:items-start">
          <div
            className={`first-letter:modal-icon mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full  ${iconBg}
            sm:mx-0 sm:h-10 sm:w-10`}
          >
            {Icon}
          </div>
          <div className="modal-content text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg font-medium text-stone-900">{Title}</h3>

            <div className="modal-text mt-2">
              <p className="text-stone-500 text-sm">{Description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-actions bg-stone-50 px-4 py-3 sm:px-6 sm:flex sm:justify-end">
        {cancel && (
          <button
            onClick={cancel}
            className="w-full inline-flex justify-center rounded-md
						border border-stone-700 shadow-md px-4 py-2 bg-white font-medium text-stone-700
						hover:bg-stone-50
						focus:outline-none
						focus:ring-2
						focus:ring-offset-2
						sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        )}
        <button
          onClick={accept}
          className={`w-full inline-flex justify-center rounded-md
        border border-transparent shadow-md px-4 py-2 font-medium ${acceptClasses}
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        mt-3
        sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
        >
          {acceptTitle}
        </button>
      </div>
    </>
  );
};