import {createStyles, Title, Transition} from "@mantine/core";
import {FunctionComponent, useEffect, useRef} from "react";
import {IChildren} from "../../interfaces";

interface SectionProps extends IChildren {
	title: string;
}

export const useIsMountedRef = () => useRef(false);
export const useIsMounted = () => {
	const isMounted = useIsMountedRef();

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	return isMounted;
};

export const Section: FunctionComponent<SectionProps> = ({
															 title,
															 children,
														 }) => {
	const useStyles = createStyles((theme) => ({
		root: {
			textTransform: "capitalize",
			marginBottom: theme.spacing.xl,
			display: 'inline-block',
			borderBottom: '5px solid',
			// @ts-ignore
			borderColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
		},
	}));
	const {classes} = useStyles();
	const isMounted = useIsMounted();

	return (
		<Transition
			transition={{
				in: {opacity: 1},
				out: {opacity: 0},
				transitionProperty: 'opacity',
			}}
			mounted={isMounted.current}
			duration={75}
			timingFunction={'ease'}
		>
			{(styles) => (
				<section style={styles}>
					<Title order={1} className={classes.root}>
						{title}
					</Title>
					{children}
				</section>
			)}
		</Transition>
	);
};
