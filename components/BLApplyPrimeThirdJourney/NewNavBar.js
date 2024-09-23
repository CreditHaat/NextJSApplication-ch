// components/NewNavBar.js
"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NewNavBar.css'; // Use CSS Modules with .module.css
import { HamburgetMenuClose, HamburgetMenuOpen } from './NewIcons';
import credithattlogo from './BLApplyImages/logo1-removebg-preview.png'; // Images should be in the public folder

export default function NewNavBar() {
  const [click, setClick] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <h4>CreditHaat</h4>
        <Image
          className={styles.navLogoIcon}
          src={credithattlogo}
          alt="CreditHaat logo"
          height={40}
          width={40}
        />
        {/* Link with no <a> child */}
        <ul className={click ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLinks}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <div className={styles.navLinks} onClick={toggleDropdown}>
              Products
              {showDropdown && (
                <ul className={styles.dropdownContent}>
                  <li>
                    <Link href="/newploanproduct" className={styles.dropdownItem}>
                      Personal Loan
                    </Link>
                  </li>
                  <li>
                    <Link href="/businessloan" className={styles.dropdownItem}>
                      Business Loan
                    </Link>
                  </li>
                  <li>
                    <Link href="/creditcard" className={styles.dropdownItem}>
                      Credit Cards
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li className={styles.navItem}>
            <Link href="/ContactUs" className={styles.navLinks} onClick={handleClick}>
              Contact Us
            </Link>
          </li>
        </ul>
        <div className={styles.navIcon} onClick={handleClick}>
          {click ? (
            <span className={styles.icon}>
              <HamburgetMenuClose />
            </span>
          ) : (
            <span className={styles.icon}>
              <HamburgetMenuOpen />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
