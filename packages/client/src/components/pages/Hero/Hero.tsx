import {Button, Container, Group, Text, useMantineTheme} from "@mantine/core";
import {FunctionComponent} from "react";
import {Link} from "react-router-dom";
import {GITHUB_URL} from "../../../constants";
import './Hero.css';

export const Hero: FunctionComponent = () => {
	const theme = useMantineTheme();

	return (
		<div className={'hero__wrapper'}>
			<Container size={700} className={'hero__inner'}>
				<h1 className={'hero__title'}>
					PrioriTea,
					<br/>
					a{" "}
					<Text
						component="span"
						variant="gradient"
						gradient={{
							// @ts-ignore
							from: theme.colors[theme.primaryColor][
								theme.colorScheme === "dark" ? 7 : 5
								],
							// @ts-ignore
							to: theme.colors[theme.primaryColor][
								theme.colorScheme === "dark" ? 5 : 7
								],
						}}
						inherit
					>
						fully featured
					</Text>{" "}
					productivity tool
				</h1>

				<Text className={'hero__description'} color="dimmed">
					Prioritize your day to day, with sorting, filtering,
					searching, and pagination. Because productivity is our{" "}
					<Text
						component="span"
						variant="gradient"
						gradient={{
							// @ts-ignore
							from: theme.colors[theme.primaryColor][
								theme.colorScheme === "dark" ? 7 : 5
								],
							// @ts-ignore
							to: theme.colors[theme.primaryColor][
								theme.colorScheme === "dark" ? 5 : 7
								],
						}}
						inherit
					>
						cup of tea.
					</Text>
				</Text>

				<Group className={'hero__controls'}>
					<Button
						component={Link}
						to={`/sign-up`}
						size="xl"
						className={'hero__control'}
						variant="gradient"
						gradient={{
							// @ts-ignore
							from: theme.colors[theme.primaryColor][
								theme.colorScheme === "dark" ? 7 : 5
								],
							// @ts-ignore
							to: theme.colors[theme.primaryColor][
								theme.colorScheme === "dark" ? 5 : 7
								],
						}}
					>
						Sign Up
					</Button>

					<Button
						component="a"
						href={`${GITHUB_URL}/PrioriTea`}
						target="_blank"
						size="xl"
						variant="outline"
						className={'hero__control--github'}
					>
						GitHub
					</Button>
				</Group>
			</Container>
		</div>
	);
};
