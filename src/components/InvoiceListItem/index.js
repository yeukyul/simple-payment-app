import React from 'react';
import './styles.scss';

export default function InvoiceListItem(props) {
    let { invoiceId, vendorName, balance, currency, onClickHandler, paid } = props;
    return (
        <div className="invoice-list-item">
            <span className="vendor-name">{vendorName}</span>
            <span className="balance">{currency} {balance}</span>
            <span className="invoice-status">
                {paid ?
                    (<span className="paid-text">PAID</span>) :
                    (<button className="primary-button" value={invoiceId} onClick={onClickHandler}>Pay Now</button>)}
            </span>
        </div>
    );
}