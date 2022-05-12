import {Title, Transition} from "@mantine/core";
import {FunctionComponent} from "react";
import {useIsMounted} from "../../hooks/useIsMounted/useIsMounted";
import {SectionProps} from "./interfaces";

export const Section: FunctionComponent<SectionProps> = ({
															 title,
															 children,
														 }) => {
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
					<Title order={1} className={'section__title'}>
						{title}
					</Title>
					{children}
				</section>
			)}
		</Transition>
	);
};
