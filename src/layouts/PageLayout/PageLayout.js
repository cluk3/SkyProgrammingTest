import React, { PropTypes } from 'react'
import { pageContent, pageContainer, header, footer } from './PageLayout.css'
const PageLayout = ({ children }) => {
  return (
    <div className={pageContainer}>
      <section id='header'>
        <nav className={header}>
          <h1>Header</h1>
        </nav>
      </section>
      <section id='page-content' className={pageContent}>
        {children}
      </section>
      <section id='footer'>
        <div className={footer}>
          <p>Footer</p>
        </div>
      </section>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.element
}

export default PageLayout
