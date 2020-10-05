
const NAME_REGEX = /[-a-zA-Z' ]{2,26}/;
const CC_NUM_REGEX = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
const NUMBER_ONLY = /^[0-9]+$/;

export const validateName = (value) => {
    if (!value) {
        return 'Field is empty.';
    }
    if (!NAME_REGEX.test(value)) {
        return 'Invalid character(s).';
    }
    return null;
}

export const validateCardNumber = (value) => {
    if (!value) {
        return 'Field is empty.';
    }
    if (value.length < 13) { // minimum length is 13
        return 'Your input is too short.';
    }
    if (!NUMBER_ONLY.test(value)) {
        return 'Invalid character(s).';
    }
    if (!CC_NUM_REGEX.test(value)) { // regex check for valid card number
        return 'Please check your credit card number.';
    }
    return null;
}

export const validateCvv = (value) => {
    if (!value) {
        return 'Field is empty.';
    }
    if (value.length < 3) { // minimum length is 3
        return 'Your input is too short.';
    }
    if (!NUMBER_ONLY.test(value)) {
        return 'Invalid character(s).';
    }
}

export const validateMonth = (value) => {
    if (!value) {
        return 'Field is empty.';
    }
    if (value.length !== 2) { // user shouldn't reach here
        return 'Invalid month.';
    }
    if (!NUMBER_ONLY.test(value)) {
        return 'Invalid character(s).';
    }
    return null;
}

export const validateYear = (value) => {
    if (!value) {
        return 'Field is empty.';
    }
    if (value.length !== 4) { // user shouldn't reach here
        return 'Invalid year.';
    }
    if (!NUMBER_ONLY.test(value)) {
        return 'Invalid character(s).';
    }
    return null;
}

/**
 * 
 * @param {*} month - string
 * @param {*} year - string
 */
export const isDateExpired = (month, year) => {
    const monthAsInt = parseInt(month);
    const yearAsInt = parseInt(year);
    const today = new Date(Date.now());
    const thisYear = today.getFullYear();
    if (yearAsInt < thisYear) return true;
    if (yearAsInt === thisYear && monthAsInt < today.getMonth()) return true;
    return false;
}