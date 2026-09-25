import type { Employee } from "@/content/types";

import { EmployeeCard } from "./EmployeeCard";

interface EmployeesProps {
  employees: Employee[];
}

export const Employees: React.FC<EmployeesProps> = ({ employees }) => (
  <ul className="mx-auto my-24 flex w-[90vw] flex-col items-center justify-center gap-12 md:flex-row md:gap-4">
    {employees.map((employee) => (
      <EmployeeCard key={employee._id} employee={employee} />
    ))}
  </ul>
);
