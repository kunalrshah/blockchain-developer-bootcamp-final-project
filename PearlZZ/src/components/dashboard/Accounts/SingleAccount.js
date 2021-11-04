import React from "react";

function SingleAccount(props) {
  let prlz = 0.1
  if(props.issuer){
    let result = props.issuer.filter(item=>item.name === props.data.issuer)
   if(result[0] && result[0].ppvalue) prlz = result[0].ppvalue 
  }
  
  return (
    <div className="col-md-6 mb-3">
      <div className="card border-0 bg-light shadow-sm rounded p-3">
        <h5 className="card-title">{props.data.issuer}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.data.program}</h6>
        <h5 className="card-text d-flex justify-content-between mt-2">
         <span > {props.data.points}</span> 
         <span className="badge bg-primary">${(prlz*props.data.points).toFixed(2)}</span> 
         <span className="badge bg-secondary"> {(prlz*props.data.points).toFixed(2)} <small> PRLZ</small></span>
        </h5>
      </div>
    </div>
  );
}

export default SingleAccount;
