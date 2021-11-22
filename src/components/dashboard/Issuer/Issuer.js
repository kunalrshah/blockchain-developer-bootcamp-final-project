import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addIssuer } from '../../../store/actions';
import SingleIssuer from './SingleIssuer';
import { Link } from 'react-router-dom'
import Navbar from '../../Navbar';
import {
  loadWeb3,
  loadAccount,
  loadPearlZZExchange
} from '../../../store/interactions'


function Issuer() {
  const initialState = [{
    name: 'United Airlines',
    address: '0x5eE8dDFa4a1Fb0a790dDF697A164C2C4fdC49Ead',
    loyalty: 25000000, // $2.5 million USD 
    pointsLiability: 750000000, // 750 million points
    program: 'United Mileage Plus',
    members: 50000000,
  },
  {
    name: 'Walmart',
    address: '0x5eE8dDFa4a1Fb0a790dDF697A164C2C4fdC49Ead',
    loyalty: 500000, // 500,000.00
    pointsLiability: 7000000, // 7 million
    program: 'My Mart Rewards',
    members: 2000000,
  },
  {
    name: 'Amazon',
    address: '0x5eE8dDFa4a1Fb0a790dDF697A164C2C4fdC49Ead',
    loyalty: 50000000, // 50 million
    pointsLiability: 175000000, // 17 billion points
    program: 'Prime Rewards',
    members: 175000000, // 175 million
  },
  {
    name: 'GolfSmith',
    address: '0x5eE8dDFa4a1Fb0a790dDF697A164C2C4fdC49Ead',
    loyalty: 750000, // 
    pointsLiability: 68000000, // 68 million
    program: 'Score More Rewards',
    members: 5000000,
  },
  {
    name: 'Starbucks',
    address: '0x5eE8dDFa4a1Fb0a790dDF697A164C2C4fdC49Ead',
    loyalty: 1500000, // 500,000.00
    pointsLiability: 100000000, // 100 million
    program: 'My Bucks',
    members: 20000000, // 20 million
  }];

  let data = useSelector((state) => state.issuer);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [program, setProgram] = useState('');
  const [id, setId] = useState('');
  const [amount, setAmount] = useState(0);
  const [members, setMembers] = useState(0)
  const [error, setError] = useState('All fields are required');
  // const [pearlzzExchange, setPearlzzExchange] = useState({})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [account,setAccount] = useState([])
  // const [network,setNetwork] = useState(0)


  useEffect(async () => {
    const web3 = await loadWeb3(dispatch)
    const networkId = await web3.eth.net.getId()
    const accounttemp = await loadAccount(web3, dispatch)
    const tempExchange = await loadPearlZZExchange(web3, networkId, dispatch)
    console.log("pearlzzExchange::Issuer.js", tempExchange);

    if (data.length < 1) {
      tempExchange && initialState.map((issuer) => {
        mintPearlZZ(accounttemp, issuer, tempExchange)
      })
    }
  }, [])

  const mintPearlZZ = async (account, issuer, exchange) => {
    let success = await
      exchange.methods.mint(issuer.loyalty, issuer.pointsLiability)
        .send({ from: account }).on('transactionHash', (hash) => {
          //dispatch(addingLoyaltyIssuer(issuerName))
          issuer.ppvalue = issuer.loyalty/issuer.pointsLiability;
          console.log("ISSUER:", issuer)
          dispatch(addIssuer(issuer));
          console.log(hash);
        })

    console.log("Minting Success:[", success, "].")
  }

  const onSubmit = async () => {
    if (name.trim() == '') {
      setError('Issuer name cannot be empty')
    } else if (program.trim() == '') {
      setError('Program name cannot be empty')
    } else if (id.trim() == '') {
      setError('Customer ID cannot be empty')
    } else if (!amount) {
      setError('Amount cannot be empty')
    } else if (!members) {
      setError('Members cannot be empty')
    } else {
      let tempdata = {
        name,
        program,
        address: id,
        pointsLiability: 7000000,
        loyalty: amount,
        members,
        ppvalue: amount/7000000
      }
      const web3 = await loadWeb3(dispatch)
      const networkId = await web3.eth.net.getId()
      const accounttemp = await loadAccount(web3, dispatch)
      const tempExchange = await loadPearlZZExchange(web3, networkId, dispatch)
      mintPearlZZ(accounttemp, tempdata, tempExchange)
      // dispatch(addIssuer(tempdata));
      handleClose();
      setError('')
    }
  }

  const onName = (e) => {
    if (e.target.value) {
      setName(e.target.value);
    } else {
      setError('Issuer name cannot be empty')
    }
  };

  const onProgram = (e) => {
    if (e.target.value) {
      setProgram(e.target.value);
    } else {
      setError('Program name cannot be empty')
    }
  };

  const onId = (e) => {
    if (e.target.value) {
      setId(e.target.value);
    } else {
      setError('Customer ID cannot be empty')
    }
  };

  const onAmount = (e) => {
    if (e.target.value) {
      setAmount(e.target.value);
    } else {
      setError('Amount cannot be empty')
    }
  };

  const onMembers = (e) => {
    if (e.target.value) {
      setMembers(e.target.value);
    } else {
      setError('Members cannot be empty')
    }
  };



  return (
    <div className="bg-light container-fluid min-vh-100">
      <Navbar account />
      <div className="container mt-4">
        <Link className="btn btn-outline-dark" to="/"><i className="bi bi-arrow-left me-3"></i>Go to Dashboad</Link>
        <div className="bg-light p-4 border-rounded d-flex w-100">
          <h3>Manage issuers</h3>
          <Button variant="primary" className="ms-auto" onClick={handleShow}>
            Add Issuer
          </Button>
        </div>
        <div className="row my-3">
          {data.map(
            (item, index) => {
              return <SingleIssuer key={index} data={item} />
            }
          )}
        </div>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Add Issuer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Issuer Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  value={name}
                  onChange={onName} />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Program Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  value={program}
                  onChange={onProgram} />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Address</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  value={id}
                  onChange={onId} />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputAmount" className="col-sm-2 col-form-label">Loyalty</label>
              <div className="col-sm-10">
                <input type="number" className="form-control" id="inputAmount"
                  value={amount}
                  onChange={onAmount} />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputAmount" className="col-sm-2 col-form-label">Members</label>
              <div className="col-sm-10">
                <input type="number" className="form-control" id="inputAmount"
                  value={members}
                  onChange={onMembers} />
              </div>
              {error ? <p className="text-danger">{error}</p> : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Issuer;
