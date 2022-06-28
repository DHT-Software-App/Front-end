import { useState } from "react"

// icons
import { ChevronRight } from "@mui/icons-material";

const DashboardIcon = require("assets/icons/DashIcon.png");
const EmployeesIcon = require("assets/icons/EmployeesIcon.png");
const DocumentsIcon = require("assets/icons/DocumentsIcon.png");
const JobsIcon = require("assets/icons/JobsIcon.png");
const CustomersIcon = require("assets/icons/CustomersIcon.png");
const CustomersReferenceIcon = require("assets/icons/CustomersReferenceIcon.png");
const InsuranceIcon = require("assets/icons/InsuranceIcon.png");
const AppointmentsIcon = require("assets/icons/AppointmentsIcon.png");


type SidebarItemProps = {
  urlIcon: string;
  text: string;
  actived?: boolean;
  withText: boolean;
};

const SidebarItem = ({
  urlIcon,
  actived = false,
  text,
  withText
}: SidebarItemProps) => {
  return <li className="flex text-white font-bold text-lg px-6 py-6 items-center hover:bg-slate-800 hover:cursor-pointer">
    <img src={urlIcon} className="w-6 h-full flex-shrink-0 mr-6" />
    {withText && <span>
      {text}
    </span>
    }
  </li>
}

// Container
export const Sidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return <aside className={`max-w-xs bg-blue-dark relative duration-300 ${expanded ? "w-72" : "w-20"}`}>

    {/* expand icon */}
    <div className="text-3xl absolute cursor-pointer -right-3 top-6" onClick={toggleExpanded}>
      <ChevronRight fontSize="inherit" className={`"text-blue-dark 
      bg-white rounded-full shadow-md ${expanded && "rotate-180"}"`}></ChevronRight>
    </div>

    <ul>
      <SidebarItem text="Dashboard" urlIcon={DashboardIcon} withText={expanded} />
      <SidebarItem text="Employeers" urlIcon={EmployeesIcon} withText={expanded} />
      <SidebarItem text="Documents" urlIcon={DocumentsIcon} withText={expanded} />
      <SidebarItem text="Jobs" urlIcon={JobsIcon} withText={expanded} />
      <SidebarItem text="Customers" urlIcon={CustomersIcon} withText={expanded} />
      <SidebarItem text="Customers Reference" urlIcon={CustomersReferenceIcon} withText={expanded} />
      <SidebarItem text="Insurance Companies" urlIcon={InsuranceIcon} withText={expanded} />
      <SidebarItem text="Appointments" urlIcon={AppointmentsIcon} withText={expanded} />
    </ul>
  </aside>
}