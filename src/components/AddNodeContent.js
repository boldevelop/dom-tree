import React from "react";
import {Field} from "react-final-form";
import {Checkbox, TextField} from "final-form-material-ui";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {FieldArray} from "react-final-form-arrays";
import AddNodeAttributes from "./AddNodeAttributes";
import Button from "@material-ui/core/Button";
import WhenFieldChanges from "./WhenFieldChanges";

const required = value => (value ? undefined : "Required");

const AddNodeContent = ({name, index, removeAttr, push, isHtmlNode, isSingleNode}) => (
    <div key={index}>
        <WhenFieldChanges
            field={`${name}.htmlNode`}
            becomes={false}
            set={`${name}.singleNode`}
            to={false}
        />
        <WhenFieldChanges
            field={`${name}.htmlNode`}
            becomes={false}
            set={`${name}.name`}
            to={''}
        />

        <Field
            fullWidth
            required
            name={`${name}.name`}
            component={TextField}
            validate={isHtmlNode ? required : undefined}
            disabled={!isHtmlNode}
            type="text"
            label="название ноды"
        />

        <FormControlLabel
            label="htmlNode"
            control={
                <Field
                    name={`${name}.htmlNode`}
                    component={Checkbox}
                    type="checkbox"
                />
            }
        />
        <FormControlLabel
            label="singleNode"
            control={
                <Field
                    name={`${name}.singleNode`}
                    component={Checkbox}
                    disabled={!isHtmlNode}
                    type="checkbox"
                />
            }
        />

        <FieldArray name={`${name}.attributes`}>
            {({ fields }) => fields.map((nameAttr, indexAttr) =>
                <AddNodeAttributes
                    key={`${nameAttr}-${indexAttr}`}
                    name={nameAttr}
                    index={indexAttr}
                    fields={fields}
                    disabled={!isHtmlNode}
                    removeAttr={removeAttr}
                />)
            }
        </FieldArray>
        {(isHtmlNode && <Button
            variant="contained"
            onClick={() => push(`${name}.attributes`, {
                name: '',
                value: ''
            })}
        >
            Добавить аттрибут
        </Button>)}

        <Field
            fullWidth
            name={`${name}.content`}
            component={TextField}
            type="text"
            disabled={isSingleNode}
            label="Содержимое ноды"
        />
    </div>
);

export default AddNodeContent;
