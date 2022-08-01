import React from 'react'
import { Field, ErrorMessage } from 'formik'
import './style.scss'

function Input(props) {
  const { label, name, errors, icon, ...rest } = props

  return (
    <div className="input-control">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="input-wrapper">
        <Field
          id={name}
          name={name}
          {...rest}
          className={`input-field ${errors && errors[name] && 'errorOutline'}`}
        />
        {icon && <img src={icon} alt="input icon" className="icon" />}
      </div>
      <ErrorMessage name={name}>
        {(error) => {
          return <div className="error">{error}</div>
        }}
      </ErrorMessage>
    </div>
  )
}

export default Input
