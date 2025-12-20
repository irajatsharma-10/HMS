import {
  CalendarDays,
  CreditCard,
  Wrench,
  BedDouble,
  AlertTriangle,
  User
} from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      {/* ================= PROFILE SECTION ================= */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        
        {/* Photo */}
        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
          <User size={40} className="text-gray-500" />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Vikash Kumar</h1>
          <p className="text-gray-600">Student ID: HMS22104109</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
            <p><b>Room:</b> A101 (Single)</p>
            <p><b>Hostel:</b> Boys Hostel A</p>
            <p><b>Course:</b> B.Tech CSE</p>
            <p><b>Year:</b> 3rd Year</p>
            <p><b>Mobile No:</b>9905812623</p>

          </div>
        </div>
      </div>

      {/* ================= ACTION / INFO CARDS ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          {/* Room */}
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2">
              <BedDouble size={18} /> Room Details
            </div>
            <p className="text-sm">Room Number: <b>A101</b></p>
            <p className="text-sm">Single Occupancy</p>
          </div>

          {/* Payment */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-600 font-semibold mb-2">
              <CreditCard size={18} /> Payment Status
            </div>
            <p className="text-sm">Hostel Fee: <b className="text-red-600">Pending</b></p>
            <p className="text-sm">Mess Fee: Paid</p>
          </div>

          {/* Maintenance */}
          <div className="bg-yellow-50 rounded-lg p-4 cursor-pointer hover:shadow transition">
            <div className="flex items-center gap-2 text-yellow-700 font-semibold mb-2">
              <Wrench size={18} /> Maintenance
            </div>
            <p className="text-sm text-gray-700">
              Submit a maintenance request
            </p>
          </div>

          {/* Leave */}
          <div className="bg-purple-50 rounded-lg p-4 cursor-pointer hover:shadow transition">
            <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
              <CalendarDays size={18} /> Leave
            </div>
            <p className="text-sm text-gray-700">
              Apply for hostel leave
            </p>
          </div>

          {/* Discipline */}
          <div className="bg-red-50 rounded-lg p-4 cursor-pointer hover:shadow transition">
            <div className="flex items-center gap-2 text-red-600 font-semibold mb-2">
              <AlertTriangle size={18} /> Discipline
            </div>
            <p className="text-sm text-gray-700">
              No active cases
            </p>
          </div>

        </div>
      </div>

      {/* ================= PAYMENT SECTION ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Payments</h2>

        <div className="space-y-4">

          <h1>Will show payments pending</h1>

        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;
