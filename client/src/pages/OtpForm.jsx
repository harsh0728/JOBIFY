import React, { useRef, useState, useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/BigSidebar";
import { FormRow, Logo, SubmitBtn } from "../components";
import axios from "axios";
import customFetch from "../utils/customFetch";
import PasswordForm from "./PasswordForm";

const OtpForm = () => {
  const navigate = useNavigate(); // Assuming navigate is needed elsewhere
  const [email, setEmail] = useState("");
  const [form, setForm] = useState(true);

  const sendOtp = async () => {
    try {
      console.log(email);
      const response = await customFetch.post("/auth/emailSend", { email });

      const record = response.data.response;
      if (record.statusText === "success") {
        // Pass the generated OTP to sendEmail function

        setForm((prevForm) => !prevForm);
        toast.success(record.message);
      } else {
        toast.error(record.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    console.log("otpForm:", form); // Track otpForm changes
  }, [form]);

  return (
    <Wrapper>
      {form ? (
        <Form method="post" className="form">
          <Logo />
          <FormRow
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" className="btn btn-block" onClick={sendOtp}>
            Send Otp
          </button>

          <button type="button" className="btn btn-block">
            <Link to="/login">Back</Link>
          </button>
        </Form>
      ) : (
        <PasswordForm email={email} />
      )}
    </Wrapper>
  );
};

export default OtpForm;
