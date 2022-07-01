import { Search } from "@mui/icons-material"
import { CustomersTable } from "components/Customers/Table";
import { CustomerForm } from "components/Customers/Form";
import { Modal } from "components/Modal";
import { Toast } from "components/Toast";
import { useAuth } from "hooks/useAuth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanErrorFromCustomers, cleanSuccessFromCustomers, createCustomerRequest, CustomersStateProps, getAllCustomerRequest, updateCustomerRequest } from "reducers/customers";
import { Customer } from "types/Customer";

export const Customers = () => {
  const dispatch = useDispatch();

  // Read state
  const { success, customers, loading }: CustomersStateProps = useSelector(({ customer }: any) => customer);

  // Auth hook
  const { accessToken } = useAuth();

  // local states
  const [customerToEdit, setCustomerToEdit] = useState<Customer>();
  const [customerToDelete, setCustomerToDelete] = useState<number>();

  // Manage Modals
  const [openModalToCreate, setOpenModalToCreate] = useState<boolean>(false);
  const [openModalToEdit, setOpenModalToEdit] = useState<boolean>(false);

  // hooks

  // When mount/dismount
  useEffect(() => {
    // Get all customers
    dispatch(getAllCustomerRequest(accessToken!));

    return () => {
      cleanSuccessFromCustomers();
      cleanErrorFromCustomers();
    }
  }, []);

  useEffect(() => {
    if (success) {
      setOpenModalToCreate(false);
      setOpenModalToEdit(false);
    }
  }, [success]);

  // handlers
  const handleOnCreate = (customer: Customer) => {
    dispatch(createCustomerRequest(customer, accessToken!));
  }

  const handleOnEdit = (customer: Customer) => {
    setCustomerToEdit(customer);
    setOpenModalToEdit(true);
  }

  const handleOnUpdate = (customer: Customer) => {
    dispatch(updateCustomerRequest(customer, accessToken!));
  }

  const handleOnDelete = (id: number) => {
    setCustomerToDelete(id);
  }

  return <div className="flex flex-col gap-y-12 p-12 bg-gray-100">
    <div className="capitalize font-bold text-2xl text-slate-600 pb-6 mb-6" style={{ borderBottom: "1px solid#e3e3e3" }}>
      manage customers
    </div>

    <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">
      {/* Buscador de clientes */}
      <div className="p-4 w-full md:w-auto">
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          </div>
          <input type="text" className="w-full md:w-80 text-base bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for customers" />
        </div>
      </div>

      {/* Boton de crear clientes */}
      <div className="w-full md:w-auto">
        <button
          className="bg-blue-light w-full text-white uppercase text-sm font-bold px-8 py-4 rounded-md"
          onClick={() => setOpenModalToCreate(true)}
        >
          create a new customer
        </button>
      </div>

    </div>

    {/* Customer Table */}
    {
      loading ? 'loading' : customers?.length ? <CustomersTable values={customers!} onDelete={handleOnDelete} onEdit={handleOnEdit} /> : <>Empty</>
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
        <CustomerForm initialValue={{
          first_name: '',
          last_name: '',
          email: '',
          street: '',
          zip: 0,
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
        <CustomerForm initialValue={customerToEdit!} submit={handleOnUpdate} />
      </div>
    </Modal>


    {/* Toast */}
    <Toast isOpen={success!} backgroundColor="success" onClose={() => {
      cleanSuccessFromCustomers();
    }} description="Customer created succesfully" />

  </div>
}