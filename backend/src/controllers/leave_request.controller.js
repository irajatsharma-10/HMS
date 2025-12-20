import LeaveRequest from "../models/leave_request.model.js";
import Student from "../models/student_profile.model.js";
import User from "../models/user.model.js";


// Create leave request (student only)
const createLeaveRequest = async (req, res) => {
  try {
    const user_id = req.user._id; 
    console.log("user_id",user_id)
    const { from_date, to_date, destination, reason } = req.body;

    /* -------------------- Basic Validation -------------------- */
    if (!from_date || !to_date) {
      return res.status(400).json({
        success: false,
        message: "From date and to date are required"
      });
    }

    if (!destination?.trim() || !reason?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Destination and reason are required"
      });
    }

    /* -------------------- Date Helpers -------------------- */
    const normalizeDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-").map(Number)
      return new Date(year,month-1,day)
    };

    const fromDate = normalizeDate(from_date);
    const toDate = normalizeDate(to_date);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    /* -------------------- Date Validation -------------------- */
    if (!fromDate || !toDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format"
      });
    }

    if (fromDate < today) {
      return res.status(400).json({
        user_id,
        success: false,
        message: "From date cannot be in the past"
      });
    }

    if (toDate < fromDate) {
      return res.status(400).json({
        success: false,
        message: "To date must be same as or after from date"
      });
    }

    /* -------------------- Optional Rules -------------------- */

    // // Max leave duration (e.g., 30 days)
    // const MAX_LEAVE_DAYS = 30;
    // const leaveDays =
    //   (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

    // if (leaveDays > MAX_LEAVE_DAYS) {
    //   return res.status(400).json({
    //     success: false,
    //     message: `Leave duration cannot exceed ${MAX_LEAVE_DAYS} days`
    //   });
    // }



    /* -------------------- Student Check -------------------- */
    const student = await Student.findOne({user_id});
    console.log(student)
    if (!student) {
      return res.status(404).json({
        student,
        success: false,
        message: "Student profile not found. Please create your profile first"
      });
    }

    /* -------------------- Overlap Check -------------------- */
    const overlappingLeave = await LeaveRequest.findOne({
      student_id: student._id,
      status: { $in: ["pending", "approved"] },
      from_date: { $lte: toDate },
      to_date: { $gte: fromDate }
    });

    if (overlappingLeave) {
      return res.status(409).json({
        success: false,
        message: "You already have a leave request for this period"
      });
    }

    /* -------------------- Create Leave -------------------- */
    const leaveRequest = await LeaveRequest.create({
      student_id: student._id,
      from_date: fromDate,
      to_date: toDate,
      destination: destination.trim(),
      reason: reason.trim(),
      status: "pending"
    });

    /* -------------------- Populate Response -------------------- */
    await leaveRequest.populate({
      path: "student_id",
      select: "sid branch room_number block",
      populate: {
        path: "user_id",
        select: "full_name email phone"
      }
    });

    return res.status(201).json({
      success: true,
      message: "Leave request created successfully",
      leaveRequest
    });

  } catch (error) {
    console.error("CREATE LEAVE REQUEST ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create leave request"
    });
  }
};

// Get all leave requests (with filters)
const getAllLeaveRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, student_id } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build query
    const query = {};

    // Students can only see their own requests
    if (req.user.role === "student") {
      const student = await Student.findOne({ user_id: req.user._id });
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student profile not found"
        });
      }
      query.student_id = student._id;
    } else if (student_id) {
      // Admin/staff can filter by student
      const student = await Student.findOne({ user_id: student_id });
      if (student) {
        query.student_id = student._id;
      }
    }

    if (status && ["pending", "approved", "rejected"].includes(status)) {
      query.status = status;
    }

    // Optimized: Get leave requests with populated data in single query
    const leaveRequests = await LeaveRequest.find(query)
      .populate({
        path: "student_id",
        select: "sid branch room_number block",
        populate: {
          path: "user_id",
          select: "full_name email phone"
        }
      })
      .populate("approved_by", "full_name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await LeaveRequest.countDocuments(query);

    return res.status(200).json({
      success: true,
      leaveRequests,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      },
      message: "Leave requests fetched successfully"
    });

  } catch (error) {
    console.error("GET ALL LEAVE REQUESTS", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch leave requests"
    });
  }
};

// Get single leave request
const getLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const leaveRequest = await LeaveRequest.findById(id)
      .populate({
        path: "student_id",
        select: "sid branch room_number block",
        populate: {
          path: "user_id",
          select: "full_name email phone"
        }
      })
      .populate("approved_by", "full_name email role");

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found"
      });
    }

    // Check access: students can only see their own requests
    if (req.user.role === "student") {
      const student = await Student.findOne({ user_id: req.user._id });
      if (!student || leaveRequest.student_id._id.toString() !== student._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }
    }

    return res.status(200).json({
      success: true,
      leaveRequest,
      message: "Leave request fetched successfully"
    });

  } catch (error) {
    console.error("GET LEAVE REQUEST", error);
    
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid leave request ID"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leave request"
    });
  }
};

// Update leave request status (admin/staff only)
const updateLeaveRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validation
    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'approved' or 'rejected'"
      });
    }

    const leaveRequest = await LeaveRequest.findById(id);

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found"
      });
    }

    // Check if already processed
    if (leaveRequest.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Leave request has already been ${leaveRequest.status}`
      });
    }

    // Update status
    leaveRequest.status = status;
    leaveRequest.approved_by = req.user._id;
    await leaveRequest.save();

    // Populate data for response
    await leaveRequest.populate({
      path: "student_id",
      select: "sid branch room_number block",
      populate: {
        path: "user_id",
        select: "full_name email phone"
      }
    });
    await leaveRequest.populate("approved_by", "full_name email role");

    return res.status(200).json({
      success: true,
      leaveRequest,
      message: `Leave request ${status} successfully`
    });

  } catch (error) {
    console.error("UPDATE LEAVE REQUEST STATUS", error);
    
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid leave request ID"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update leave request status"
    });
  }
};

// Delete leave request (student can delete pending, admin/staff can delete any)
const deleteLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const leaveRequest = await LeaveRequest.findById(id);

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found"
      });
    }

    // Check access
    if (req.user.role === "student") {
      const student = await Student.findOne({ user_id: req.user._id });
      if (!student || leaveRequest.student_id.toString() !== student._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }

      // Students can only delete pending requests
      if (leaveRequest.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: "You can only delete pending leave requests"
        });
      }
    }

    await LeaveRequest.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Leave request deleted successfully"
    });

  } catch (error) {
    console.error("DELETE LEAVE REQUEST", error);
    
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid leave request ID"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete leave request"
    });
  }
};

export {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequest,
  updateLeaveRequestStatus,
  deleteLeaveRequest
};

