import React, { useEffect } from 'react'
import SingleAccount from './SingleAccount';
import {
  loadWeb3
} from '../../../store/interactions'

import {
  useDispatch, useSelector
} from 'react-redux'

function Accounts(props) {
  let dispatch = useDispatch();
  let issuer = useSelector(state=>state.issuer)
  useEffect(async () => {
    const web3 = await loadWeb3(dispatch)
    console.log(web3);
  },
    [])
  return (
    <>
      <div className="row my-3">
        {props.data ? props.data.map(
          (item) => {
            return <SingleAccount key={item.id} issuer={issuer} data={item} />
          }
        ) : null}
      </div>
    </>
  );
}

export default Accounts;