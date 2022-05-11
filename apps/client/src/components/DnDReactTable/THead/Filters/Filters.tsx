import {Fragment, FunctionComponent, useMemo} from "react";
import {Group} from "@mantine/core";
import {FiltersProps} from "./interfaces";

export const Filters: FunctionComponent<FiltersProps> = (props) => {
    const {headerGroups, visibleColumnsLength} = props;
    const colsWithFilter = useMemo(() => headerGroups
        .flatMap(({headers}) => headers)
        .filter((c) => !c.disableFilters), [headerGroups]);

    return (
        <tr>
            <th colSpan={visibleColumnsLength}>
                Filters
                <Group>
                    {colsWithFilter?.map((c) => (
                        <Fragment key={c.getHeaderProps().key}>
                            {c.render("Filter")}
                        </Fragment>
                    ))}
                </Group>
            </th>
        </tr>
    );
}
