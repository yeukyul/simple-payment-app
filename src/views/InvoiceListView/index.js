import React, { useContext } from 'react';
import InvoiceListItem from '../../components/InvoiceListItem';
import InvoiceStatusContext from '../../context/InvoiceStatusContext';
import { useHistory } from 'react-router';
import './styles.scss';

export default function InvoiceListView() {
    const invoiceStatus = useContext(InvoiceStatusContext);
    const { paidInvoices, invoiceList } = invoiceStatus;
    const history = useHistory();
    const payNowClickHandler = (e) => {
        history.push(`/payment?invoiceId=${e.target.value}`); // navigate with react routere
    }

    return (
        <div className="invoice-view view">
            <div className="page-icon">
                <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <h1>Outstanding Invoices</h1>
            <div className="invoice-list-wrapper">
                {invoiceList.map((value, index) => (
                    <InvoiceListItem 
                        {...value} 
                        onClickHandler={payNowClickHandler}
                        key={index}
                        paid={paidInvoices.includes(value.invoiceId)}
                        />
                ))}
            </div>
        </div>
    );
}