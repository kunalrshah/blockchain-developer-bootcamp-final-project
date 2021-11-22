import React from 'react'

function SingleIssuer(props) {
    var formatter = new Intl.NumberFormat();
      
      let formattedloyalty = formatter.format(props.data.loyalty);
      let formattedpointsLiability = formatter.format(props.data.pointsLiability); /* $2,500.00 */
    // console.log(props)
    return (
        <div className="col-md-4 mb-3">
            <div className="card border rounded p-3">
                <h4 className="card-title">{props.data.name}</h4>
                <h6 className="card-subtitle mb-2 text-muted">{props.data.program}</h6>
                <h6 className="card-text text-overflow" alt={props.data.address}>Address : {props.data.address}</h6>
                <p><b>Loyalty :  </b>{formattedloyalty}</p>
                <p><b>Points Liability :  </b>{formattedpointsLiability}</p>
                <p><b>Members : </b>{props.data.members}</p>
            </div>
        </div>
    );
}

export default SingleIssuer;