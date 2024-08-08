import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


const Header = () => {
  return (
    <>
    <header>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="credithaat">CreditHaat</a>
      <div class="collapse navbar-collapse justify-content-lg-end" id="navbarToggler">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="h5/personalloan_credithaat">Personal Loan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="h5/businessloan_credithaat">Business Loan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="h5/creditcard_credithaat">Credit Card</a>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</header>
    </>
  )
}

export default Header;