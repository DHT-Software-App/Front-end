import React from 'react'
import { Modal } from 'components/Modal';
import { Feedback } from "components/Feedback";
import { Popup } from "components/Popup";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { Calendar } from "types/Calendar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarForm } from 'components/Appointments/Form';
import { CalendarTable } from 'components/Appointments/Table';
import { clear_calendar_errors, clear_calendar_success, create_calendar_request, delete_calendar_request, get_calendars_request, update_calendar_request } from 'actions/calendar';
import { CalendarEnum } from 'enum/CalendarEnum';

export function Appointments() {
  // util hooks
  const dispatch = useDispatch();

  const [search, setSearch] = useState();
  const [filteredClient, setFilteredClient] = useState();

  // to preserve calendar to edit
  const [calendarEdit, setCalendarEdit] = useState<Calendar>();
  const [calendarDelete, setCalendarDelete] = useState<Calendar>();

  // for modal open status
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { auth: token } = useSelector(
    ({ auth }: any) => auth
  );

  const {
    calendars,
    loading,
    success: successFromCalendar,
  }: {
    calendars: Calendar[];
    loading: boolean;
    success: SuccessResponse;
  } = useSelector(({ calendar }: any) => calendar);

  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

  useEffect(() => {
    dispatch(get_calendars_request(token));

    return () => {
      dispatch(clear_calendar_errors());
      dispatch(clear_calendar_success());
    };
  }, []);

  useEffect(() => {
    if (successFromCalendar) {
      switch (successFromCalendar.code) {
        case CalendarEnum.CREATED:
          setOpenNew(false);
          break;

        case CalendarEnum.UPDATED:
          setOpenEdit(false);
          break;

      }

      setSuccesses([...successes, successFromCalendar]);
    }
  }, [successFromCalendar]);

  const removeSuccess = (index: number) => {
    setSuccesses(successes.filter((success, i) => i != index));
  };

  const handleSearch = (ev: any) => {
    console.log(ev);
  };

  // when editing appointment
  const handleOnEdit = (calendar: Calendar) => {
    dispatch(update_calendar_request(calendar, token));
  };

  // when creating appointment
  const handleOnCreate = (calendar: Calendar) => {
    dispatch(create_calendar_request(calendar, token));
  };

  const handleOnDelete = (id: number) => {
    dispatch(delete_calendar_request(id, token));
  };

  const prepareToEdit = (calendar: Calendar) => {
    setCalendarEdit(calendar);
    setOpenEdit(true);
  };

  const prepareToDelete = (calendar: Calendar) => {
    setCalendarDelete(calendar);
    setOpenDelete(true);
  };


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
        manage appointments
      </div>

      <div className="w-full md:w-auto">
        <button
          className="bg-blue-light w-full text-white uppercase text-sm font-bold px-8 py-4 rounded-md"
          onClick={() => setOpenNew(true)}
        >
          create a new appointment
        </button>
      </div>
    </div>

    {/* Calendar Table */}
    {
      loading ? 'loading' : calendars?.length ? <CalendarTable values={calendars!} onDelete={prepareToDelete} onEdit={prepareToEdit} /> : <>Empty</>
    }

    {/* Modals */}

    {/* For new appointment */}

    <Modal
      isOpen={openNew}
      closeModal={() => {
        setOpenNew(false);
      }}
    >
      <div className="px-6">
        <CalendarForm initialValue={{
          address: '',
          contacts: [],
          end_date: new Date(),
          start_date: new Date(),
          notes: ''
        }} submit={handleOnCreate} />
      </div>
    </Modal>



    {/* For editing calendar */}
    <Modal
      isOpen={openEdit}
      closeModal={() => {
        setOpenEdit(false);
      }}
    >
      <div className="px-6">
        <CalendarForm initialValue={calendarEdit!} submit={handleOnEdit} />
      </div>
    </Modal>


    {/* Confirm delete */}
    <Modal
      isOpen={openDelete}
      closeModal={() => {
        setOpenDelete(false);
      }}>
      <Popup
        title={`Delete Client.`}
        description={`Are you sure that you want to delete this appointment?`}
        accept={() => {
          dispatch(delete_calendar_request(calendarDelete?.id!, token!));
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
}
