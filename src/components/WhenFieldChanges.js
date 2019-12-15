import {Field, FormSpy} from "react-final-form";
import {OnChange} from "react-final-form-listeners";
import React from "react";

const WhenFieldChanges = ({ field, becomes, set, to }) => (
    <Field name={set} subscription={{}}>
        {(
            // No subscription. We only use Field to get to the change function
            { input: { onChange } }
        ) => (
            <FormSpy subscription={{}}>
                {({ form }) => (
                    <OnChange name={field}>
                        {value => {
                            if (value === becomes) {
                                onChange(to);
                            }
                        }}
                    </OnChange>
                )}
            </FormSpy>
        )}
    </Field>
);

export default WhenFieldChanges;
