import React from "react";
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import {Box} from "@material-ui/core";

const Node = ({content, index, id}) => {
    return <Box width={1} mb={1}>
        <Card>
            <Box p={3} onClick={() => console.log(id)}>
                <Typography color="textSecondary">{content}</Typography>
            </Box>
        </Card>
    </Box>
};

export default Node;
