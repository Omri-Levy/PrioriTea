import {Avatar, Container, Group, Paper, Text} from "@mantine/core";
import {noNullish} from "@prioritea/utils";
import {FunctionComponent} from "react";
import {
	useUserInfoQuery
} from "../SignIn/hooks/useUserInfoQuery/useUserInfoQuery";
import {SomethingWentWrong} from "../../SomethingWentWrong/SomethingWentWrong";
import './Account.css';

export const Account: FunctionComponent = () => {
	const {data: user, isError, isLoading} = useUserInfoQuery();

	if (isError) {
		return <SomethingWentWrong/>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}


	return (
		<Container>
			<Paper
				withBorder
				className={"account__paper"}
			>
				<Group noWrap>
					<Avatar
						// src={avatar}
						size={94} radius="md"/>
					<div>
						<Text
							size="xs"
							sx={{textTransform: 'uppercase'}}
							weight={700} color="dimmed"
						>
							{/* {user?.createdAt} */}
						</Text>

						<Text
							size="lg"
							weight={500}
							className={'account__name'}
						>
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
