import {
  Alert,
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  List,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@prioritea/common";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, BrandGoogle, BrandTwitter } from "tabler-icons-react";
import { AuthApi } from "../../../api/auth-api";

export const iterableArray = (arr: any) => Array.isArray(arr) && arr.length > 0;

interface ErrorsListProps {
  field: string;
  errors: Array<{ message: string; field?: string }>;
  messages?: Array<string>;
}

interface ISignUpForm {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  tos: boolean;
}

export const useSignUpMutation = () => {
  return useMutation(
    ["signUp"],
    async ({ email, name, password, passwordConfirmation }: ISignUpForm) => {
      return AuthApi.signUp(email, name, password, passwordConfirmation);
    }
  );
};

export interface ErrorAlertProps {
  title?: string;
  children: ReactNode;
}

export const ErrorAlert: FunctionComponent<ErrorAlertProps> = ({
  title,
  children,
}) => {
  return (
    <Alert
      color="red"
      icon={<AlertCircle size={16} />}
      variant="outline"
      title={title}
      mb={10}
    >
      {children}
    </Alert>
  );
};

interface FieldErrorProps {
  field:
    | {
        message?: string;
      }
    | undefined;
}

export const FieldError: FunctionComponent<FieldErrorProps> = ({ field }) => {
  if (!field) {
    return null;
  }

  return <ErrorAlert>{field.message}</ErrorAlert>;
};

export const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
      tos: false,
    },
  });
  const navigate = useNavigate();
  const { mutateAsync, isLoading, isError } = useSignUpMutation();
  const onSubmit: SubmitHandler<ISignUpForm> = async function ({
    email,
    name,
    password,
    passwordConfirmation,
    tos,
  }) {
    await mutateAsync({
      email,
      name,
      password,
      passwordConfirmation,
      tos,
    });

    navigate("/sign-in");
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        Welcome to PrioriTea, Sign Up with
      </Text>
      <Group grow mb="md" mt="md">
        <Button radius="xl" leftIcon={<BrandGoogle size={18} />}>
          Google
        </Button>
        <Button radius="xl" leftIcon={<BrandTwitter size={18} />}>
          Twitter
        </Button>
      </Group>
      <Divider label="Or continue with email" labelPosition="center" my="lg" />
      {isError && (
        <ErrorAlert title="Something went wrong..">
          Please refresh this page or try again later. If the problem persists
          please contact us.
        </ErrorAlert>
      )}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Group direction="column" grow>
          <TextInput
            {...register("email")}
            required
            label="Email"
            placeholder="Type here.."
            onChange={(event) => event}
          />
          <FieldError field={errors.email} />
          <TextInput
            {...register("name")}
            label="Full Name"
            placeholder="Type here.."
            onChange={(event) => event}
          />
          <FieldError field={errors.name} />
          <PasswordInput
            {...register("password")}
            autoComplete="new-password"
            required
            label="Password"
            placeholder="Type here.."
            onChange={(event) => event}
          />
          <FieldError field={errors.password} />
          <PasswordInput
            {...register("passwordConfirmation")}
            autoComplete="new-password"
            required
            label="Password Confirmation"
            placeholder="Type here.."
            onChange={(event) => event}
          />
          <FieldError field={errors.passwordConfirmation} />
          <Checkbox
            {...register("tos")}
            label="I accept terms and conditions"
            onChange={(event) => event}
          />
        </Group>

        <Group position="apart" mt="xl">
          <Anchor
            component={Link}
            type="button"
            color="gray"
            to="/sign-in"
            size="xs"
          >
            Already have an account? Sign In!
          </Anchor>
          <Button type="submit" style={{ textTransform: "capitalize" }}>
            Sign Up
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
