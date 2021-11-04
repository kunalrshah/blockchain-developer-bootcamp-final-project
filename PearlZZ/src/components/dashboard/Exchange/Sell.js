import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSell } from "../../../store/actions";
import {
  loadWeb3,
  loadAccount,
  loadPearlZZExchange
} from '../../../store/interactions'

function Sell(props) {
  let accounts = useSelector(state=>state.accounts)
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [accountID, setAccountID] = useState('')
  const dispatch = useDispatch();
  const onName = (e) => {
    if (e.target.value) {
      setName(e.target.value);
      console.log(accounts.filter((account)=>account.issuer == e.target.value)[0])
      setAccountID((accounts.filter((account)=>account.issuer == e.target.value))[0].id)
    } else {
      setError("Account name cannot be empty");
    }
  };
   const onAmount = (e) => {
    if (e.target.value) {
      setAmount(e.target.value);
    } else {
      setError("Loyalty Amount cannot be empty");
    }
  };
  const onSubmit = async () => {
    if (name.trim() === "") {
      setError("Accounts name cannot be empty");
    }
    else if (!amount) {
      setError("Amount cannot be empty");
    } 
    else {
      let tempdata = {
        issuer: name,
        points: amount,
        orderid: accountID+amount
      };
      const web3 = await loadWeb3(dispatch)
    const networkId = await web3.eth.net.getId()
    const accounttemp = await loadAccount(web3, dispatch)
    const tempExchange = await loadPearlZZExchange(web3, networkId, dispatch)
    console.log("pearlzzExchange::sell.js", tempExchange);
       
          console.log(tempdata.issuer, accountID.toString(), 'admin', tempdata.points)
          tempExchange.methods.sellPoints(tempdata.issuer, accountID.toString(), 'admin', tempdata.points)
          .send({ from: accounttemp }).on('transactionHash', (hash) => {
            dispatch(addSell(tempdata));
          })
      
          setError("Error While Buy");
        
    }

    
    setError("");
      }

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Issuer Name</label>
        <select className="form-select" onChange={onName} value={name} aria-label="Default select example">
          <option value=''></option>
          {props.list.map((e, key) => {
            return <option key={key} value={e.name}>{e.name}</option>;
          })}
        </select>
      </div>
      {accountID ? <p><b>Loyalty ID:</b> {accountID}</p>:null}
      <div className="mb-3 ">
          <label htmlFor="inputAmount" className="form-label">
            No of Points
          </label>
            <input
              type="number"
              className="form-control"
              id="inputAmount"
              value={amount}
              onChange={onAmount}
            />
        </div>
        {error ? <p className="text-danger">{error}</p> : null}
      <button className="btn btn-secondary col-sm-6 mb-3" onClick={onSubmit}>Confirm Sell</button>
    </>
  );
}

export default Sell;



