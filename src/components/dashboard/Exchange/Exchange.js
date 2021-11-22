import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab } from 'react-bootstrap';
import Transactions from './Transactions';
import Buy from './Buy';
import Sell from './Sell';

function Exchange() {
  let issuer = useSelector((state) => state.issuer);
  console.log('issuers',issuer)
  return (
    <div className="container-fluid ">
      <div className="row">
        <Tabs defaultActiveKey="buy" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="buy" title="Buy">
            <Buy list={issuer} />
          </Tab>
          <Tab eventKey="sell" title="Sell">
            <Sell list={issuer} />
          </Tab>
        </Tabs>
        <div className="row">
          <Transactions />
        </div>
      </div>
    </div>
  );
}

export default Exchange;