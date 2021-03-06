import { useEffect, useState } from "react";

import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { Eye, EyeClosed } from "phosphor-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Form, Logo, PublicScreen } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "@services";
import {
  formatErrorMessage,
  formatPasswordResetCode,
  updatePasswordSchema,
} from "@utils";

import * as S from "./styles";

type FormType = {
  password: string;
  confirmPassword: string;
};

export function UpdatePassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [codeResetPassword, setCodeResetPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({ resolver: yupResolver(updatePasswordSchema) });

  useEffect(() => {
    const validateCode = async () => {
      try {
        const code = formatPasswordResetCode(location.search);
        await verifyPasswordResetCode(auth, code);
        setCodeResetPassword(code);
      } catch ({ message }) {
        if (message === "Firebase: Error (auth/invalid-action-code).")
          toast.error("Invalid action code.");
        else toast.error("An error has ocurred. Try it again later.");

        navigate("/", { replace: true });
      }
    };
    validateCode();
  }, []);

  useEffect(() => {
    if (errors.password?.message) {
      toast.warn(formatErrorMessage(errors.password.message));
      return;
    }
    if (errors.confirmPassword?.message) {
      toast.warn(formatErrorMessage(errors.confirmPassword.message));
    }
  }, [errors]);

  const updatePassword = async ({ password }: FormType) => {
    setIsLoading(true);
    try {
      await confirmPasswordReset(auth, codeResetPassword, password);
      toast.success("Password has been updated.");
      navigate("/", { replace: true });
    } catch (e) {
      toast.error("An error has ocurred. Try it again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicScreen>
      <S.Container>
        <Logo />
        <Form
          navigationButton={{ path: "/", text: "Exit", replace: true }}
          onSubmit={handleSubmit(updatePassword)}
          submitText="Update"
          isLoading={isLoading}
          title="Update password"
        >
          <S.PasswordContainer>
            <S.Input
              placeholder="Password"
              autoCapitalize="off"
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
              maxLength={20}
            />
            <S.EyeButton
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? <Eye size={32} /> : <EyeClosed size={32} />}
            </S.EyeButton>
          </S.PasswordContainer>
          <S.PasswordContainer>
            <S.Input
              autoCapitalize="off"
              placeholder="Confirm password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              {...register("confirmPassword")}
              maxLength={20}
            />
            <S.EyeButton
              type="button"
              onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
            >
              {isConfirmPasswordVisible ? (
                <Eye size={32} />
              ) : (
                <EyeClosed size={32} />
              )}
            </S.EyeButton>
          </S.PasswordContainer>
        </Form>
      </S.Container>
    </PublicScreen>
  );
}
