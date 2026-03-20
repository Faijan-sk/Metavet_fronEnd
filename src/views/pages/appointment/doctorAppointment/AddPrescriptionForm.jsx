import {
  X,
  FileText,
  MessageSquare,
  Plus,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import useJwt from "./../../../../enpoints/jwt/useJwt";

function AddPrescriptionForm({ appointment, onClose }) {
  const [prescription, setPrescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { success: bool, message: string }
  const [record, setRecord] = useState({});

  // If prescription already exists from backend, lock the form
  const prescriptionExists = !!record?.prescriptions;

  const handleSubmit = async () => {
    if (!prescription.trim() || prescriptionExists) return;
    setSubmitting(true);
    setSubmitStatus(null);

    const payload = {
      prescription: prescription,
      appointmentId: appointment?.id,
    };

    try {
      const response = await useJwt.addPriscription(payload);
      const data = response?.data;

      if (data?.success) {
        setSubmitStatus({
          success: true,
          message: data.message || "Prescription added successfully",
        });
        setSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setSubmitStatus({
          success: false,
          message: data?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setSubmitStatus({ success: false, message: errMsg });
    } finally {
      setSubmitting(false);
    }
  };

  const fetchPriscription = async () => {
    try {
      const response = await useJwt.getSignlePrisription(appointment.id);
      const data = response?.data?.data || {};
      setRecord(data);
      // Pre-fill textarea if prescription already exists from backend
      if (data?.prescriptions) {
        setPrescription(data.prescriptions);
      }
    } catch {
      // No existing record — that's fine, silently ignore
    }
  };

  useEffect(() => {
    fetchPriscription();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#52B2AD]/15">
              <FileText size={24} className="text-[#52B2AD]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Add Prescription
              </h2>
              {appointment && (
                <p className="text-lg text-gray-400">
                  {appointment.petName} &bull; {appointment.userName}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {submitted ? (
            /* ── Success screen ── */
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                Prescription Saved!
              </h3>
              <p className="text-lg text-gray-400">
                {submitStatus?.message || "Prescription has been recorded."}
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Closing automatically…
              </p>
            </div>
          ) : (
            <>
              {/* ── Already exists — info banner ── */}
              {prescriptionExists && (
                <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#52B2AD]/10 border border-[#52B2AD]/20 text-[#3d9a95]">
                  <CheckCircle size={20} className="mt-0.5 shrink-0" />
                  <p className="text-base font-medium">
                    A prescription has already been added for this appointment.
                  </p>
                </div>
              )}

              {/* ── Error banner ── */}
              {submitStatus && !submitStatus.success && (
                <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600">
                  <AlertCircle size={20} className="mt-0.5 shrink-0" />
                  <p className="text-base font-medium">
                    {submitStatus.message}
                  </p>
                </div>
              )}

              {/* Client's Note */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={18} className="text-[#52B2AD]" />
                  <span className="text-base font-semibold text-gray-500">
                    Client's Note
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-lg text-gray-600 border border-gray-100 min-h-[60px]">
                  {record?.clientNote
                    ? record.clientNote
                    : appointment?.clientNote ||
                      appointment?.notes || (
                        <span className="text-gray-300 italic">
                          No note provided by the client.
                        </span>
                      )}
                </div>
              </div>

              {/* Doctor's Prescription */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={18} className="text-[#52B2AD]" />
                  <span className="text-base font-semibold text-gray-500">
                    Prescription
                  </span>
                  {prescriptionExists && (
                    <span className="ml-auto text-xs font-medium text-[#52B2AD] bg-[#52B2AD]/10 px-2 py-0.5 rounded-full">
                      Already submitted
                    </span>
                  )}
                </div>
                <textarea
                  rows={5}
                  disabled={prescriptionExists}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#52B2AD]/40 focus:border-[#52B2AD] transition-all placeholder:text-gray-300 resize-none disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                  placeholder="Write the prescription here…"
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-200 text-lg font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {prescriptionExists ? "Close" : "Cancel"}
            </button>

            {/* Hide save button entirely when prescription already exists */}
            {!prescriptionExists && (
              <button
                onClick={handleSubmit}
                disabled={submitting || !prescription.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#52B2AD] text-white text-lg font-semibold hover:bg-[#3d9a95] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Saving…
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Save Prescription
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddPrescriptionForm;
