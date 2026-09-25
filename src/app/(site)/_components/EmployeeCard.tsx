import Image from "next/image";

import type { Employee } from "@/content/types";

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => (
  <li className="flex flex-1 flex-col items-center text-center">
    <div className="hover:ring-primary relative size-45 overflow-hidden rounded-lg transition-shadow hover:ring-6 md:size-62">
      {employee.picture?.url && (
        <Image
          src={employee.picture.url}
          alt={employee.picture.alt}
          fill
          sizes="(min-width: 768px) 250px, 180px"
          className="object-cover object-top grayscale"
        />
      )}
    </div>
    <h3 className="mt-4 mb-1 text-xl">{employee.name}</h3>
    <p className="font-light">{employee.job}</p>
  </li>
);
