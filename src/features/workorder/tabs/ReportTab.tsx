// ReportTab.tsx - Fixed
import { WorkOrder, MasterData, ReportData, ImageFile } from '../types';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const API_BASE_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) ||
  'http://localhost:3000';

interface Props {
  workOrder: WorkOrder;
  masters: MasterData;
  onUpdate: (data: ReportData) => void;
  onDirtyChange?: (dirty: boolean) => void; // ✅ [FIX 1] เพิ่ม prop
}

export default function ReportTab({ workOrder, masters, onUpdate, onDirtyChange }: Props) {
  const [formData, setFormData] = useState<ReportData>({});
  const [updateTimeout, setUpdateTimeout] = useState<NodeJS.Timeout | null>(null);

  // Photo state
  const [images, setImages] = useState<ImageFile[]>([]);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);
  const photoBeforeRef = useRef<HTMLInputElement>(null);
  const photoAfterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const formatDateTime = (datetime: string | undefined): string => {
      if (!datetime) return '';
      if (typeof datetime === 'string') {
        return datetime.replace(/\.\d{3}Z$/, '').replace('Z', '');
      }
      return datetime;
    };

    setFormData({
      errorclass_id: workOrder.errorclass_id,
      performaction_id: workOrder.performaction_id,
      symptom_id: workOrder.symptom_id,
      work_done: workOrder.work_done,
      real_start_datetime: formatDateTime(workOrder.real_start_datetime),
      real_finish_datetime: formatDateTime(workOrder.real_finish_datetime),
      errortype_id: workOrder.errortype_id,
      errorcause_id: workOrder.errorcause_id,
      work_desc: workOrder.work_desc,
      break_start_datetime: formatDateTime(workOrder.break_start_datetime),
      break_finish_datetime: formatDateTime(workOrder.break_finish_datetime),
    });
  }, [workOrder.workorder_id]);

  useEffect(() => {
    if (workOrder.workorder_id) {
      fetchImages();
    }
  }, [workOrder.workorder_id]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/activity-orders/${workOrder.workorder_id}/images`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.ok) {
        setImages(response.data.data);
      }
    } catch (err) {
      console.error('fetchImages error:', err);
    }
  };

  const handleChange = (field: keyof ReportData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // ✅ [FIX 2] แจ้ง parent ว่า form dirty
    onDirtyChange?.(true);

    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }

    const timeout = setTimeout(() => {
      // ✅ [FIX 3] ส่งได้ทุก field
      // ยกเว้นกรณีเดียว: กรอก real_start หรือ real_finish แค่อันเดียว (ยังไม่ครบคู่)
      const isDatetimeField = field === 'real_start_datetime' || field === 'real_finish_datetime';
      const startFilled = !!updated.real_start_datetime;
      const finishFilled = !!updated.real_finish_datetime;

      if (isDatetimeField && startFilled !== finishFilled) {
        return; // รอให้กรอกครบทั้งคู่ก่อน
      }

      onUpdate(updated);
    }, 1000);

    setUpdateTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
    };
  }, [updateTimeout]);

  const formatDateTimeForInput = (datetime?: string) => {
    if (!datetime) return { date: '', time: '' };
    // ✅ ใช้ local date เหมือน GeneralTab และ ActivityTab — ป้องกัน UTC offset ทำให้วันเปลี่ยน
    const d = new Date(datetime);
    if (isNaN(d.getTime())) return { date: '', time: '' };
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const time = d.toTimeString().slice(0, 5);
    return { date, time };
  };

  const combineDatetime = (date: string, time: string) => {
    if (!date) return '';
    return `${date} ${time || '00:00'}:00`;
  };

  // Upload รูปภาพ
  const handlePhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    image_type: 'before' | 'after'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const setUploading = image_type === 'before' ? setUploadingBefore : setUploadingAfter;
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('image_type', image_type);

      const response = await axios.post(
        `${API_BASE_URL}/api/activity-orders/${workOrder.workorder_id}/images?image_type=${image_type}`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.ok) {
        await fetchImages();
      }
    } catch (err) {
      console.error('uploadImage error:', err);
      alert('ไม่สามารถอัปโหลดรูปภาพได้');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // ลบรูปภาพ
  const handleDeleteImage = async (image_id: number) => {
    if (!confirm('ต้องการลบรูปภาพนี้?')) return;
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/activity-orders/${workOrder.workorder_id}/images/${image_id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.ok) {
        await fetchImages();
      }
    } catch (err) {
      console.error('deleteImage error:', err);
      alert('ไม่สามารถลบรูปภาพได้');
    }
  };

  const imageBefore = images.find((img) => img.image_type === 'before');
  const imageAfter = images.find((img) => img.image_type === 'after');

  const realStart = formatDateTimeForInput(formData.real_start_datetime);
  const realFinish = formatDateTimeForInput(formData.real_finish_datetime);
  const breakStart = formatDateTimeForInput(formData.break_start_datetime);
  const breakFinish = formatDateTimeForInput(formData.break_finish_datetime);

  const labelClass = 'block text-xs font-bold text-gray-700 mb-1';
  const selectClass =
    'w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500';
  const inputClass =
    'w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500';
  const dateInputClass =
    'flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500';

  return (
    <div className="space-y-6">
      {/* ===== แถวแรก: Dropdowns ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ---- ซ้าย ---- */}
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Error Class / Incident</label>
            <select
              className={selectClass}
              value={formData.errorclass_id || ''}
              onChange={(e) => handleChange('errorclass_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.errorClasses.map((e) => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Perform Action ID</label>
            <select
              className={selectClass}
              value={formData.performaction_id || ''}
              onChange={(e) => handleChange('performaction_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.performActions.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Error Symptom</label>
            <select
              className={selectClass}
              value={formData.symptom_id || ''}
              onChange={(e) => handleChange('symptom_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.symptoms.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Error Type <span className="text-red-500">*</span></label>
            <select
              className={selectClass}
              value={formData.errortype_id || ''}
              onChange={(e) => handleChange('errortype_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.errorTypes.map((e) => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Error Cause <span className="text-red-500">*</span></label>
            <select
              className={selectClass}
              value={formData.errorcause_id || ''}
              onChange={(e) => handleChange('errorcause_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.errorCauses.map((e) => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ---- ขวา ---- */}
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Work Done</label>
            <textarea
              value={formData.work_done || ''}
              onChange={(e) => handleChange('work_done', e.target.value)}
              rows={3}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="สรุปงานที่ทำ"
            />
          </div>

          <div>
            <label className={labelClass}>Work Description</label>
            <input
              type="text"
              value={formData.work_desc || ''}
              onChange={(e) => handleChange('work_desc', e.target.value)}
              className={inputClass}
              placeholder="รายละเอียดเพิ่มเติม..."
            />
          </div>

          {/* Photos: Before & After */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className={labelClass}>📷 Photo before repair</label>
              <button
                type="button"
                onClick={() => photoBeforeRef.current?.click()}
                disabled={uploadingBefore}
                className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium rounded mb-2"
              >
                {uploadingBefore ? 'กำลังอัปโหลด...' : 'เลือกรูปภาพ'}
              </button>
              <input
                ref={photoBeforeRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoChange(e, 'before')}
              />
              <div
                className="w-full h-28 border-2 border-dashed border-gray-300 rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer relative"
                onClick={() => !imageBefore && photoBeforeRef.current?.click()}
              >
                {imageBefore ? (
                  <>
                    <img
                      src={`${API_BASE_URL}/${imageBefore.file_path}`}
                      alt="Before"
                      className="h-full w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleDeleteImage(imageBefore.image_id); }}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">Please Select</span>
                )}
              </div>
            </div>

            <div className="flex-1">
              <label className={labelClass}>📷 Photo after repair</label>
              <button
                type="button"
                onClick={() => photoAfterRef.current?.click()}
                disabled={uploadingAfter}
                className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium rounded mb-2"
              >
                {uploadingAfter ? 'กำลังอัปโหลด...' : 'เลือกรูปภาพ'}
              </button>
              <input
                ref={photoAfterRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoChange(e, 'after')}
              />
              <div
                className="w-full h-28 border-2 border-dashed border-gray-300 rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer relative"
                onClick={() => !imageAfter && photoAfterRef.current?.click()}
              >
                {imageAfter ? (
                  <>
                    <img
                      src={`${API_BASE_URL}/${imageAfter.file_path}`}
                      alt="After"
                      className="h-full w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleDeleteImage(imageAfter.image_id); }}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">Please Select</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== แถวสอง: Date fields ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Real Start Date <span className="text-red-500">*</span></label>
          <div className="flex gap-2">
            <input
              type="date"
              value={realStart.date}
              onChange={(e) => handleChange('real_start_datetime', combineDatetime(e.target.value, realStart.time))}
              className={dateInputClass}
            />
            <input
              type="time"
              value={realStart.time}
              onChange={(e) => handleChange('real_start_datetime', combineDatetime(realStart.date, e.target.value))}
              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Real Finish Date <span className="text-red-500">*</span></label>
          <div className="flex gap-2">
            <input
              type="date"
              value={realFinish.date}
              onChange={(e) => handleChange('real_finish_datetime', combineDatetime(e.target.value, realFinish.time))}
              className={dateInputClass}
            />
            <input
              type="time"
              value={realFinish.time}
              onChange={(e) => handleChange('real_finish_datetime', combineDatetime(realFinish.date, e.target.value))}
              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Break Start Date</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={breakStart.date}
              onChange={(e) => handleChange('break_start_datetime', combineDatetime(e.target.value, breakStart.time))}
              className={dateInputClass}
            />
            <input
              type="time"
              value={breakStart.time}
              onChange={(e) => handleChange('break_start_datetime', combineDatetime(breakStart.date, e.target.value))}
              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Break Finish Date</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={breakFinish.date}
              onChange={(e) => handleChange('break_finish_datetime', combineDatetime(e.target.value, breakFinish.time))}
              className={dateInputClass}
            />
            <input
              type="time"
              value={breakFinish.time}
              onChange={(e) => handleChange('break_finish_datetime', combineDatetime(breakFinish.date, e.target.value))}
              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}