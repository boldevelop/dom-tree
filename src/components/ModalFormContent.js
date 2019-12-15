import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Field, Form} from "react-final-form";
import arrayMutators from "final-form-arrays";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddNodeContent from "./AddNodeContent";
import {TextField} from "final-form-material-ui";

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }
    return errors;
};
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
const removeAttribute = (i, fields) => fields.remove(i);

export const ModalFormContent = ({openModal, handleClose, id, content}) => {
    const classes = useStyles();
    const onSubmit = async values => {
        handleClose(values);
    };
    const initialValues = {
        inContent: content,
        name: 'a',
        attributes: [
            {
                name: "class",
                value: ''
            }
        ],
        htmlNode: true,
        singleNode: false
    };
    return (
        <Modal
            className={classes.modal}
            open={openModal}
            onClose={() => handleClose()}
            closeAfterTransition
            BackdropComponent={Backdrop}
            disableBackdropClick={false}
            disableEscapeKeyDown={false}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openModal}>
                <Paper className={classes.paper}>
                    <Box mb={2}>
                        <Typography variant="h5" component="h3">
                            Редактирование аттрибутов
                        </Typography>
                    </Box>
                    <Box width={1} mb={2}>
                        <Form
                            onSubmit={onSubmit}
                            initialValues={initialValues}
                            validate={validate}
                            mutators={{
                                ...arrayMutators
                            }}
                            render = {({
                                           handleSubmit,
                                           form: {
                                               mutators: { push }
                                           },
                                           submitting
                                       }) => <form onSubmit={(e) => handleSubmit(e)} noValidate autoComplete='off'>
                                <Field
                                    fullWidth
                                    required
                                    name="inContent"
                                    component={TextField}
                                    type="text"
                                    label="Строка внедрения"
                                />
                                <AddNodeContent
                                    index={id}
                                    push={push}
                                    isHtmlNode={true}
                                    isSingleNode={false}
                                    removeAttr={removeAttribute}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={submitting}
                                >
                                    Применить
                                </Button>
                            </form>}
                        />
                    </Box>
                </Paper>
            </Fade>
        </Modal>
    )
};
