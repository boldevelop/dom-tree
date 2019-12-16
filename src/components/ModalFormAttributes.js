import React from "react";
import {Form} from "react-final-form";
import AddNodeAttributes from "./AddNodeAttributes";
import {FieldArray} from "react-final-form-arrays";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import arrayMutators from "final-form-arrays";

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

export const ModalFormAttributes = ({attrs, openModal, handleClose}) => {
    const classes = useStyles();
    const onSubmit = async values => {
        handleClose(values.attributes);
    };
    const initialValues = {
        attributes: attrs
    };
    return (
        <Modal
            className={classes.modal}
            open={openModal}
            onClose={() => handleClose()}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openModal}>
                <Paper className={classes.paper}>
                    <Box mb={3}>
                        <Typography variant="h5" component="h3" color="secondary">
                            Редактирование аттрибутов
                        </Typography>
                    </Box>
                    <Box width={1} mb={2}>
                        <Form
                            onSubmit={onSubmit}
                            initialValues={initialValues}
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
                                <FieldArray name="attributes">
                                    {({ fields }) =>
                                        fields.map((name, index) =>
                                            <AddNodeAttributes
                                                key={`${name}-${index}`}
                                                name={name}
                                                index={index}
                                                fields={fields}
                                                disabled={false}
                                                removeAttr={removeAttribute}
                                            />)
                                    }
                                </FieldArray>
                                <Box mt={1} mb={3}>
                                    <Button
                                        size="small"
                                        color="secondary"
                                        onClick={() => push("attributes", {
                                            name: '',
                                            value: ''
                                        })}
                                    >
                                        Добавить аттрибут
                                    </Button>
                                </Box>
                                <Button
                                    variant="outlined"
                                    color="secondary"
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
