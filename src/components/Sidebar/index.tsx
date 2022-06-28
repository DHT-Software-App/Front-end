import { useState } from "react"
const DashboardIcon = require("assets/icons/DashIcon.png");
const EmployeesIcon = require("assets/icons/EmployeesIcon.png");
const DocumentsIcon = require("assets/icons/DocumentsIcon.png");
const JobsIcon = require("assets/icons/JobsIcon.png");
const CustomersIcon = require("assets/icons/CustomersIcon.png");
const CustomersReferenceIcon = require("assets/icons/CustomersReferenceIcon.png");
const InsuranceIcon = require("assets/icons/InsuranceIcon.png");
const AppointmentsIcon = require("assets/icons/AppointmentsIcon.png")

type SidebarItemProps = {
  urlIcon: string;
  text: string;
  actived?: boolean;
};

const SidebarItem = ({
  urlIcon,
  actived = false,
  text
}: SidebarItemProps) => {
  return <li className="flex text-white font-bold text-lg px-6 py-6 items-center hover:bg-slate-800 hover:cursor-pointer">
    <img src={urlIcon} className="w-6 h-full flex-shrink-0 mr-6" />
    <span>
      {text}
    </span>
  </li>
}

// Container
export const Sidebar = () => {
  const [expanded, setExpaned] = useState<boolean>(false);

  const toggleExpaned = () => {
    setExpaned(!expanded);
  };

  return <aside className={`h-full max-w-xs bg-blue-dark relative duration-300`}>
    <ul>
      <SidebarItem text="Dashboard" urlIcon={DashboardIcon} />
      <SidebarItem text="Employeers" urlIcon={EmployeesIcon} />
      <SidebarItem text="Documents" urlIcon={DocumentsIcon} />
      <SidebarItem text="Jobs" urlIcon={JobsIcon} />
      <SidebarItem text="Customers" urlIcon={CustomersIcon} />
      <SidebarItem text="Customers Reference" urlIcon={CustomersReferenceIcon} />
      <SidebarItem text="Insurance Companies" urlIcon={InsuranceIcon} />
      <SidebarItem text="Appointments" urlIcon={AppointmentsIcon} />
    </ul>
  </aside>
}