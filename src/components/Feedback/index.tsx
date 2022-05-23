import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faExclamationTriangle,
	faCheckCircle,
	faClose,
} from "@fortawesome/free-solid-svg-icons";
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
				<FontAwesomeIcon
					icon={response.success ? faCheckCircle : faExclamationTriangle}
					className="text-xl"
				/>
				<p className="text-sm font-semibold">{response.message}</p>
			</div>

			<FontAwesomeIcon
				icon={faClose}
				onClick={quit}
				className="hover:cursor-pointer"
			/>
		</div>
	);
};
