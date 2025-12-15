import React, { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner"; // Assuming you use sonner or similar for alerts
import {
  UserPlus,
  CalendarPlus,
  Activity,
  Users,
  Stethoscope,
} from "lucide-react";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [surgeries, setSurgeries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    contact_info: "",
  });
  const [schedule, setSchedule] = useState({
    patient_id: "",
    doctor_id: "",
    surgery_type: "",
    ot_id: "",
    surgery_date: "",
    notes: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 1. Get Doctors
      const { data: docData } = await supabase
        .from("doctors")
        .select("*")
        .eq("is_active", true);
      setDoctors(docData || []);

      // 2. Get Patients (Profiles where role is patient)
      const { data: patData } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "patient");
      setPatients(patData || []);

      // 3. Get Existing Surgeries (For the List View)
      const { data: surgData } = await supabase
        .from("surgeries")
        .select("*, doctors(name), profiles(full_name, email)")
        .order("surgery_date", { ascending: true });
      setSurgeries(surgData || []);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Actions ---

  const addDoctor = async (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialization)
      return toast.error("Please fill all doctor fields");

    const { error } = await supabase.from("doctors").insert([newDoctor]);
    if (error) toast.error(error.message);
    else {
      toast.success("Doctor added successfully");
      setNewDoctor({ name: "", specialization: "", contact_info: "" });
      fetchData();
    }
  };

  const scheduleSurgery = async (e) => {
    e.preventDefault();
    if (!schedule.patient_id || !schedule.doctor_id || !schedule.surgery_date) {
      return toast.error("Please fill required schedule fields");
    }

    // Map the form state to your SQL Table columns
    const { error } = await supabase.from("surgeries").insert([
      {
        patient_id: schedule.patient_id,
        doctor_id: schedule.doctor_id,
        surgery_type: schedule.surgery_type,
        ot_id: schedule.ot_id,
        surgery_date: new Date(schedule.surgery_date).toISOString(),
        pre_op_events: schedule.notes, // Mapping 'notes' to 'pre_op_events'
        status: "Scheduled",
      },
    ]);

    if (error) toast.error("Error scheduling: " + error.message);
    else {
      toast.success("Surgery Scheduled Successfully");
      setSchedule({
        patient_id: "",
        doctor_id: "",
        surgery_type: "",
        ot_id: "",
        surgery_date: "",
        notes: "",
      });
      fetchData();
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">
        Loading Admin Panel...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans text-gray-800">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Hospital Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage medical staff and operating theatre schedules.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Card 1: Manage Doctors --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-2">
            <UserPlus className="text-blue-600 w-5 h-5" />
            <h3 className="font-semibold text-blue-900">Register New Doctor</h3>
          </div>
          <div className="p-6">
            <form onSubmit={addDoctor} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Sarah Smith"
                  value={newDoctor.name}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, name: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cardiology"
                    value={newDoctor.specialization}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        specialization: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Info
                  </label>
                  <input
                    type="text"
                    placeholder="Phone / Email"
                    value={newDoctor.contact_info}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        contact_info: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex justify-center items-center gap-2"
              >
                <Stethoscope className="w-4 h-4" /> Add Doctor
              </button>
            </form>
          </div>
        </div>

        {/* --- Card 2: Schedule Surgery --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-green-50 p-4 border-b border-green-100 flex items-center gap-2">
            <CalendarPlus className="text-green-600 w-5 h-5" />
            <h3 className="font-semibold text-green-900">Schedule Operation</h3>
          </div>
          <div className="p-6">
            <form onSubmit={scheduleSurgery} className="flex flex-col gap-4">
              {/* Row 1: Patient & Doctor Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Patient
                  </label>
                  <select
                    value={schedule.patient_id}
                    onChange={(e) =>
                      setSchedule({ ...schedule, patient_id: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="">-- Choose Patient --</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.full_name || p.email}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Surgeon
                  </label>
                  <select
                    value={schedule.doctor_id}
                    onChange={(e) =>
                      setSchedule({ ...schedule, doctor_id: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="">-- Choose Doctor --</option>
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.specialization})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Surgery Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Surgery Type
                  </label>
                  <input
                    placeholder="e.g. Appendectomy"
                    value={schedule.surgery_type}
                    onChange={(e) =>
                      setSchedule({ ...schedule, surgery_type: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OT Room ID
                  </label>
                  <input
                    placeholder="e.g. OT-04"
                    value={schedule.ot_id}
                    onChange={(e) =>
                      setSchedule({ ...schedule, ot_id: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={schedule.surgery_date}
                  onChange={(e) =>
                    setSchedule({ ...schedule, surgery_date: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pre-Op Notes
                </label>
                <textarea
                  placeholder="Add notes regarding patient condition or requirements..."
                  value={schedule.notes}
                  onChange={(e) =>
                    setSchedule({ ...schedule, notes: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 h-20"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex justify-center items-center gap-2"
              >
                <Activity className="w-4 h-4" /> Post Schedule
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- Section 3: Existing Schedule List --- */}
      <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center gap-2">
          <Users className="text-gray-600 w-5 h-5" />
          <h3 className="font-semibold text-gray-900">
            Current Surgery Schedule
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Surgery</th>
                <th className="px-6 py-3">Doctor</th>
                <th className="px-6 py-3">OT</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {surgeries.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {new Date(s.surgery_date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {s.profiles?.full_name || s.profiles?.email}
                  </td>
                  <td className="px-6 py-4">{s.surgery_type}</td>
                  <td className="px-6 py-4">Dr. {s.doctors?.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs border border-gray-200">
                      {s.ot_id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        s.status === "Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : s.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
              {surgeries.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No surgeries found. Add one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
