import React, { useState } from 'react'
import cn from 'classnames'
import AppLink from '../AppLink'
import Group from './Group'
import Theme from '../Theme'
import Image from '../Image'
import SocialMedia from '../SocialMedia'

import styles from './Footer.module.sass'

const Footers = ({ navigation }) => {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.copyright} aria-hidden="true">
          <span className={styles.cosmicGroup}>
            <p className={styles.powered}>Powered by </p>
            <a href="https://www.cosmicjs.com">
              <Image
                className={styles.cosmic}
                size={{ width: '110px', height: '90px' }}
                src="/cosmic.svg"
                alt="Cosmic Logo"
                objectFit="contain"
              />
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footers
