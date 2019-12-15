import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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

export const NodeName = ({name, updateName}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [stateName, setName] = useState(name);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        if (!stateName) {
            return;
        }
        setOpen(false);
        if (stateName !== name) {
            updateName(stateName);
        }
    };

    return (
        <Box width={1} onClick={(e) => e.stopPropagation()}>
            <Typography
                variant={stateName === 'textNode' ? 'h6' : 'h4'}
                gutterBottom onClick={(e) => handleOpen(e)}
                color={stateName === 'textNode' ? 'textSecondary' : 'textPrimary'}
            >
                {stateName}
            </Typography>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper className={classes.paper}>
                        <Box mb={2}>
                            <Typography variant="h5" component="h3">
                                Редактирование имени ноды
                            </Typography>
                        </Box>
                        <Box width={1} mb={2}>
                            <TextField
                                fullWidth
                                type="text"
                                variant="outlined"
                                autoFocus={true}
                                error={!stateName}
                                defaultValue={stateName}
                                onChange={e => setName(e.target.value)}
                                label="Новое имя"
                            />
                        </Box>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleClose}
                        >
                            Применить
                        </Button>
                    </Paper>
                </Fade>
            </Modal>
        </Box>
    )
};
