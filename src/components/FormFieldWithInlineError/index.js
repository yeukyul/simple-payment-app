import React from 'react';

/*
 * Higher order component for form fields. Displays inline messages and label
 */
export default function FormFieldWithInlineError(props) {
    const { labelName, name, error, fullWidth } = props;
    return (
        <div className={`form-field-wrapper ${error && 'has-error'} ${fullWidth && 'full-width'}`}>
            <label htmlFor={name}>{labelName}</label>
            {props.children}
            {error ? <div className="inline-error">{error}</div> : ''}
        </div>
    );
}