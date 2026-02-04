import PreWorkModalHeader from '@/features/PreWorkOrder/components/modal/PreWorkModalHeader';
import PreWorkModalFooter from '@/features/PreWorkOrder/components/modal/PreWorkModalFooter';
import PreWorkModalLayout from '@/features/PreWorkOrder/components/modal/PreWorkModalLayout';

import WorkOrderInfoSection from '@/features/PreWorkOrder/components/forms/WorkOrderInfoSection';
import FaultInfoSection from '@/features/PreWorkOrder/components/forms/FaultInfoSection';
import MandatorySection from '@/features/PreWorkOrder/components/forms/MandatorySection';
import FaultCodeSection from '@/features/PreWorkOrder/components/forms/FaultCodeSection';
import AttachmentSection from '@/features/PreWorkOrder/components/forms/AttachmentSection';

interface Props {
  preWorkId: string;
  onClose: () => void;
}

export default function PreWorkModal({ preWorkId, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start">
      <div className="bg-white w-[95%] h-[95%] mt-4 rounded-md">
        <PreWorkModalHeader onClose={onClose} />

        <PreWorkModalLayout>
          <WorkOrderInfoSection />
          <FaultInfoSection />
          <MandatorySection />
          <FaultCodeSection />
          <AttachmentSection />
        </PreWorkModalLayout>

        <PreWorkModalFooter onClose={onClose} />
      </div>
    </div>
  );
}
