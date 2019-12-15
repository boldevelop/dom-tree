import React from "react";
import { TextField } from 'final-form-material-ui';
import { Form, Field } from "react-final-form";
import Button from "@material-ui/core/Button";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import AddNodeAttributes from "./AddNodeAttributes";
import AddNodeContent from "./AddNodeContent";

const onSubmit = async values => {
    console.log(values);
};
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

const AddNode = () => {
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
                <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="Имя ноды"
                />

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
                <Button
                    variant="contained"
                    onClick={() => push("attributes", {
                        name: '',
                        value: ''
                    })}
                >
                    Добавить аттрибут
                </Button>

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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => push("content", addNodeValue)}
                >
                    Добавить ноду
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
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
