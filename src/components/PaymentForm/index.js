import React, { useState } from 'react';
import FormFieldWithInlineError from '../FormFieldWithInlineError';
import {
    NAME_ON_CARD_FIELD_NAME,
    CC_NUMBER_FIELD_NAME,
    EXP_MONTH_FIELD_NAME,
    EXP_YEAR_FIELD_NAME, 
    CVV_FIELD_NAME, 
    PAYMENT_FIELDS,
    FIELD_VALIDATORS
} from './constants';
import './styles.scss';
import { isDateExpired } from '../../utils/FormValidators';

export default function PaymentForm(props) {
    const { onSuccess, onCancel } = props;
    const [fieldErrors, setFieldErrors] = useState(initEmptyFieldErrors());
    const currentYear = (new Date(Date.now())).getFullYear(); // used to generate year dropdown

    const validateForm = (formData) => {
        let isFormValid = true;
        const validationErrors = initEmptyFieldErrors();
        // validate each field with their own custom validator
        Object.keys(formData).map((key) => {
            const validate = FIELD_VALIDATORS[key];
            const error = validate(formData[key]);
            if (error) { 
                isFormValid = false;
                validationErrors[key] = error;
            }
            return formData[key];
        });
        // Check for expired date. Need thee joint values of year and month field.
        if (isDateExpired(formData[EXP_MONTH_FIELD_NAME], formData[EXP_YEAR_FIELD_NAME])) {
            isFormValid = false;
            validationErrors[EXP_MONTH_FIELD_NAME] = 'Expired.';
            validationErrors[EXP_YEAR_FIELD_NAME] = 'Expired.';
        }
        setFieldErrors(validationErrors);
        return isFormValid;
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // Gather form data
        const formData = {};
        for (let i = 0; i < PAYMENT_FIELDS.length; i++) {
            let fieldName = PAYMENT_FIELDS[i];
            formData[fieldName] = e.target.elements[fieldName].value || ''
        };
        // Send form if the form data is valid
        if (validateForm(formData)) {
            // In a realistic setting, should send this data to server side and check if payment 
            // is successful
            onSuccess(formData); // assuming this will always succeed
        }
    }

    return (
        <div className="form-wrapper">
            <form onSubmit={onSubmitHandler}>
                <fieldset>
                    <legend>Pay with Credit Card</legend>
                    <div className="row">
                        <FormFieldWithInlineError 
                            name={NAME_ON_CARD_FIELD_NAME} 
                            labelName={"Name on card"} 
                            error={fieldErrors[NAME_ON_CARD_FIELD_NAME]}
                            fullWidth={true}
                            >
                            <input 
                                type={"text"}
                                name={NAME_ON_CARD_FIELD_NAME}
                                aria-required={true}
                                maxLength={26}
                                aria-invalid={!!fieldErrors[NAME_ON_CARD_FIELD_NAME]}
                                className={"full-width"}
                            />
                        </FormFieldWithInlineError>
                    </div>
                    <div className="row">
                        <FormFieldWithInlineError 
                            name={CC_NUMBER_FIELD_NAME} 
                            labelName={"Card number"}
                            error={fieldErrors[CC_NUMBER_FIELD_NAME]}
                            fullWidth={true}
                            >
                            <input 
                                type={"text"}
                                name={CC_NUMBER_FIELD_NAME}
                                aria-required={true}
                                maxLength={19}
                                aria-invalid={!!fieldErrors[CC_NUMBER_FIELD_NAME]}
                                className={"full-width"}
                            />
                        </FormFieldWithInlineError>
                    </div>
                    <div className="row">
                        <FormFieldWithInlineError 
                            name={CVV_FIELD_NAME} 
                            labelName={"CVV"} 
                            error={fieldErrors[CVV_FIELD_NAME]}
                            >
                            <input 
                                type={"text"}
                                name={CVV_FIELD_NAME}
                                aria-required={true}
                                maxLength={4}
                                aria-invalid={!!fieldErrors[CC_NUMBER_FIELD_NAME]}
                            />
                        </FormFieldWithInlineError>
                        <FormFieldWithInlineError 
                            name={EXP_MONTH_FIELD_NAME} 
                            labelName={"Exp. Month"} 
                            error={fieldErrors[EXP_MONTH_FIELD_NAME]}
                            >
                            <select name={EXP_MONTH_FIELD_NAME}>
                                {/* create month options in dropdown */}
                                {[...Array(12)].map((x, i) => {
                                    let month = (i+1 < 10) ? `0${i+1}` : `${i+1}`; // plus one since index starts from 0
                                    return (<option value={month} key={month}>{month}</option>)
                                })} 
                            </select>
                        </FormFieldWithInlineError>
                        <FormFieldWithInlineError
                            name={EXP_YEAR_FIELD_NAME} 
                            labelName={"Year"} 
                            error={fieldErrors[EXP_YEAR_FIELD_NAME]}
                            >
                            <select name={EXP_YEAR_FIELD_NAME}>
                                {/* create year options in dropdown */}
                                {[...Array(10)].map((x, i) => {
                                    let year = currentYear + i;
                                    return (<option value={year} key={year}>{year}</option>)
                                })} 
                            </select>
                        </FormFieldWithInlineError>
                    </div>
                    <div className="submit-wrapper">
                        <button className="secondary-button" onClick={onCancel}>Cancel</button>
                        <input type="submit" />
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

const initEmptyFieldErrors = () => ({
    [NAME_ON_CARD_FIELD_NAME]: '',
    [CC_NUMBER_FIELD_NAME]: '',
    [EXP_MONTH_FIELD_NAME]: '',
    [EXP_YEAR_FIELD_NAME]: '',
    [CVV_FIELD_NAME]: ''
});