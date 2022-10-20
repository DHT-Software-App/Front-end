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
import { Filter, MetaResponse, Order, OrderBy, RequestQueryParams } from "utils/params/query";
import { SuccessResponse } from "utils/Responses/SuccessResponse";


export const Clients = () => {
  // util hooks
  const dispatch = useDispatch();

  // Params
  const [queryParams, setQueryParams] = useState<RequestQueryParams<Client>>({});

  // Sort
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy<Client>>('firstname');

  // Filter
  const [filterBy, setFilterBy] = useState<OrderBy<Client>>('firstname');

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
    meta
  }: {
    clients: Client[];
    loading: boolean;
    success: SuccessResponse;
    meta: MetaResponse
  } = useSelector(({ client }: any) => client);

  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

  useEffect(() => {
    dispatch(get_clients_request(token, queryParams));

    return () => {
      dispatch(clear_client_errors());
      dispatch(clear_client_success());
    };
  }, [queryParams]);

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


  // Sorting
  const handleSort = (order: Order, orderBy: OrderBy<Client>) => {
    setQueryParams({
      ...queryParams,
      order,
      orderBy
    });

    setOrder(order);
    setOrderBy(orderBy);
  }

  // Filtering
  const handleFilter = (filter: Filter<Client>) => {
    setQueryParams({
      ...queryParams,
      filter
    })
  };

  // when editing client
  const handleOnEdit = (client: Client) => {
    dispatch(update_client_request(client, token));
  };

  // when creating client
  const handleOnCreate = (client: Client) => {
    dispatch(create_client_request(client, token));
  };

  const prepareToEdit = (client: Client) => {
    setClientEdit(client);
    setOpenEdit(true);
  };

  const prepareToDelete = (client: Client) => {
    setClientDelete(client);
    setOpenDelete(true);
  };

  return <div className="flex flex-col gap-y-4 p-12 bg-gray-100 relative">
    <div className="absolute top-0 left-0 w-full">
      {successes.map((success, index) => (
        <Feedback
          key={index}
          response={success}
          quit={() => removeSuccess(index)}
        />
      ))}
    </div>

    <div className="capitalize font-bold text-2xl text-slate-600  flex flex-col md:flex-row justify-between items-baseline gap-8" >

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

      {/* 
<div className="w-full md:w-auto">
  <ListBox defaultItem={filteredClientsOption} displayName="display" items={filterClientsOptions} label="Filtered clients" onSelect={setFilteredClientsOption}></ListBox>
</div> */}

    </div>

    {/* Client Table */}
    {
      loading ? 'loading' : clients?.length ? <ClientsTable values={clients!} meta={meta} order={order} orderBy={orderBy} filterBy={filterBy} onDelete={prepareToDelete}
        onEdit={prepareToEdit} onSort={handleSort} onFilter={handleFilter} onPageChange={(page) => setQueryParams({ ...queryParams, page })} onRowsPerPageChange={(per_page) => setQueryParams({ ...queryParams, per_page })} /> : <>Empty</>
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