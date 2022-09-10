import { Job } from "types/Job";
import { Delete, Edit, QuestionMark } from "@mui/icons-material";

type JobStatus = "new" | "on going" | 'completed';

const JobWorkTypeBadge = ({
  name,
  ...props
}: {
  name?: string;
}) => {

  return (
    <span
      className={`p-1.5 text-xs font-medium uppercase 
		tracking-wider rounded-lg bg-opacity-50 
		${name == "Mold remediation" ? "text-white bg-[#17a2b8]" :
          name == "Water mitigation" ? "text-white bg-[#ffc107]" :
            name == "TARP" ? "text-white bg-[#dc3545]" :
              "text-white bg-[#28a745]"
        } 
		`}
    >
      {name}
    </span>
  );
};

const JobStatusBadge = ({
  status,
  ...props
}: {
  status?: JobStatus;
}) => {

  return (
    <span
      className={`p-1.5 text-xs font-medium uppercase 
		tracking-wider rounded-lg bg-opacity-50 
		${status == "completed" ? "text-green-800 bg-green-200" :
          status == "new" ? "text-sky-800 bg-sky-200" :
            "text-yellow-800 bg-yellow-200"
        } 
		`}
    >
      {status}
    </span>
  );
};

type JobRowProps = {
  value: Job;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
};


export const JobRow = ({
  value: job,
  onEdit,
  onDelete,
}: JobRowProps
) => {

  return <tr>
    <td className="px-6 py-4">
      {job.date_of_loss?.toString()}
    </td>
    <td className="px-6 py-4">
      {job.type_of_loss}
    </td>
    <td className="px-6 py-4">
      {job.customer?.firstname} {job.customer?.lastname}
    </td>
    <td className="px-6 py-4 text-center">
      <JobWorkTypeBadge name={job.work_type?.name!} />
    </td>
    <td className="px-6 py-4 text-center">
      {job.street}, {job.city}
    </td>

    <td className="px-6 py-4 text-center">
      <JobStatusBadge status={job.status} />
    </td>


    {/* ACTIONS */}
    <td className="px-6 py-4 text-center flex justify-center">

      <div className="flex py-2 rounded-full bg-zinc-100 divide-x-2 divide-zinc-200">
        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900">
          <QuestionMark fontSize="inherit" />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={() => onDelete(job)}>
          <Delete
            fontSize="inherit"
          />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={() => onEdit(job)}>
          <Edit
            fontSize="inherit"
          />
        </button>
      </div>
    </td>
  </tr>
}