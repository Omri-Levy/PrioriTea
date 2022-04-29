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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BrandGoogle, BrandTwitter } from "tabler-icons-react";
import { Link } from "react-router-dom";

export const SignIn = () => {
  const { handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (e) => {
    e.preventDefault();
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        Welcome to PrioriTea, sign in with
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Group direction="column" grow>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={""}
            onChange={(event) => event}
            error={"Invalid email"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={""}
            onChange={(event) => event}
            error={"Password should include at least 6 characters"}
          />

          <Checkbox
            label="Remember password"
            checked={true}
            onChange={(event) => event}
          />
        </Group>

        <Group position="apart" mt="xl">
          <Anchor
            component={Link}
            type="button"
            color="gray"
            size="xs"
            to="/sign-up"
          >
            Don't have an account? Sign Up!
          </Anchor>
          <Button type="submit" style={{ textTransform: "capitalize" }}>
            sign in
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
