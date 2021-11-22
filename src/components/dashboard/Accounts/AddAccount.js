import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../../../store/actions";

function AddAccount(props) {
  let issuer = useSelector((state) => state.issuer);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  // const [program, setProgram] = useState("");
  const [id, setId] = useState("");
  const [amount, setAmount] = useState(100);
  // const [members, setMembers] = useState(0);
  const [error, setError] = useState("All fields are required");

  const onName = (e) => {
    if (e.target.value) {
      setName(e.target.value);
      // let selected = issuer.filter(item=> item.name === e.target.value);
      // setProgram(selected[0].program)
      // console.log(issuer)
    } else {
      setError("Account name cannot be empty");
    }
  };

  // const onProgram = (e) => {
  //   if (e.target.value) {
  //     setProgram(e.target.value);
  //   } else {
  //     setError("Program name cannot be empty");
  //   }
  // };

  const onId = (e) => {
    if (e.target.value) {
      setId(e.target.value);
    } else {
      setError("Customer Address cannot be empty");
    }
  };

  // const onAmount = (e) => {
  //   if (e.target.value) {
  //     setAmount(e.target.value);
  //   } else {
  //     setError("Amount cannot be empty");
  //   }
  // };
  // const onMembers = (e) => {
  //   if (e.target.value) {
  //     setMembers(e.target.value);
  //   } else {
  //     setError("Members cannot be empty");
  //   }
  // };

  const onSubmit = () => {
    if (name.trim() === "") {
      setError("Accounts name cannot be empty");
    }
    //  else if (program.trim() === "") {
      // setError("Program name cannot be empty");
    // } 
    else if (id.trim() === "") {
      setError("Loyalty ID cannot be empty");
    } 
    // else if (!amount) {
    //   setError("Amount cannot be empty");
    // } 
    else {
      let tempdata = {
        issuer: name,
        // program,
        id,
        points: amount,
      };
      dispatch(addAccount(tempdata));
      props.handleClose();
      setError("");
    }
  };
  return (
    <>
      <Modal.Header>
        <Modal.Title>Add Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Issuer Name</label>
          <select className="form-select" onChange={onName} value={name} aria-label="Default select example">
          <option value=''></option>
          {issuer.map((e, key) => {
              return <option key={key} value={e.name}>{e.name}</option>;
            })}
        </select>
        </div>
        {/* <div className="mb-3 flex-row">
          <label className="form-label fw-bold">Program Name: </label>
            <span className="ms-2">{program && program}</span>
        </div> */}
        <div className="mb-3 ">
          <label className="form-label">Loyalty Id</label>
            <input
              type="text"
              className="form-control"
              value={id}
              onChange={onId}
            />
        </div>
        {/* <div className="mb-3 ">
          <label htmlFor="inputMembers" className="form-label">
            Members
          </label>
            <input
              type="number"
              className="form-control"
              id="inputMembers"
              value={members}
              onChange={onMembers}
            />
        </div> */}
        {/* <div className="mb-3 ">
          <label htmlFor="inputAmount" className="form-label">
            Loyalty
          </label>
            <input
              type="number"
              className="form-control"
              id="inputAmount"
              value={amount}
              onChange={onAmount}
            />
        </div> */}
        {error ? <p className="text-danger">{error}</p> : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </>
  );
}

export default AddAccount;
