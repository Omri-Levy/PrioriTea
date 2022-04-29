import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@prioritea/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BrandGoogle, BrandTwitter } from "tabler-icons-react";
import { ErrorAlert } from "../../ErrorAlert/ErrorAlert";
import { useSignUpMutation } from "./hooks/useSignUpMutation/useSignUpMutation";
import { FieldError } from "../../FieldError/FieldError";
import { ISignUpForm } from "./interfaces";

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

  // TODO Finalize loading state, disable button, etc.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        Welcome to PrioriTea, Sign Up with
      </Text>
      <Group grow mb="md" mt="md">
        <Button variant="filled" radius="xl" leftIcon={<BrandGoogle size={18} />}>
          Google
        </Button>
        <Button variant="filled" radius="xl" leftIcon={<BrandTwitter size={18} />}>
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
          <TextInput
            {...register("name")}
            label="Full Name"
            placeholder="Type here.."
            
          />
          <FieldError field={errors.name} />
          <PasswordInput
            {...register("password")}
            autoComplete="new-password"
            required
            label="Password"
            placeholder="Type here.."
            
          />
          <FieldError field={errors.password} />
          <PasswordInput
            {...register("passwordConfirmation")}
            autoComplete="new-password"
            required
            label="Password Confirmation"
            placeholder="Type here.."
            
          />
          <FieldError field={errors.passwordConfirmation} />
          <Checkbox
            {...register("tos")}
            label="I accept terms and conditions"
            
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
          {/* TODO Add loader */}
          <Button variant="filled" type="submit" style={{ textTransform: "capitalize" }}>
            Sign Up
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
