import { zodResolver } from "@hookform/resolvers/zod";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput
} from "@mantine/core";
import { signInSchema } from "@prioritea/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BrandGoogle, BrandTwitter } from "tabler-icons-react";
import { ErrorAlert } from "../../ErrorAlert/ErrorAlert";
import { FieldError } from "../../FieldError/FieldError";
import { useSignInMutation } from "./hooks/useSignInMutation/useSignInMutation";
import { ISignInForm } from "./interfaces";

export const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { mutateAsync, isLoading, isError } = useSignInMutation();
  const onSubmit: SubmitHandler<ISignInForm> = async function ({
    email,
    password,
  }) {
    await mutateAsync({
      email,
      password,
    });

    navigate("/");
  };

  // TODO Finalize loading state, disable button, etc.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        Welcome to PrioriTea, Sign In with
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
            
          />
          <FieldError field={errors.email} />
          <PasswordInput
            {...register("password")}
            autoComplete="new-password"
            required
            label="Password"
            placeholder="Type here.."
            
          />
          <FieldError field={errors.password} />
          <Checkbox
            label="Remember password"
            
          />
        </Group>

        <Group position="apart" mt="xl">
          <Anchor
            component={Link}
            type="button"
            color="gray"
            to="/sign-up"
            size="xs"
          >
            Don't have an account? Sign up!
          </Anchor>
          {/* TODO Add loader */}
          <Button type="submit" style={{ textTransform: "capitalize" }}>
            Sign In
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
