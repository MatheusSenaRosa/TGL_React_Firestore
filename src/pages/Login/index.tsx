import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Eye, EyeClosed } from "phosphor-react";

import { Logo, Screen, Form } from "@components";
import { auth } from "@services";
import { formatErrorMessage, loginSchema } from "@utils";

import * as S from "./styles";

type FormType = {
  email: string;
  password: string;
};

export function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (errors.email?.message) {
      toast.warn(formatErrorMessage(errors.email.message));
      return;
    }
    if (errors.password?.message) {
      toast.warn(formatErrorMessage(errors.password.message));
    }
  }, [errors]);

  const loginHandler = async ({ email, password }: FormType) => {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You are logged in!");
    } catch (e: any) {
      if (e.message === "Firebase: Error (auth/user-not-found).") {
        toast.error("This account do not exists.");
        return;
      }
      toast.error("An error has ocurred. Try to reload the page.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <S.Container>
        <Logo />
        <Form
          isLoading={isLoading}
          onSubmit={handleSubmit(loginHandler)}
          title="Authentication"
          buttonText="Log In"
          forgotPassword
        >
          <S.Input placeholder="Email" {...register("email")} />
          <S.PasswordContainer>
            <S.Input
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
              maxLength={20}
              {...register("password")}
            />
            <S.EyeButton
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? <Eye size={32} /> : <EyeClosed size={32} />}
            </S.EyeButton>
          </S.PasswordContainer>
        </Form>
      </S.Container>
    </Screen>
  );
}
