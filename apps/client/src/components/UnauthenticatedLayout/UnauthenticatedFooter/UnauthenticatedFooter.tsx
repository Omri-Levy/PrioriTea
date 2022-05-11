import {FunctionComponent} from "react";
import {Footer, Group, Text} from "@mantine/core";
import {
	GITHUB_URL,
	HEADER_HEIGHT,
	LINKEDIN_URL,
	PORTFOLIO_URL
} from "../../../../constants";
import {BrandGithub, BrandLinkedin} from "tabler-icons-react";
import {IconLink} from "../../IconLink/IconLink";

export const UnauthenticatedFooter: FunctionComponent = () => {

	return (
		<Footer p="md" height={HEADER_HEIGHT}
				className={"app-shell__footer--unauthenticated"}>
			{/* Portfolio link */}
			<Text
				color="dimmed"
				size="sm"
				variant="link"
				component="a"
				href={PORTFOLIO_URL}
				target="_blank"
			>
				&copy; {new Date().getFullYear()} Omri Levy
			</Text>

			{/* Social links */}
			<Group spacing={0} position="right" noWrap>
				<IconLink
					href={LINKEDIN_URL}
					Icon={({size}) => (
						<BrandLinkedin size={size}/>
					)}
				/>
				<IconLink
					href={GITHUB_URL}
					Icon={({size}) => (
						<BrandGithub size={size}/>
					)}
				/>
			</Group>
		</Footer>
	);
}
