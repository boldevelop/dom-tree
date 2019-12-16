import React from "react";
import { TextField} from 'final-form-material-ui';
import { Form, Field } from "react-final-form";
import Button from "@material-ui/core/Button";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import AddNodeAttributes from "./AddNodeAttributes";
import AddNodeContent from "./AddNodeContent";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }
    return errors;
};
const removeAttribute = (i, fields) => fields.remove(i);
const initialValues = {
    name: 'div',
    htmlNode: true,
    attributes: [
        {
            name: "class",
            value: ''
        }
    ],
    content: [
        {
            name: 'a',
            attributes: [
                {
                    name: "class",
                    value: ''
                }
            ],
            htmlNode: true,
            singleNode: false
        }
    ]
};
const addNodeValue = {
    name: 'span',
    attributes: [
        {
            name: "class",
            value: ''
        }
    ],
    htmlNode: true,
    singleNode: false
};

const AddNode = ({updateNodes}) => {
    const onSubmit = async values => {
        console.log('submit');
        updateNodes(values);
    };
    return (
        <Form
            onSubmit={onSubmit}
            mutators={{
                ...arrayMutators
            }}
            initialValues={initialValues}
            validate={validate}
            render = {({
                           handleSubmit,
                           form: {
                               mutators: { push }
                           },
                           submitting,
                           values
            }) => <form onSubmit={(e) => handleSubmit(e)} noValidate autoComplete='off'>
                <Box mb={4}>
                    <Typography variant="h5" color="secondary">
                        Форма создания корневого узла
                    </Typography>
                </Box>
                <Box mb={4}>
                    <Field
                        fullWidth
                        required
                        name="name"
                        component={TextField}
                        type="text"
                        label="Имя ноды"
                    />
                </Box>

                <Box mb={4} border={1} borderRadius={4} borderColor='text.secondary' p=".7rem">
                    <Typography variant="h6" color="secondary">
                        Аттрибуты
                    </Typography>
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
                    <Box mt={3}>
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
                </Box>

                <Box mb={4} border={1} borderRadius={4} borderColor='text.secondary' p=".7rem">
                    <Typography variant="h6" color="secondary">
                        Контент внутри корневого узла
                    </Typography>
                    <FieldArray name="content">
                        {({ fields }) =>
                            fields.map((name, index) =>
                                <AddNodeContent
                                    key={`${name}-${index}`}
                                    name={name}
                                    index={index}
                                    push={push}
                                    isHtmlNode={values.content[index].htmlNode}
                                    isSingleNode={values.content[index].singleNode}
                                    removeAttr={removeAttribute}
                                />)
                        }
                    </FieldArray>
                    <Box mt={3}>
                        <Button
                            size="small"
                            color="secondary"
                            onClick={() => push("content", addNodeValue)}
                        >
                            Добавить ноду
                        </Button>
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    size="large"
                    disabled={submitting}
                >
                    Создать
                </Button>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>}
        />
    )
};

export default AddNode;
