import {FunctionComponent} from "react";
import {ActionIcon} from "@mantine/core";
import {IconLinkProps} from "./types";

/**
 * Wraps an icon with mantine's ActionIcon component as an anchor with an href, and target. Accepts ActionIcon props, making overriding the size default size of "lg" possible.
 * @param props
 * @constructor
 */
export const IconLink: FunctionComponent<IconLinkProps> = (props) => {
    const {href, Icon, ...rest} = props;

    return (
        <ActionIcon
            size="lg"
            component="a"
            href={href}
            target="_blank"
            {...rest}
        >
            <Icon size={20}/>
        </ActionIcon>
    );
}
