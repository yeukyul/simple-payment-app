import { 
    validateName, 
    validateCardNumber, 
    validateCvv, 
    validateMonth, 
    validateYear 
} from '../../utils/FormValidators';

export const NAME_ON_CARD_FIELD_NAME = 'name';
export const CC_NUMBER_FIELD_NAME = 'cardNumber';
export const EXP_MONTH_FIELD_NAME = 'expMonth';
export const EXP_YEAR_FIELD_NAME = 'expYear';
export const CVV_FIELD_NAME = 'CVV';
export const PAYMENT_FIELDS = [
    NAME_ON_CARD_FIELD_NAME, 
    CC_NUMBER_FIELD_NAME, 
    EXP_YEAR_FIELD_NAME, 
    EXP_MONTH_FIELD_NAME, 
    CVV_FIELD_NAME
];

export const FIELD_VALIDATORS = {
    [NAME_ON_CARD_FIELD_NAME]: validateName,
    [CC_NUMBER_FIELD_NAME]: validateCardNumber,
    [EXP_MONTH_FIELD_NAME]: validateMonth,
    [EXP_YEAR_FIELD_NAME]: validateYear,
    [CVV_FIELD_NAME]: validateCvv
};
