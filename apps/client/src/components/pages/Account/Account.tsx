import {
	Avatar,
	Container,
	createStyles,
	Group,
	Paper,
	Text
} from "@mantine/core";
import {noNullish} from "@prioritea/utils";
import {FunctionComponent} from "react";
import {
	useUserInfoQuery
} from "../SignIn/hooks/useUserInfoQuery/useUserInfoQuery";
import {SomethingWentWrong} from "../Tasks/Tasks";

export const Account: FunctionComponent = () => {
	const {data: user, isError, isLoading} = useUserInfoQuery();
	const useStyles = createStyles((theme) => ({
		icon: {
			color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
		},

		name: {
			fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		},
	}));
	const {classes} = useStyles();

	if (isError) {
		return <SomethingWentWrong/>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}


	return (
		<Container>
			<Paper
				radius="md"
				withBorder
				p="lg"
				sx={(theme) => ({
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
				})}
			>
				<Group noWrap>
					<Avatar
						// src={avatar}
						size={94} radius="md"/>
					<div>
						<Text size="xs" sx={{textTransform: 'uppercase'}}
							  weight={700} color="dimmed">
							{/* {user?.createdAt} */}
						</Text>

						<Text size="lg" weight={500} className={classes.name}>
							{noNullish`${user?.name}`}
						</Text>


						<Text size="xs" color="dimmed">
							{noNullish`${user?.email}`}
						</Text>

					</div>
				</Group>
			</Paper>
		</Container>
	);
};
