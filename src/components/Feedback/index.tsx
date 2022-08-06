// icons
import { Check, Close, Error as Exclamation } from "@mui/icons-material";

import { SuccessResponse } from "utils/Responses/SuccessResponse";

type FeedbackProps = {
  response: SuccessResponse;
  quit: () => void;
};

export const Feedback = ({ response, quit }: FeedbackProps) => {
  return (
    <div
      className={`flex justify-between items-center px-3 py-3 text-white 
            w-full
            ${response.success ? "bg-green-500" : "bg-rose-500"}`}
    >
      <div className="flex items-center gap-3">
        <div className="text-xl">
          {
            response.success ? <Check fontSize="inherit" /> : <Exclamation fontSize="inherit" />
          }

        </div>
        <p className="text-sm font-semibold">{response.message}</p>
      </div>

      <Close
        onClick={quit}
        className="hover:cursor-pointer"
      />
    </div>
  );
};