import {
	Button,
	Container,
	SimpleGrid,
	Text,
	Title,
	useMantineTheme
} from "@mantine/core";
import './SomethingWentWrong.css';

export const SomethingWentWrong = () => {
	const theme = useMantineTheme();

	return (
		<Container>
			<SimpleGrid
				spacing={80}
				cols={2}
				breakpoints={[{maxWidth: 'sm', cols: 1, spacing: 40}]}
			>
				<div>
					<Title className={'something-went-wrong__title'}>Something
						went
						wrong...</Title>
					<Text color="dimmed" size="lg" mb={"1rem"}>
						Please refresh this page, or try again later. If the
						problem persists, please contact us.
					</Text>
					<Button
						size="md"
						onClick={() => {
							document.location.reload();
						}}
					>
						Refresh the page
					</Button>
				</div>
				<Text
					component={"h1"}
					className={`something-went-wrong__code`}
					variant={"gradient"}
					// @ts-ignore
					gradient={{
						// @ts-ignore
						from: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5],
						// @ts-ignore
						to: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 7]
					}}
				>
					500
				</Text>
			</SimpleGrid>
		</Container>
	);
}
