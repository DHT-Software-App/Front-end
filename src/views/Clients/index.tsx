import { Search } from "@mui/icons-material";
import { clear_client_errors, clear_client_success } from "actions/client";
import {
  create_client_request,
  delete_client_request,
  get_clients_request,
  update_client_request,
} from "actions/client";
import { ClientForm } from "components/Clients/Form";
import { ClientsTable } from "components/Clients/Table";
import { Feedback } from "components/Feedback";
import { Modal } from "components/Modal";
import { Popup } from "components/Popup";
import { ClientEnum } from "enum/ClientEnum";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Client } from "types/Client";
import { SuccessResponse } from "utils/Responses/SuccessResponse";


export const Clients = () => {
  // util hooks
  const dispatch = useDispatch();

  const [search, setSearch] = useState();
  const [filteredClient, setFilteredClient] = useState();

  // to preserve client to edit
  const [clientEdit, setClientEdit] = useState<Client>();
  const [clientDelete, setClientDelete] = useState<Client>();

  // for modal open status
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { auth: token } = useSelector(
    ({ auth }: any) => auth
  );

  const {
    clients,
    loading,
    success: successFromClient,
  }: {
    clients: Client[];
    loading: boolean;
    success: SuccessResponse;
  } = useSelector(({ client }: any) => client);

  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

  useEffect(() => {
    dispatch(get_clients_request(token));

    return () => {
      dispatch(clear_client_errors());
      dispatch(clear_client_success());
    };
  }, []);

  useEffect(() => {
    if (successFromClient) {
      switch (successFromClient.code) {
        case ClientEnum.CREATED:
          setOpenNew(false);
          break;

        case ClientEnum.UPDATED:
          setOpenEdit(false);
          break;
      }

      setSuccesses([...successes, successFromClient]);
    }
  }, [successFromClient]);


  const removeSuccess = (index: number) => {
    setSuccesses(successes.filter((success, i) => i != index));
  };

  const handleSearch = (ev: any) => {
    console.log(ev);
  };

  // when editing client
  const handleOnEdit = (client: Client) => {
    dispatch(update_client_request(client, token));
  };

  // when creating client
  const handleOnCreate = (client: Client) => {
    dispatch(create_client_request(client, token));
  };

  const handleOnDelete = (id: number) => {
    dispatch(delete_client_request(id, token));
  };

  const prepareToEdit = (client: Client) => {
    setClientEdit(client);
    setOpenEdit(true);
  };

  const prepareToDelete = (client: Client) => {
    setClientDelete(client);
    setOpenDelete(true);
  };

  const handleFilteredClient = (ev: any) => { };

  return <div className="flex flex-col gap-y-8 p-12 bg-gray-100 relative">
    <div className="absolute top-0 left-0 w-full z-50">
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
        manage clients
      </div>

      <div className="w-full md:w-auto">
        <button
          className="bg-blue-light w-full text-white uppercase text-sm font-bold px-8 py-4 rounded-md"
          onClick={() => setOpenNew(true)}
        >
          create a new clients
        </button>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">
      <div className="p-4 w-full md:w-auto">
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          </div>
          <input type="text" className="w-full md:w-80 text-base bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for clients" />
        </div>
      </div>
      {/* 
<div className="w-full md:w-auto">
  <ListBox defaultItem={filteredClientsOption} displayName="display" items={filterClientsOptions} label="Filtered clients" onSelect={setFilteredClientsOption}></ListBox>
</div> */}

    </div>

    {/* Client Table */}
    {
      loading ? 'loading' : clients?.length ? <ClientsTable values={clients!} onDelete={prepareToDelete} onEdit={prepareToEdit} /> : <>Empty</>
    }


    {/* Modals */}

    {/* For new client */}

    <Modal
      isOpen={openNew}
      closeModal={() => {
        setOpenNew(false);
      }}
    >
      <div className="px-6">
        <ClientForm initialValue={{
          firstname: '',
          lastname: '',
          email_address_1: '',
          email_address_2: '',
          street: '',
          zip: 0,
          contacts: [],
          state: '',
          city: '',
          company: ''
        }} submit={handleOnCreate} />
      </div>
    </Modal>



    {/* For editing client */}
    <Modal
      isOpen={openEdit}
      closeModal={() => {
        setOpenEdit(false);
      }}
    >
      <div className="px-6">
        <ClientForm initialValue={clientEdit!} submit={handleOnEdit} />
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
        description={`Are you sure that you want to delete '${clientDelete?.firstname} ${clientDelete?.lastname}'?`}
        accept={() => {
          dispatch(delete_client_request(clientDelete?.id!, token!));
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