import React, { useState } from "react";
import { Link, Form, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

const PasswordForm = (props) => {
  const navigate = useNavigate();

  // State hooks for form inputs
  const [otpcode, setOtpcode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SubmitButton = async () => {
    try {
      const response = await customFetch.post("/auth/changePassword", {
        email: props.email,
        otpcode: otpcode,
        password: password,
      });

      const record = response.data.response;
      if (record.statusText === "success") {
        navigate("/login");
        toast.success(record.message);
      } else {
        toast.error(record.message);
      }
    } catch (err) {
      console.error("Error:", err); // Log the error to the console
      toast.error("Something went wrong");
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Reset Password</h4>
        <FormRow
          type="number"
          name="otpcode"
          value={otpcode}
          onChange={(e) => {
            setOtpcode(e.target.value);
          }}
        />
        <FormRow
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormRow
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="button" className="btn btn-block" onClick={SubmitButton}>
          Change Password
        </button>
        <button type="button" className="btn btn-block">
          <Link to="/login">Back</Link>
        </button>
      </Form>
    </Wrapper>
  );
};

export default PasswordForm;
