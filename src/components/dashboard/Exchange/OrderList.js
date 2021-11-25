import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap';
import {
  loadWeb3,
  loadAccount,
  loadPearlZZExchange
} from '../../../store/interactions'
import { addBuy, addSell } from "../../../store/actions";

function OrderList(props) {
  let buydata = useSelector((state) => state.buy);
  let selldata = useSelector((state) => state.sell);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let buy =
    [{
      issuer: 'UAL',
      orderid: 'BWN12345',
      points: 250,
    },
    {
      issuer: 'Walmart',
      orderid: 'BWL4395',
      points: 560,
    },
    {
      issuer: 'Starbucks',
      orderid: 'BSB459867',
      points: 306,
    },
    {
      issuer: 'Walmart',
      orderid: 'BSB867dC49',
      points: 500,
    }];

  let sell =
    [{
      issuer: 'UAL',
      orderid: 'SWN12345',
      points: 5000,
    },
    {
      issuer: 'Walmart',
      orderid: 'SWL4395',
      points: 5007,
    },
    {
      issuer: 'Starbucks',
      orderid: 'SSB459867',
      points: 606,
    },
    {
      issuer: 'Walmart',
      orderid: 'SSB867dC49',
      points: 505,
    }]
  const [modaldata, setmodaldata] = useState({})
  const [ordertype, setordertype] = useState('');
  const clicked = (e, item, type) => {
    setmodaldata(item);
    setordertype(type);
    console.log(modaldata, ordertype)
    handleShow()
  }


  useEffect(async () => {
    fetchData();
  }, []);

  async function fetchData() {
    console.log('fetch');
    const web3 = await loadWeb3(dispatch)
    const networkId = await web3.eth.net.getId()
    const accounttemp = await loadAccount(web3, dispatch)
    const tempExchange = await loadPearlZZExchange(web3, networkId, dispatch)
    console.log("pearlzzExchange::order.js", tempExchange);
    if (buydata.length <1 ) {
      tempExchange && buy.map( (buy, index) => {
        try {
          tempExchange.methods.buyPoints(buy.issuer, (12345 + index).toString(), 'admin', buy.points)
          .send({ from: accounttemp }).on('transactionHash', (hash) => {
            dispatch(addBuy(buy));
         		window.alert("Transaction Hash for the Buy Points Order transaction is:[", hash, "].");
         		console.log("Transaction Hash for the Buy Points Order transaction is:[", hash, "].");
          })
        } catch {
					window.alert("Error occurred while submitting a new Buy Points order")
					console.log("Error occurred while submitting a new Buy Points order")
        }
           

      })
     
      tempExchange && sell.map( (sell, index) => {
        try {
        tempExchange.methods.buyPoints(sell.issuer, (12345 + index).toString(), 'admin', sell.points)
        .send({ from: accounttemp }).on('transactionHash', (hash) => {
          dispatch(addSell(sell));
         	window.alert("Transaction Hash for the Sell Points Order transaction is:[", hash, "].");
         	console.log("Transaction Hash for the Sell Points Order transaction is:[", hash, "].");
        })
      } catch {
					window.alert("Error occurred while submitting a new Sell Points order")
					console.log("Error occurred while submitting a new Sell Points order")
      }

  })
    }
  }

  return (
    <>
      <ul className="list-group list-group-flush col-md-8 mt-5 mx-auto">
        <h5>Buy Orders</h5>
        <li className="list-group-item text-white bg-dark d-flex justify-content-between">
          <span className="fw-bold">Account</span>
          <span className="fw-bold">
            Points
          </span>
        </li>
        {buydata.map((item, index) => {
          return (
            <li key={index} className="list-group-item text-success bg-dark d-flex justify-content-between"
              role="button" onClick={(e) => clicked(e, item, 'Buy')}>
              <span>  <i className="bi bi-box-arrow-in-down-left me-2"></i> {item.issuer}</span>
              <span className="badge bg-secondary text-dark rounded-pill">
                {item.points}
              </span>
            </li>
          );
        })}

      </ul>
      <hr />

      <ul className="list-group list-group-flush col-md-8 mt-5 mx-auto">
        <h5>Sell Orders</h5>
        <li className="list-group-item text-white bg-dark d-flex justify-content-between"
        >
          <span className="fw-bold">Account</span>
          <span className="fw-bold">
            Points
          </span>
        </li>
        {selldata.map((item, index) => {
          return (
            <li key={index} className="list-group-item text-danger bg-dark d-flex justify-content-between"
              role="button" onClick={(e) => clicked(e, item, 'Sell')}>
              <span>  <i className="bi bi-box-arrow-up-right  me-2"></i> {item.issuer}</span>
              <span className="badge bg-secondary text-dark rounded-pill">
                {item.points}
              </span>
            </li>
          );
        })}

      </ul>
      {ordertype ?
        <Modal show={show} onHide={handleClose}>

          <Modal.Header >
            <Modal.Title>{ordertype}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>You have selected to fulfill a {ordertype} order from account <b>{modaldata.issuer}</b> of <b>{modaldata.points}</b> points.</p>
            <b>Do you confirm?</b>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>Confirm Order</Button>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>

          </Modal.Footer>
        </Modal> : null

      }

    </>


  );
}

export default OrderList;



