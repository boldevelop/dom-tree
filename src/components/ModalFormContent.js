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
import {Checkbox, TextField} from "final-form-material-ui";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import WhenFieldChanges from "./WhenFieldChanges";

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
        insertNode: false,
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
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openModal}>
                <Paper className={classes.paper}>
                    <Box mb={1}>
                        <Typography variant="h5" component="h3" color="secondary">
                            Редактирование контента
                        </Typography>
                    </Box>
                    <Box width={1} mb={2}>
                        <Typography>
                            Для того чтобы внедрить
                            ноду в текст, в нужное место строки необходимо вставить '&lt;&gt;'
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
                                           submitting,
                                           values
                                       }) => <form
                                onSubmit={(e) => handleSubmit(e)}
                                noValidate
                                autoComplete='off'
                            >
                                <WhenFieldChanges
                                    field={'insertNode'}
                                    becomes={false}
                                    set={'name'}
                                    to={''}
                                />
                                <WhenFieldChanges
                                    field={'insertNode'}
                                    becomes={false}
                                    set={'content'}
                                    to={''}
                                />
                                <WhenFieldChanges
                                    field={'insertNode'}
                                    becomes={false}
                                    set={'attributes'}
                                    to={[]}
                                />
                                <Box mb={4}>
                                    <Field
                                        fullWidth
                                        required
                                        name="inContent"
                                        component={TextField}
                                        type="text"
                                        label="Редактируемая строка"
                                    />
                                    <FormControlLabel
                                        label="Вставить ноду в текст?"
                                        control={
                                            <Field
                                                name='insertNode'
                                                component={Checkbox}
                                                type="checkbox"
                                            />
                                        }
                                    />
                                </Box>

                                <AddNodeContent
                                    index={id}
                                    push={push}
                                    isHtmlNode={values.htmlNode}
                                    isSingleNode={values.singleNode}
                                    removeAttr={removeAttribute}
                                    isNotInsertNode={!values.insertNode}
                                />
                                <Box mt={4}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        Применить
                                    </Button>
                                </Box>
                            </form>}
                        />
                    </Box>
                </Paper>
            </Fade>
        </Modal>
    )
};
