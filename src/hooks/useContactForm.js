import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimo 3 caratteri")
    .max(30, "Massimo 30 caratteri")
    .required("Per favore inserire un nome"),
  email: Yup.string()
    .email("Inserire un indirizzo email corrretto")
    .required("Per favore inserire un'email"),
  subject: Yup.string()
    .min(5, "Inserire almeno 5 caratteri")
    .max(100, "Inserire meno di 100 caratteri")
    .required("Per favore inserire un oggetto"),
  message: Yup.string()
    .min(50, "Inserire almeno 50 caratteri")
    .max(500, "Inserire meno di 500 caratteri")
    .required("Per favore inserire un messaggio"),
  policy: Yup.bool().oneOf([true], "E' necessario accettare la privacy policy"),
})

export const useContactForm = () => {
  const [state, setState] = React.useState({
    error: null,
    pending: false,
    success: false,
  })

  const onSubmit = async values => {
    setState({
      ...state,
      pending: false,
    })

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...values,
        }),
      }

      await fetch("/", options)
      setState({
        ...state,
        pending: false,
        success: true,
      })
    } catch (error) {
      setState({
        ...state,
        error,
        pending: false,
      })
    }
  }

  const formik = useFormik({
    validationSchema,
    isInitialValid: false,
    initialValues: {
      email: "",
      name: "",
      subject: "",
      message: "",
    },
    onSubmit,
  })

  return [formik, state]
}
