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
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpSchema} from "@common/validation/sign-up-schema";
import { FunctionComponent } from "react";
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

export const SignUp = () => {
  const { handleSubmit, register } = useForm<ISignUpForm>({
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
  const { mutateAsync, isLoading, error } = useSignUpMutation();
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
  const theme = useMantineTheme();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const ErrorsList: FunctionComponent<ErrorsListProps> = ({
    field,
    errors,
    messages,
  }) => {
    if (!iterableArray(errors)) return null;

    return (
      <List
        size="xs"
        styles={{
          item: { color: theme.colors.red[6], lineHeight: 1.8 },
        }}
        icon={
          <ThemeIcon variant="light" color="error" size={20} radius="xl">
            <AlertCircle size={16} />
          </ThemeIcon>
        }
      >
        {errors
          .filter(
            (err) => err.field === field || messages?.includes(err.message)
          )
          .map((err) => {
            return <List.Item>{err.message}</List.Item>;
          })}
      </List>
    );
  };
  const unexpectedError =
    error &&
    (!iterableArray(
      // @ts-ignore
      error?.response?.data?.errors
    ) ||
      // @ts-ignore
      error?.response?.data?.errors?.filter(({ field }) => !field).length > 0);

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
      <>
        {unexpectedError && (
          <Alert
            color="red"
            icon={<AlertCircle size={16} />}
            variant="outline"
            title="Something went wrong.."
            mb={10}
          >
            Please refresh this page or try again later. If the problem persists
            please contact us.
          </Alert>
        )}
      </>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group direction="column" grow>
          <TextInput
            {...register("email")}
            required
            label="Email"
            placeholder="Type here.."
            onChange={(event) => event}
          />
          <ErrorsList
            field="email"
            // @ts-ignore
            errors={error?.response?.data?.errors}
            messages={["Email already in use"]}
          />
          <TextInput
            {...register("name")}
            label="Full Name"
            placeholder="Type here.."
            onChange={(event) => event}
          />
          <ErrorsList
            field="fullName"
            // @ts-ignore
            errors={error?.response?.data?.errors}
          />
          <PasswordInput
            {...register("password")}
            autoComplete="new-password"
            required
            label="Password"
            placeholder="Type here.."
            onChange={(event) => event}
          />
          <ErrorsList
            field="password"
            // @ts-ignore
            errors={error?.response?.data?.errors}
          />
          <PasswordInput
            {...register("passwordConfirmation")}
            autoComplete="new-password"
            required
            label="Password Confirmation"
            placeholder="Type here.."
            onChange={(event) => event}
          />
          <ErrorsList
            field="passwordConfirmation"
            // @ts-ignore
            errors={error?.response?.data?.errors}
          />
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
