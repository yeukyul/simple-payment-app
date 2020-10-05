import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import PaymentForm from '../../components/PaymentForm';
import InvoiceStatusContext from '../../context/InvoiceStatusContext';
import { useHistory } from 'react-router';
import BasePageLayout from '../../components/BasePageLayout';
import { 
    CC_NUMBER_FIELD_NAME, 
    NAME_ON_CARD_FIELD_NAME, 
    CVV_FIELD_NAME, 
    EXP_MONTH_FIELD_NAME, 
    EXP_YEAR_FIELD_NAME 
} from '../../components/PaymentForm/constants';
import './styles.scss';

export default function PaymentView() {
    const query = useLocation().search;
    const invoiceId = new URLSearchParams(query).get("invoiceId");
    const invoiceStatus = useContext(InvoiceStatusContext);
    const { invoiceList } = invoiceStatus;
    const invoiceDetails = invoiceList.find(invoice => invoice.invoiceId === invoiceId);
    const { vendorName, balance, currency } = invoiceDetails;
    const history = useHistory();

    const [isConfirmationView, setIsConfirmationView] = useState(false);
    const [paymentInformation, setPaymentInformation] = useState({});

    const formSubmissionHandler = (formData) => {
        setIsConfirmationView(true);
        setPaymentInformation(formData);
    }

    const submitPaymentHandler = (formData) => {
        const { paidInvoices } = invoiceStatus;
        invoiceStatus.setPaidInvoices([...paidInvoices, invoiceId]);
        history.push('/'); // navigate to home
    }

    return (
        <BasePageLayout
            viewName="payment"
            iconClass={isConfirmationView ? "far fa-check-circle" : "far fa-credit-card"}
            >
            {isConfirmationView ? 
                (
                    <>
                        <h1>Are you sure?</h1>
                        <p>{currency} {balance} will be charged to the following card.</p>
                        <div className="summary">
                            <div>
                                <b>Name on card: </b>{paymentInformation[NAME_ON_CARD_FIELD_NAME]}
                            </div>
                            <div>
                                <b>Card number: </b>{paymentInformation[CC_NUMBER_FIELD_NAME]}
                            </div>
                            <div>
                                <b>CVV: </b>{paymentInformation[CVV_FIELD_NAME]}
                            </div>
                            <div>
                                <b>Expiration date: </b>{paymentInformation[EXP_MONTH_FIELD_NAME]}/{paymentInformation[EXP_YEAR_FIELD_NAME]}
                            </div>
                        </div>
                        <div className="submit-wrapper">
                            <button className="secondary-button" onClick={() => { setIsConfirmationView(false) }}>Go Back</button>
                            <button className="primary-button" onClick={submitPaymentHandler}>Submit</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Pay with Credit Card</h1>
                        <p>Send {currency} {balance} to {vendorName}.</p>
                        <PaymentForm 
                            onSuccess={formSubmissionHandler}
                            onCancel={() => { history.push('/') }} // going back to homepage
                            />
                    </>
                )}
        </BasePageLayout>
    );
}