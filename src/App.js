import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import logo from 'assets/images/logo.svg'
import dollarIcon from 'assets/images/icon-dollar.svg'
import personIcon from 'assets/images/icon-person.svg'
import Input from 'components/Input'
import './App.scss'
import Radio from 'components/Radio'

const CustomTipField = ({ formik, computed }) => {
  return (
    <div
      onKeyUp={() => {
        if (formik.values.tip && formik.values.customTip) {
          formik.setFieldValue('tip', '')
        }
      }}
    >
      <Field
        name="customTip"
        type="number"
        placeholder="Custom"
        className="custom-field"
        disabled={computed}
        onInput={(e) => (e.target.value = Math.abs(+e.target.value))}
      />
    </div>
  )
}

function App() {
  const tipOptions = [
    { key: '5%', value: '5' },
    { key: '10%', value: '10' },
    { key: '15%', value: '15' },
    { key: '25%', value: '25' },
    { key: '50%', value: '50' },
  ]

  const [computed, setComputed] = useState(false)
  const [tipAmount, setTipAmount] = useState('0.00')
  const [total, setTotal] = useState('0.00')

  const initialValues = {
    billTotal: '',
    people: '',
    tip: '',
    customTip: '',
  }
  const validationSchema = Yup.object({
    billTotal: Yup.number('Must be number'),
    people: Yup.number().required('Required').positive("Can't be zero"),
  })

  const handleCalculate = (values) => {
    console.log(values)
    if (!values.tip && !values.customTip) {
      setTipAmount('0.00')
      setTotal(String(values.billTotal / values.people))
    }

    if (values.tip && !values.customTip) {
      const tipPerPerson = (+values.billTotal / values.people) * (+values.tip / 100)
      setTipAmount(tipPerPerson.toFixed(2))
      const totalPerPerson = (+values.billTotal / values.people) * (1 + Number(values.tip) / 100)
      setTotal(totalPerPerson.toFixed(2))
    }

    if (!values.tip && values.customTip) {
      const tipPerPerson = (+values.billTotal / values.people) * (values.customTip / 100)
      setTipAmount(tipPerPerson.toFixed(2))
      const totalPerPerson = (+values.billTotal / values.people) * (1 + values.customTip / 100)
      setTotal(totalPerPerson.toFixed(2))
    }
    setComputed((prev) => !prev)
  }

  return (
    <div className="AppContainer">
      <img src={logo} alt="logo" className="logo" />

      <div className="calculator">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCalculate}
        >
          {(formik) => {
            return (
              <Form className="form">
                <div className="input-container">
                  <Input
                    type="number"
                    name="billTotal"
                    label="Bill"
                    placeholder="0"
                    min="0"
                    step=".01"
                    icon={dollarIcon}
                    disabled={computed}
                    onInput={(e) => (e.target.value = Math.abs(+e.target.value))}
                  />

                  <Radio
                    label="Select Tip %"
                    name="tip"
                    options={tipOptions}
                    formik={formik}
                    fieldsDisabled={computed}
                    customField={<CustomTipField formik={formik} computed={computed} />}
                  />

                  <Input
                    type="number"
                    name="people"
                    label="Number of People"
                    placeholder="0"
                    min="0"
                    errors={formik.errors}
                    icon={personIcon}
                    onInput={(e) => (e.target.value = Math.abs(+e.target.value))}
                    disabled={computed}
                  />
                </div>

                <div className="result-container">
                  <div className="result-display">
                    <div className="tip-amount-per-person">
                      <div className="label">
                        <div className="type">Tip Amount</div>
                        <div className="person">/ person</div>
                      </div>
                      <div className="result">${tipAmount}</div>
                    </div>

                    <div className="total-per-person">
                      <div className="label">
                        <div className="type">Total</div>
                        <div className="person">/ person</div>
                      </div>
                      <div className="result">${total}</div>
                    </div>
                  </div>

                  {computed && (
                    <button
                      className="reset-btn"
                      onClick={() => {
                        formik.resetForm()
                        setComputed((prev) => !prev)
                        setTipAmount('0.00')
                        setTotal('0.00')
                      }}
                    >
                      RESET
                    </button>
                  )}
                  {!computed && (
                    <button className="submit-btn" type="submit">
                      SUBMIT
                    </button>
                  )}
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default App
