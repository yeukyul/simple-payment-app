import React, { useState } from 'react';
import './App.scss'; 
import InvoiceListView from '../views/InvoiceListView';
import PaymentView from '../views/PaymentView';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import InvoiceStatusContext from '../context/InvoiceStatusContext';
import invoiceList from '../data/mockInvoiceData.json';

function App() {
  const [paidInvoices, setPaidInvoices] = useState([]);
  // Use context API to store a list of invoice ID that was paid.
  // Ideally, we should retrieve this information from server-side, 
  // but storing it here for the sake of this coding exercise
  return (
    <div className="App">
      <InvoiceStatusContext.Provider value={{paidInvoices, setPaidInvoices, invoiceList}}>
        <Router>
            <Switch>
              <Route exact path="/"><InvoiceListView /></Route>
              <Route exact path="/payment"><PaymentView /></Route>
            </Switch>
        </Router>
      </InvoiceStatusContext.Provider> 
    </div>
  );
}

export default App;
