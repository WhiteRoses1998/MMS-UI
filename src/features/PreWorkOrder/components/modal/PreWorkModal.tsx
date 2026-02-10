import { useState } from "react";

import PreWorkModalHeader from "@/features/PreWorkOrder/components/modal/PreWorkModalHeader";
import PreWorkModalFooter from "@/features/PreWorkOrder/components/modal/PreWorkModalFooter";
import PreWorkModalLayout from "@/features/PreWorkOrder/components/modal/PreWorkModalLayout";

import WorkOrderInfoSection from "@/features/PreWorkOrder/components/forms/WorkOrderInfoSection";
import FaultInfoSection from "@/features/PreWorkOrder/components/forms/FaultInfoSection";
import MandatorySection from "@/features/PreWorkOrder/components/forms/MandatorySection";
import FaultCodeSection from "@/features/PreWorkOrder/components/forms/FaultCodeSection";

import { 
  PreWorkOrder, 
  PreWorkDropdowns 
} from "@/features/PreWorkOrder/types";

interface Props {
  preWorkId: string;
  onClose: () => void;
}

export default function PreWorkModal({ preWorkId, onClose }: Props) {
  const [data, setData] = useState<PreWorkOrder>({
    work_order_no: "",
    job_reference: "",
    department: "",
    location: "",
    fault_type_id: null,
    fault_description: "",
    priority_id: null,
    job_status_id: null,
    fault_code_id: null,
  });

  const [dropdowns] = useState<PreWorkDropdowns>({
    priorities: [],
    jobStatuses: [],
    faultTypes: [],
    faultCodes: [],
    personnel: [],
    departments: [],
    locations: [],
  });

  const handleChange = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start">
      <div className="bg-white w-[95%] h-[95%] mt-4 rounded-md flex flex-col">
        <PreWorkModalHeader onClose={onClose} />

        <PreWorkModalLayout>
          <WorkOrderInfoSection data={data} onChange={handleChange} />
          <FaultInfoSection 
            data={data} 
            faultTypes={dropdowns.faultTypes} 
            onChange={handleChange} 
          />
          <MandatorySection 
            data={data} 
            priorities={dropdowns.priorities} 
            jobStatuses={dropdowns.jobStatuses} 
            onChange={handleChange} 
          />
          <FaultCodeSection 
            data={data} 
            faultCodes={dropdowns.faultCodes} 
            onChange={handleChange} 
          />
        </PreWorkModalLayout>

        <PreWorkModalFooter onClose={onClose} />
      </div>
    </div>
  );
} 