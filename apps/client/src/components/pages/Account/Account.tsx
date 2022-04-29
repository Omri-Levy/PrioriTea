import {Paper, Avatar, createStyles, Group, Text } from "@mantine/core";
import { FunctionComponent } from "react";
import { useUserInfoQuery } from "../../../api/useUserInfoQuery";

export const Account: FunctionComponent = () => {
  const {data: user} = useUserInfoQuery();
  const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));


    const { classes } = useStyles();


  return (
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
         size={94} radius="md" />
        <div>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {/* {user?.createdAt} */}
          </Text>

          <Text size="lg" weight={500} className={classes.name}>
            {user?.name}
          </Text>

    
    
            <Text size="xs" color="dimmed">
              {user?.email}
            </Text>
    
        </div>
      </Group>
    </Paper>
  );
};
