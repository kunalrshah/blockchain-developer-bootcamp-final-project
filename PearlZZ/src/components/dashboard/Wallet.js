import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import AddAccount from "./Accounts/AddAccount";
import Accounts from "./Accounts/Accounts";

function Wallet(props) {
  let data = useSelector((state) => state.accounts);
  // let issuerdata = useSelector((state) => state.issuer);
  let wallet = data.reduce((accum, item) => accum + item.points, 0)
  // let prlz = data.reduce((accum, item) => {
    
  //   let res = accum + item.points*item.ppvalue;
  //   console.log(res,  item.points, item.ppvalue)
  //   return res
  // }, 0)
  // console.log('prlz', prlz)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showAccounts, setShowAccount] = useState(false)
  const addAccountClick = () => {
    setShowAccount(false)
    handleShow()
  }

  return (
    <div className="Wallet ">
      <div className="d-flex flex-row align-items-center justify-content-start"> 
        <p className="px-3 fs-3 mb-0 fw-lighter">PearlZZ Wallet</p>
        <div className="d-flex flex-column ms-3">
        <span className="fs-1 fw-light text-center p-2 "> {wallet}</span>
        {/* <span></span> */}
        {/* <div className="d-flex flex-row mt-3 border-top">
        <span className="badge bg-primary me-3">${prlz?prlz.toFixed(2) : 0}</span> 
         <span className="badge bg-secondary"> {prlz?prlz.toFixed(2) : 0} <small> PRLZ</small></span>
        </div> */}
       
        </div>
        
        
      </div>
      
      <Button variant="outline-primary" className="ms-auto me-0 d-flex" onClick={addAccountClick}>
          <i className="bi bi-plus-circle me-3"></i> Add Accounts
        </Button>
      <Accounts data={data} />
      <Modal show={show} onHide={handleClose} size={showAccounts ? 'lg' : 'md'} >
        <AddAccount handleClose={handleClose} />
      </Modal>
    </div>
  );
}

export default Wallet;
