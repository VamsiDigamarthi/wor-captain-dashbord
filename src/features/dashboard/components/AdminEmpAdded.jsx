import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import Input from "../../../utils/Input";
import SelectInput from "../../../utils/SelectInput";
import { ShowError, SuccessFully } from "../../../Core/Toast";
import { API } from "../../../Core/url";

const initialState = {
  userName: "",
  email: "",
  mobile: "",
  dob: "",
  userId: "",
  password: "",
  role: "",
};

const roles = ["support", "monitoring", "verificationTeam"];

const AdminEmpAdded = ({ setIsDrawer, getEmployees }) => {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};

    if (!form.userName.trim()) newErrors.userName = "Full name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email.";
    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = "Enter valid 10-digit number.";
    if (!form.dob.trim()) newErrors.dob = "Date of birth is required.";
    if (!form.userId.trim()) newErrors.userId = "User ID is required.";
    if (!form.password.trim()) newErrors.password = "Password is required.";
    if (!form.role.trim()) newErrors.role = "Please select a role.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    setForm(initialState);
    setErrors({});
  };

  const handleSubmit = async () => {
    console.log("Form submitted:", form);
    if (!validate()) return;
    // API call here
    try {
      const response = await API.post("/manager/add-employee", form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.status == 200 || response.status == 201) {
        SuccessFully("Created New Employee");
        setIsDrawer(false);
        getEmployees({ page: 1 });
        handleClear();
      }
    } catch (error) {
      console.log("error", error);

      if (axios.isAxiosError(error)) {
        ShowError(error.response.data.message || "Something Went Wrong");
      } else {
        ShowError(error.message || "Error in API CALL");
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col gap-4 relative">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[#EA4C89]">
          Add New Employee
        </h2>
        <X className="cursor-pointer" onClick={() => setIsDrawer(false)} />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="Full Name"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          error={errors.userName}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Mobile Number"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          error={errors.mobile}
        />
        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
          error={errors.dob}
        />
        <Input
          label="User ID"
          name="userId"
          value={form.userId}
          onChange={handleChange}
          error={errors.userId}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <div className="md:col-span-2">
          <SelectInput
            label="Assign Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={roles}
            error={errors.role}
          />
        </div>
      </div>

      <div className="absolute bottom-3 right-3 w-full flex justify-end items-end gap-4">
        <button
          onClick={handleClear}
          className="cursor-pointer w-[150px] h-[45px] border border-[#EA4C89] text-[#EA4C89] rounded-md text-sm font-semibold"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          className="cursor-pointer px-6 h-[45px] bg-[#EA4C89] text-white rounded-md text-sm font-semibold"
        >
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default AdminEmpAdded;
