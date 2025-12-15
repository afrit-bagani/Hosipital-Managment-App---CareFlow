import React, { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner"; // Ensure you have this installed or use alert()

export default function UserDashboard() {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [mySurgeries, setMySurgeries] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id);
      fetchData(user?.id);
    };
    getUser();
  }, []);

  const fetchData = async (currentUserId) => {
    try {
      setLoading(true);

      // 1. Fetch Active Doctors
      const { data: doctorData, error: docError } = await supabase
        .from("doctors")
        .select("*")
        .eq("is_active", true);

      if (docError) throw docError;

      // 2. Fetch General OT Schedule
      const { data: scheduleData, error: schedError } = await supabase
        .from("surgeries")
        .select("*, doctors(name, specialization), profiles(full_name)")
        .order("surgery_date", { ascending: true });

      if (schedError) throw schedError;

      setDoctors(doctorData || []);
      setSchedules(scheduleData || []);

      // 3. Filter "My Surgeries"
      if (currentUserId && scheduleData) {
        const myData = scheduleData.filter(
          (s) => s.patient_id === currentUserId
        );
        setMySurgeries(myData);
      }

      // 4. Fetch "My Appointments"
      if (currentUserId) {
        // NOTE: We use 'requested_date' here to match the SQL table
        const { data: appointmentData, error: appError } = await supabase
          .from("appointments")
          .select("*, doctors(name, specialization)")
          .eq("patient_id", currentUserId)
          .order("requested_date", { ascending: true });

        if (!appError) {
          setMyAppointments(appointmentData || []);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLER: Book Appointment ---
  const handleBookAppointment = async (doctor) => {
    if (!userId) {
      toast.error("Please log in to book an appointment.");
      return;
    }

    // Simple Input Prompts (Quickest way without complex UI Modals)
    const dateInput = prompt(
      `Book with Dr. ${doctor.name}\nEnter Date (YYYY-MM-DD):`
    );
    if (!dateInput) return; // User cancelled

    const reasonInput = prompt("Enter Reason for visit (e.g., Stomach pain):");
    if (!reasonInput) return; // User cancelled

    // Validate Date
    const selectedDate = new Date(dateInput);
    if (isNaN(selectedDate.getTime())) {
      toast.error("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    const { error } = await supabase.from("appointments").insert([
      {
        patient_id: userId,
        doctor_id: doctor.id,
        requested_date: selectedDate.toISOString(), // Matches SQL column
        reason: reasonInput, // Matches SQL column
        status: "Pending",
      },
    ]);

    if (error) {
      toast.error("Error booking: " + error.message);
    } else {
      toast.success(`Appointment requested with Dr. ${doctor.name}`);
      fetchData(userId); // Refresh the list immediately
    }
  };

  if (loading)
    return <div style={{ padding: "20px" }}>Loading Dashboard...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          marginBottom: "30px",
          borderBottom: "2px solid #eee",
          paddingBottom: "10px",
        }}
      >
        <h1>Patient Dashboard</h1>
        <p>Welcome to the Hospital Management Portal</p>
      </header>

      {/* --- Section 1: Doctor Directory --- */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ color: "#2c3e50" }}>Find a Doctor</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {doctors.map((doc) => (
            <div key={doc.id} style={cardStyle}>
              <div style={avatarStyle}>{doc.name.charAt(0)}</div>
              <h3>Dr. {doc.name}</h3>
              <p style={{ color: "#7f8c8d", fontWeight: "bold" }}>
                {doc.specialization}
              </p>
              <p>📞 {doc.contact_info || "No Contact Info"}</p>
              <button
                style={buttonStyle}
                onClick={() => handleBookAppointment(doc)}
              >
                Request Appointment
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 1.5: My Appointments --- */}
      {myAppointments.length > 0 && (
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#2c3e50" }}>My Appointment Requests</h2>
          <div style={tableContainerStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#fff3e0", textAlign: "left" }}>
                  <th style={thStyle}>Requested Date</th>
                  <th style={thStyle}>Doctor</th>
                  <th style={thStyle}>Reason</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {myAppointments.map((appt) => (
                  <tr key={appt.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={tdStyle}>
                      {new Date(appt.requested_date).toLocaleDateString()}
                    </td>
                    <td style={tdStyle}>Dr. {appt.doctors?.name}</td>
                    <td style={tdStyle}>
                      {appt.reason || "No reason provided"}
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: appt.status === "Pending" ? "orange" : "green",
                        }}
                      >
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* --- Section 2: My Upcoming Procedures (Personal) --- */}
      {mySurgeries.length > 0 && (
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#2c3e50" }}>My Scheduled Procedures</h2>
          <div style={tableContainerStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#e8f5e9", textAlign: "left" }}>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Surgery</th>
                  <th style={thStyle}>Surgeon</th>
                  <th style={thStyle}>Pre-Op Notes</th>
                </tr>
              </thead>
              <tbody>
                {mySurgeries.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={tdStyle}>
                      {new Date(item.surgery_date).toLocaleString()}
                    </td>
                    <td style={tdStyle}>{item.surgery_type}</td>
                    <td style={tdStyle}>Dr. {item.doctors?.name}</td>
                    <td style={tdStyle}>{item.pre_op_events || "None"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* --- Section 3: General OT Schedule (Public Transparency) --- */}
      <section>
        <h2 style={{ color: "#2c3e50" }}>Operation Theatre (OT) Schedule</h2>
        <div style={tableContainerStyle}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
                <th style={thStyle}>Date & Time</th>
                <th style={thStyle}>OT Room</th>
                <th style={thStyle}>Patient Name</th>
                <th style={thStyle}>Surgery Type</th>
                <th style={thStyle}>Surgeon</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>
                    {new Date(item.surgery_date).toLocaleString()}
                  </td>
                  <td style={tdStyle}>
                    <span style={badgeStyle}>{item.ot_id}</span>
                  </td>
                  <td style={tdStyle}>
                    {item.profiles?.full_name || "Private"}
                  </td>
                  <td style={tdStyle}>{item.surgery_type}</td>
                  <td style={tdStyle}>
                    Dr. {item.doctors?.name || "Unassigned"}
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        ...statusStyle,
                        backgroundColor:
                          item.status === "Scheduled" ? "#e3f2fd" : "#fce4ec",
                        color:
                          item.status === "Scheduled" ? "#1976d2" : "#c2185b",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {schedules.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    style={{ padding: "20px", textAlign: "center" }}
                  >
                    No surgeries scheduled currently.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// --- Styles ---
const cardStyle = {
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  backgroundColor: "white",
};

const avatarStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "#3498db",
  color: "white",
  fontSize: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 15px auto",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "8px 16px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const tableContainerStyle = {
  overflowX: "auto",
  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  borderRadius: "8px",
  border: "1px solid #eee",
};

const thStyle = {
  padding: "15px",
  borderBottom: "2px solid #eee",
  color: "#555",
};
const tdStyle = { padding: "15px", color: "#333" };

const badgeStyle = {
  padding: "4px 8px",
  borderRadius: "4px",
  backgroundColor: "#2c3e50",
  color: "white",
  fontSize: "0.85rem",
};

const statusStyle = {
  padding: "4px 12px",
  borderRadius: "20px",
  fontWeight: "bold",
  fontSize: "0.85rem",
};
