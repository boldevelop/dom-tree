import React from "react";
import {Box} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export const NodeAttributes = ({attrs, id}) => {
    return (
        <Box width={1}>
            <Typography variant="caption" gutterBottom>
                Аттрибуты
            </Typography>
            <Divider />
            <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
                width={1}
                wrap="wrap"
            >
            {attrs.map((attr, i) => (
                <Box key={`${id}-${i}`}>
                    <Typography variant="overline" gutterBottom>
                        {attr.name}
                    </Typography>
                    =
                    <Typography variant="overline" gutterBottom>
                        {attr.value}
                    </Typography>
                    {i === attrs.length - 1 ? null : ' | &nbsp;'}
                </Box>
            ))}
            </Grid>
        </Box>
    )
};
