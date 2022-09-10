import React from 'react'
import { Modal } from 'components/Modal';
import { Feedback } from "components/Feedback";
import { Popup } from "components/Popup";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { Appointment } from "types/Appointment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppointmentForm } from 'components/Appointments/Form';
import { Calendar } from 'components/Calendar';

export function Appointments() {
  // util hooks
  const dispatch = useDispatch();

  // for modal open status
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { auth: token } = useSelector(
    ({ auth }: any) => auth
  );

  // const {
  //   appointments,
  //   loading,
  //   success: successFromClient,
  // }: {
  //   appointments: Appointment[];
  //   loading: boolean;
  //   success: SuccessResponse;
  // } = useSelector(({ appointment }: any) => appointment);

  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

  // useEffect(() => {
  //   dispatch(get_appointments_request(token));

  //   return () => {
  //     dispatch(clear_appointment_errors());
  //     dispatch(clear_appointment_success());
  //   };
  // }, []);

  // useEffect(() => {
  //   if (successFromAppointment) {
  //     switch (successFromAppointment.code) {
  //       case AppointmentEnum.CREATED:
  //         setOpenNew(false);
  //         break;

  //       case AppointmentEnum.UPDATED:
  //         setOpenEdit(false);
  //         break;

  //     }

  //     setSuccesses([...successes, successFromAppointment]);
  //   }
  // }, [successFromAppointment]);

  const removeSuccess = (index: number) => {
    setSuccesses(successes.filter((success, i) => i != index));
  };

  const handleSearch = (ev: any) => {
    console.log(ev);
  };

  // when editing appointment
  // const handleOnEdit = (appointment: Appointment) => {
  //   dispatch(update_appointment_request(appointment, token));
  // };

  // when creating appointment
  // const handleOnCreate = (appointment: Appointment) => {
  //   dispatch(create_appointment_request(appointment, token));
  // };

  // const handleOnDelete = (id: number) => {
  //   dispatch(delete_appointment_request(id, token));
  // };

  // const prepareToEdit = (appointment: Appointment) => {
  //   setAppointmentEdit(appointment);
  //   setOpenEdit(true);
  // };

  // const prepareToDelete = (appointment: Appointment) => {
  //   setAppointmentDelete(appointment);
  //   setOpenDelete(true);
  // };


  return <div className="flex flex-col gap-y-8 p-12 bg-gray-100 relative">
    <div className="absolute top-0 left-0 w-full">
      {/* {successes.map((success, index) => (
        <Feedback
          key={index}
          response={success}
          quit={() => removeSuccess(index)}
        />
      ))} */}
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

    <Calendar />

    {/* Modals */}

    {/* For new appointment */}

    <Modal
      isOpen={openNew}
      closeModal={() => {
        setOpenNew(false);
      }}
    >
      <div className="px-6">
        <AppointmentForm initialValue={{
          address: '',
          contacts: [],
          end_date: new Date(),
          start_date: new Date(),
          notes: ''
        }} submit={() => { }} />
      </div>
    </Modal>



    {/* For editing client */}
    {/* <Modal
      isOpen={openEdit}
      closeModal={() => {
        setOpenEdit(false);
      }}
    >
      <div className="px-6">
        <ClientForm initialValue={clientEdit!} submit={handleOnEdit} />
      </div>
    </Modal> */}


    {/* Confirm delete */}
    {/* <Modal
      isOpen={openDelete}
      closeModal={() => {
        setOpenDelete(false);
      }}>
      <Popup
        title={`Delete Client.`}
        description={`Are you sure that you want to delete '${clientDelete?.firstname} ${clientDelete?.lastname}'?`}
        accept={() => {
          dispatch(delete_appointment_request(clientDelete?.id!, token!));
          setOpenDelete(false);
        }}
        cancel={() => {
          setOpenDelete(false);
        }}
        acceptClasses="text-white hover:bg-red-600 bg-red-500"
        iconBg="bg-red-100"
        acceptTitle="Remove"
        icon={<div></div>} />
    </Modal> */}


  </div>
}
