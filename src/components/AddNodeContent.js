import React from "react";
import {Field} from "react-final-form";
import {Checkbox, TextField} from "final-form-material-ui";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {FieldArray} from "react-final-form-arrays";
import AddNodeAttributes from "./AddNodeAttributes";
import Button from "@material-ui/core/Button";
import WhenFieldChanges from "./WhenFieldChanges";

const required = value => (value ? undefined : "Required");

const AddNodeContent = ({name, index, removeAttr, push, isHtmlNode, isSingleNode, isNotInsertNode = false}) => {
        const htmlNode = name ? `${name}.htmlNode` : 'htmlNode';
        const singleNode = name ? `${name}.singleNode` : 'singleNode';
        const nameField = name ? `${name}.name` : 'name';
        const attributes = name ? `${name}.attributes` : 'attributes';
        const content = name ? `${name}.content` : 'content';
        return (
            <div key={index}>
                    <WhenFieldChanges
                        field={htmlNode}
                        becomes={false}
                        set={singleNode}
                        to={false}
                    />
                    <WhenFieldChanges
                        field={htmlNode}
                        becomes={false}
                        set={nameField}
                        to={''}
                    />

                    <Field
                        fullWidth
                        required={isHtmlNode}
                        name={nameField}
                        component={TextField}
                        validate={isHtmlNode ? required : undefined}
                        disabled={isNotInsertNode || !isHtmlNode}
                        type="text"
                        label="название ноды"
                    />

                    <FormControlLabel
                        label="htmlNode"
                        control={
                                <Field
                                    name={htmlNode}
                                    component={Checkbox}
                                    type="checkbox"
                                    disabled={isNotInsertNode}
                                />
                        }
                    />
                    <FormControlLabel
                        label="singleNode"
                        control={
                                <Field
                                    name={singleNode}
                                    component={Checkbox}
                                    disabled={isNotInsertNode || !isHtmlNode}
                                    type="checkbox"
                                />
                        }
                    />

                    <FieldArray name={attributes}>
                            {({ fields }) => fields.map((nameAttr, indexAttr) =>
                                <AddNodeAttributes
                                    key={`${nameAttr}-${indexAttr}`}
                                    name={nameAttr}
                                    index={indexAttr}
                                    fields={fields}
                                    disabled={isNotInsertNode || !isHtmlNode}
                                    removeAttr={removeAttr}
                                />)
                            }
                    </FieldArray>
                    {(isHtmlNode && isNotInsertNode && <Button
                        variant="contained"
                        onClick={() => push(attributes, {
                                name: '',
                                value: ''
                        })}
                    >
                            Добавить аттрибут
                    </Button>)}

                    <Field
                        fullWidth
                        name={content}
                        component={TextField}
                        type="text"
                        disabled={isNotInsertNode || isSingleNode}
                        label="Содержимое ноды"
                    />
            </div>
        )
};

export default AddNodeContent;
