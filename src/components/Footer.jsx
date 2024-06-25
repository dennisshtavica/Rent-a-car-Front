import React from 'react'
import "../scss/layout/_footer.scss"
import RentAcLogoWhite from "../assets/images/RentAcLogoWhite.svg";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
        <div>
            <div className='footerlinks'>
                <img src={RentAcLogoWhite} alt="" />
                <Link>Home</Link>
                <Link>Contact</Link>
                <Link>Rented</Link>
            </div>
            <div className='terms'>
              <p>Privacy</p>
              <p>Terms of use</p>
              <p>Acceptable Use Policy</p>
              <p>Software Lifecycle Policy</p>
            </div>
        </div>
    </footer>
  )
}
