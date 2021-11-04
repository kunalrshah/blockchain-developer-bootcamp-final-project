import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountSelector } from '../store/selectors'
import { MY_TOKEN_NAME } from '../helpers'
import loginImage from "./../assets/PearlZZ-Logo.jpg";
import { NavLink, Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light row flex-grow-1 p-3 border-bottom">
        <div className="col-12">


          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <img src={loginImage} width="65" height="65" alt="" className="rounded-circle mx-3" />
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                {MY_TOKEN_NAME}
                </Link>
              </li>
              <li className="nav-item ms-4">
                <NavLink
                  to="/issuer"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "red"
                  }}
                  className="nav-link border"
                >
                  Issuers
                </NavLink>
              </li>

            </ul>
            <span className="navbar-text ms-auto text-white">
              <a
                className="nav-link small "
                href={`https://etherscan.io/address/${this.props.account}`}
                target="_blank"
                rel="noopener noreferrer"
                alt={this.props.account}
              >
                {this.props.account}
              </a>
            </span>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: accountSelector(state)
  }
}

export default connect(mapStateToProps)(Navbar)
