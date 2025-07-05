import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../../Core/url";
import { ShowError } from "../../../Core/Toast";

export const useLoginHook = () => {
  const validations = z.object({
    userId: z.string().min(3, "Username is required"),
    password: z.string().min(3, "Password is required"),
    // Captcha: z.string().min(6, "Captcha is required"),
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validations),
  });
  const [passType, setPassType] = useState("password");
  const togglePassType = () => {
    setPassType((prev) => (prev === "password" ? "text" : "password"));
  };
  console.log(errors);

  const submitForm = async (data) => {
    console.log(data);

    try {
      const response = await API.post("/manager/login", data);

      const { role, token } = response.data;

      localStorage.setItem("role", role);
      localStorage.setItem("token", token);

      if (role == "monitoring") {
        navigate("/tracking-employee");
      } else if (role === "verificationTeam") {
        navigate("/");
      } else if (role === "manager") {
        navigate("/");
      } else if (role === "support") {
        navigate("/live-chat");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        ShowError(error.response.data.message);
      } else {
        ShowError(error.message);
      }
    }
  };

  return {
    register,
    handleSubmit,
    passType,
    togglePassType,
    submitForm,
    validations,
    errors,
  };
};
