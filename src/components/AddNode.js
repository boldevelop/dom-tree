import React from "react";
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

class AddNode extends React.Component {
    render() {
        return (
            <Box width={1} height={1} mt={5}>
                <Grid container justify='center' alignItems='center'>
                    <form noValidate autoComplete="off">
                        <TextField id="node-name" label="Имя элемента" variant="outlined" />
                    </form>
                </Grid>
            </Box>
        )
    }
}

export default AddNode;
