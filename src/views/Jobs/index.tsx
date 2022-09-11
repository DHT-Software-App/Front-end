import { Search } from "@mui/icons-material";
import {
  create_job_request,
  delete_job_request,
  get_jobs_request,
  update_job_request,
  clear_job_errors, clear_job_success
} from "actions/job";
import { JobForm } from "components/Jobs/Form";
import { JobsTable } from "components/Jobs/Table";
import { Feedback } from "components/Feedback";
import { Modal } from "components/Modal";
import { Popup } from "components/Popup";
import { JobEnum } from "enum/JobEnum";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Job } from "types/Job";
import { SuccessResponse } from "utils/Responses/SuccessResponse";


export const Jobs = () => {
  // util hooks
  const dispatch = useDispatch();

  const [search, setSearch] = useState();
  const [filteredJob, setFilteredJob] = useState();

  // to preserve job to edit
  const [jobEdit, setJobEdit] = useState<Job>();
  const [jobDelete, setJobDelete] = useState<Job>();

  // for modal open status
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { auth: token } = useSelector(
    ({ auth }: any) => auth
  );

  const {
    jobs,
    loading,
    success: successFromJob,
  }: {
    jobs: Job[];
    loading: boolean;
    success: SuccessResponse;
  } = useSelector(({ job }: any) => job);

  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

  useEffect(() => {
    dispatch(get_jobs_request(token));

    return () => {
      dispatch(clear_job_errors());
      dispatch(clear_job_success());
    };
  }, []);

  useEffect(() => {
    if (successFromJob) {
      switch (successFromJob.code) {
        case JobEnum.CREATED:
          setOpenNew(false);
          break;

        case JobEnum.UPDATED:
          setOpenEdit(false);
          break;

      }

      setSuccesses([...successes, successFromJob]);
    }
  }, [successFromJob]);


  const removeSuccess = (index: number) => {
    setSuccesses(successes.filter((success, i) => i != index));
  };

  const handleSearch = (ev: any) => {
    console.log(ev);
  };

  // when editing Job
  const handleOnEdit = (job: Job) => {
    dispatch(update_job_request(job, token));
  };

  // when creating Job
  const handleOnCreate = (job: Job) => {
    dispatch(create_job_request(job, token));
  };

  const handleOnDelete = (id: number) => {
    dispatch(delete_job_request(id, token));
  };

  const prepareToEdit = (job: Job) => {
    setJobEdit(job);
    setOpenEdit(true);
  };

  const prepareToDelete = (job: Job) => {
    setJobDelete(job);
    setOpenDelete(true);
  };

  const handleFilteredJob = (ev: any) => { };

  return <div className="flex flex-col gap-y-8 p-12 bg-gray-100 relative">
    <div className="absolute top-0 left-0 w-full">
      {successes.map((success, index) => (
        <Feedback
          key={index}
          response={success}
          quit={() => removeSuccess(index)}
        />
      ))}
    </div>

    <div className="capitalize font-bold text-2xl text-slate-600 pb-6 flex flex-col md:flex-row justify-between items-baseline gap-8" style={{ borderBottom: "1px solid#e3e3e3" }}>

      <div className="p-4 w-full md:w-auto">
        manage jobs
      </div>

      <div className="w-full md:w-auto">
        <button
          className="bg-blue-light w-full text-white uppercase text-sm font-bold px-8 py-4 rounded-md"
          onClick={() => setOpenNew(true)}
        >
          create a new jobs
        </button>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">
      <div className="p-4 w-full md:w-auto">
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          </div>
          <input type="text" className="w-full md:w-80 text-base bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for jobs" />
        </div>
      </div>
      {/* 
<div className="w-full md:w-auto">
  <ListBox defaultItem={filteredJobsOption} displayName="display" items={filterJobsOptions} label="Filtered jobs" onSelect={setFilteredJobsOption}></ListBox>
</div> */}

    </div>

    {/* Job Table */}
    {
      loading ? 'loading' : jobs?.length ? <JobsTable values={jobs!} onDelete={prepareToDelete} onEdit={prepareToEdit} /> : <>Empty</>
    }


    {/* Modals */}

    {/* For new Job */}

    <Modal
      isOpen={openNew}
      closeModal={() => {
        setOpenNew(false);
      }}
    >
      <div className="px-6">
        <JobForm initialValue={{
          policy_number: '0',
          claim_number: '0',
          notes: '',
          date_of_loss: new Date(),
          type_of_loss: '',
          company: '',
          street: '',
          city: '',
          state: '',
          status: 'new',
          zip: 0,

        }} submit={handleOnCreate} />
      </div>
    </Modal>


    {/* For editing Job */}
    <Modal
      isOpen={openEdit}
      closeModal={() => {
        setOpenEdit(false);
      }}
    >
      <div className="px-6">
        <JobForm initialValue={jobEdit!} submit={handleOnEdit} />
      </div>
    </Modal>


    {/* Confirm delete */}
    <Modal
      isOpen={openDelete}
      closeModal={() => {
        setOpenDelete(false);
      }}>
      <Popup
        title={`Delete Job.`}
        description={`Are you sure that you want to delete this job?`}
        accept={() => {
          dispatch(delete_job_request(jobDelete?.id!, token!));
          setOpenDelete(false);
        }}
        cancel={() => {
          setOpenDelete(false);
        }}
        acceptClasses="text-white hover:bg-red-600 bg-red-500"
        iconBg="bg-red-100"
        acceptTitle="Remove"
        icon={<div></div>} />
    </Modal>


  </div>
};