import React from "react";
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import {Box} from "@material-ui/core";
import {ModalFormContent} from "./ModalFormContent";
import Button from "@material-ui/core/Button";

const Node = ({content, index, id, setContent}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {
        e.stopPropagation();
        setOpen(true);
    };
    const changeContent = (values) => {
        if (values) {
            setContent(id, values, index);
        }
        setOpen(false);
    };
    return <Box width={1} mb={1}>
        <Card onClick={(e) => handleOpen(e)}>
            {content.length ? (
                <Box p={3}>
                    <Typography color="textSecondary">{content}</Typography>
                </Box>
            ) : (
                <Box p={3}>
                    <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onClick={() => (e) => handleOpen(e)}
                    >
                        Добавить контент
                    </Button>
                </Box>
            )}
            <ModalFormContent openModal={open} handleClose={changeContent} content={content}/>
        </Card>
    </Box>
};

export default Node;
