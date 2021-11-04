import React from 'react'

function Transactions() {
  return (
    <div className="Transactions">
    <h4>Transactions</h4>
    <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">From Account</th>
      <th scope="col">To Account</th>
      <th scope="col">Points</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Buy</th>
      <td>UAL</td>
      <td>Walmart</td>
      <td>123</td>
    </tr>
    <tr>
      <th scope="row">Sell</th>
      <td>Big</td>
      <td>Dmart</td>
      <td>21</td>
    </tr>
    <tr>
      <th scope="row">Buy</th>
      <td>Tesco</td>
      <td>Medico</td>
      <td>67</td>
    </tr>
    <tr>
      <th scope="row">Buy</th>
      <td>Tesco</td>
      <td>Walmart</td>
      <td>12</td>
    </tr>
  </tbody>
</table>
    </div>
  );
}

export default Transactions;