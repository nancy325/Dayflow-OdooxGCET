import User from "../models/User.js";
import Profile from "../models/Profile.js";
import bcrypt from "bcryptjs";

// Admin/HR: get all employees (and all users)
export const getAllEmployees = async (req, res) => {
  try {
    // Get all users except the requesting user if they want to filter
    const users = await User.find().select("-password");
    const employees = await Promise.all(
      users.map(async (user) => {
        const profile = await Profile.findOne({ userId: user._id });
        return {
          ...user.toObject(),
          profile: profile || null
        };
      })
    );
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: get employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    const profile = await Profile.findOne({ userId: user._id });
    const employee = {
      ...user.toObject(),
      profile: profile || null
    };
    
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: create new employee
export const createEmployee = async (req, res) => {
  try {
    const { email, password, name, department, phone, designation } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    
    // Hash password
    const hash = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
      email,
      password: hash,
      role: "employee"
    });
    
    // Create profile
    const profile = await Profile.create({
      userId: user._id,
      email,
      name,
      department,
      phone,
      designation: designation || "Employee"
    });
    
    const userResponse = await User.findById(user._id).select("-password");
    res.status(201).json({ user: userResponse, profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: update employee
export const updateEmployee = async (req, res) => {
  try {
    const { email, name, department, phone, designation, role } = req.body;
    const userId = req.params.id;
    
    // Update user if email or role provided
    if (email || role) {
      const updateData = {};
      if (email) updateData.email = email;
      if (role && ["employee", "hr", "admin"].includes(role)) {
        updateData.role = role;
      }
      
      await User.findByIdAndUpdate(userId, updateData);
    }
    
    // Update profile
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { name, department, phone, designation, email: email || undefined },
      { new: true, upsert: true }
    );
    
    const user = await User.findById(userId).select("-password");
    res.json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    // Don't allow deleting admin users
    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot delete admin user" });
    }
    
    // Delete profile and user
    await Profile.findOneAndDelete({ userId });
    await User.findByIdAndDelete(userId);
    
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

