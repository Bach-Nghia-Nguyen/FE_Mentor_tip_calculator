import React from 'react'
import { Field } from 'formik'
import './style.scss'

function Radio(props) {
  const { label, name, options, customField = null, formik, fieldsDisabled, ...rest } = props
  return (
    <div className="radio-control">
      <label className="select-tip-label">{label}</label>
      <div className="tips-container">
        <Field name={name} {...rest}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <div key={option.key} className="tip-wrapper">
                  <input
                    type="radio"
                    id={option.value}
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                    disabled={fieldsDisabled}
                  />
                  <label
                    htmlFor={option.value}
                    onClick={() => {
                      if (formik.values.customTip) {
                        formik.setFieldValue('customTip', '')
                      }
                    }}
                  >
                    {option.key}
                  </label>
                </div>
              )
            })
          }}
        </Field>
        {customField}
      </div>
    </div>
  )
}

export default Radio
