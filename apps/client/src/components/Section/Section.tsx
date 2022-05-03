import { createStyles, Title } from "@mantine/core";
import { FunctionComponent, ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const Section: FunctionComponent<SectionProps> = ({
  title,
  children,
}) => {
  const useStyles = createStyles((theme) => ({
    root: {
      textTransform: "capitalize",
      marginBottom: theme.spacing.xl,
    },
  }));
  const { classes } = useStyles();

  return (
    <section>
      <Title order={1} className={classes.root}>
        {title}
      </Title>
      {children}
    </section>
  );
};
