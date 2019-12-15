import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {Field} from "react-final-form";
import {TextField} from "final-form-material-ui";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const required = value => (value ? undefined : "Required");

const AddNodeAttributes = ({name, index, removeAttr, fields, disabled}) => (
    <Box mt={2} mb={2}>
        <Grid container justify="space-between">
            <Grid item xs={5}>
                <Field
                    fullWidth
                    required
                    name={`${name}.name`}
                    component={TextField}
                    validate={required}
                    disabled={disabled}
                    type="text"
                    label="Имя аттрибута"
                />
            </Grid>
            <Grid item xs={5}>
                <Field
                    fullWidth
                    name={`${name}.value`}
                    component={TextField}
                    disabled={disabled}
                    type="text"
                    label="значение аттрибута"
                />
            </Grid>
            {(!disabled && <Grid item xs={1} justify="center" container>
                <IconButton
                    onClick={() => removeAttr(index, fields)}
                    color="secondary"
                    aria-label="delete attributes"
                    component="span"
                >
                    <CloseIcon color="secondary" />
                </IconButton>
            </Grid>)}
        </Grid>
    </Box>
);

export default AddNodeAttributes;
