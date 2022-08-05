import { Search } from "@mui/icons-material"
import { ClientsTable } from "components/Clients/Table";
import { ClientForm } from "components/Clients/Form";
import { Modal } from "components/Modal";
import { Toast } from "components/Toast";
import { useAuth } from "hooks/useAuth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanErrorFromClients, cleanSuccessFromClients, createClientRequest, ClientsStateProps, deleteClientRequest, getAllClientRequest, updateClientRequest } from "reducers/clients";
import { Client } from "types/Client";
import { Popup } from "components/Popup";
import { ListBox } from "components/ListBox";

type FilterClientsOptionsType = {
  display: string;
}

const filterClientsOptions: FilterClientsOptionsType[] = [
  {
    display: 'All Clients'
  },
  {
    display: 'Client No.1'
  },
  {
    display: 'Client No.2'
  }
]

export const Clients = () => {
  const dispatch = useDispatch();

  const [filteredClientsOption, setFilteredClientsOption] = useState<FilterClientsOptionsType>(filterClientsOptions[0]);

  // Read state
  const { success, clients, loading }: ClientsStateProps = useSelector(({ client }: any) => client);

  // Auth hook
  const { accessToken } = useAuth();

  // local states
  const [clientToEdit, setClientToEdit] = useState<Client>();
  const [clientToDelete, setClientToDelete] = useState<Client>();

  // Manage Modals
  const [openModalToCreate, setOpenModalToCreate] = useState<boolean>(false);
  const [openModalToEdit, setOpenModalToEdit] = useState<boolean>(false);
  const [openModalToDelete, setOpenModalToDelete] = useState<boolean>(false);

  // hooks

  // When mount/dismount
  useEffect(() => {
    // Get all clients
    dispatch(getAllClientRequest(accessToken!));

    return () => {
      dispatch(cleanSuccessFromClients());
      dispatch(cleanErrorFromClients());
    }
  }, []);

  useEffect(() => {
    if (success) {
      setOpenModalToCreate(false);
      setOpenModalToEdit(false);
      setOpenModalToDelete(false);
    }
  }, [success]);

  // handlers
  const handleOnCreate = (client: Client) => {
    dispatch(createClientRequest(client, accessToken!));
  }

  const handleOnEdit = (client: Client) => {
    setClientToEdit(client);
    setOpenModalToEdit(true);
  }

  const handleOnUpdate = (client: Client) => {
    dispatch(updateClientRequest(client, accessToken!));
  }

  const handleOnDelete = (client: Client) => {
    setClientToDelete(client);
    setOpenModalToDelete(true);
  }


  return <div className="flex flex-col gap-y-12 p-12 bg-gray-100">
    <div className="capitalize font-bold text-2xl text-slate-600 pb-6 mb-6 flex flex-col md:flex-row justify-between items-baseline gap-8" style={{ borderBottom: "1px solid#e3e3e3" }}>

      <div className="p-4 w-full md:w-auto">
        manage clients reference
      </div>

      {/* Boton de crear clientes */}
      <div className="w-full md:w-auto">
        <button
          className="bg-blue-light w-full text-white uppercase text-sm font-bold px-8 py-4 rounded-md"
          onClick={() => setOpenModalToCreate(true)}
        >
          create a new client
        </button>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">
      {/* Buscador de clientes */}
      <div className="p-4 w-full md:w-auto">
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          </div>
          <input type="text" className="w-full md:w-80 text-base bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for clients reference" />
        </div>
      </div>
      {/* 
      <div className="w-full md:w-auto">
        <ListBox defaultItem={filteredClientsOption} displayName="display" items={filterClientsOptions} label="Filtered clients" onSelect={setFilteredClientsOption}></ListBox>
      </div> */}

    </div>

    {/* Customer Table */}
    {
      loading ? 'loading' : clients?.length ? <ClientsTable values={clients!} onDelete={handleOnDelete} onEdit={handleOnEdit} /> : <>Empty</>
    }


    {/* Modals */}

    {/* For new customer */}

    <Modal
      isOpen={openModalToCreate}
      closeModal={() => {
        setOpenModalToCreate(false);
      }}
    >
      <div className="px-6">
        <ClientForm initialValue={{
          person_contact: '',
          company: '',
          email: '',
          street: '',
          zip: 0,
          client_status: false,
          contact: []
        }} submit={handleOnCreate} />
      </div>
    </Modal>

    {/* For editing customer */}
    <Modal
      isOpen={openModalToEdit}
      closeModal={() => {
        setOpenModalToEdit(false);
      }}
    >
      <div className="px-6">
        <ClientForm initialValue={clientToEdit!} submit={handleOnUpdate} />
      </div>
    </Modal>


    {/* Confirm delete */}
    <Modal
      isOpen={openModalToDelete}
      closeModal={() => {
        setOpenModalToDelete(false);
      }}>
      <Popup
        title={`Delete Client.`}
        description={`Are you sure that you want to delete '${clientToDelete?.person_contact}'?`}
        accept={() => {
          dispatch(deleteClientRequest(clientToDelete?.id!, accessToken!));
        }}
        cancel={() => {
          setOpenModalToDelete(false);
        }}
        acceptClasses="text-white hover:bg-red-600 bg-red-500"
        iconBg="bg-red-100"
        acceptTitle="Remove"
        icon={<div></div>} />
    </Modal>

    {/* Toast */}
    <Toast isOpen={success!} backgroundColor="success" onClose={() => {
      dispatch(cleanSuccessFromClients());
    }} description="Process done succesfully" />

  </div>
}