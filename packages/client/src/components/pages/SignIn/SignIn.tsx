import {zodResolver} from "@hookform/resolvers/zod";
import {
	Anchor,
	Button,
	Group,
	Paper,
	PasswordInput,
	TextInput,
} from "@mantine/core";
import {signInSchema} from "@prioritea/validation";
import {SubmitHandler, useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {ErrorAlert} from "../../ErrorAlert/ErrorAlert";
import {FieldError} from "../../FieldError/FieldError";
import {useSignInMutation} from "./hooks/useSignInMutation/useSignInMutation";
import {ISignInForm} from "./interfaces";

export const SignIn = () => {
	const {
		handleSubmit,
		register,
		formState: {errors},
	} = useForm<ISignInForm>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const {mutateAsync, isLoading, isError, error} = useSignInMutation();
	const onSubmit: SubmitHandler<ISignInForm> = async ({email, password}) =>
		mutateAsync({
			email,
			password,
		});

	const [{message}] = (error as any)?.response?.data?.errors ?? [{}];

	return (
		<Paper radius="md" p="xl" withBorder>
			{isError && (
				<ErrorAlert title="Something went wrong..">
					{message ??
						`Please refresh this page or try again later. If the problem persists, please contact us.`}
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
					<FieldError field={errors.email}/>
					<PasswordInput
						{...register("password")}
						required
						label="Password"
						placeholder="Type here.."
					/>
					<FieldError field={errors.password}/>
				</Group>

				<Group position="apart" mt="xl">
					<Anchor
						component={Link}
						type="button"
						color="gray"
						to="/sign-up"
						size="xs"
					>
						Don&apos;t have an account? Sign up!
					</Anchor>
					{/* TODO Add loader */}
					<Button
						loading={isLoading}
						variant="filled"
						type="submit"
						className={`capitalize`}
					>
						Sign In
					</Button>
				</Group>
			</form>
		</Paper>
	);
};
