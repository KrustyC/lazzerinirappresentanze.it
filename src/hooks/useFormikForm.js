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
    .required("Perfavore inserire un nome"),
  email: Yup.string()
    .email("Inserire un indirizzo email corrretto")
    .required("Per favore inserire un'email"),
  message: Yup.string()
    .min(50, "Inserire almeno 50 caratteri")
    .max(500, "Inserire meno di 500 caratteri")
    .required("Perfavore inserire un messaggio"),
})

export const useFormikForm = () => {
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
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    onSubmit,
  })

  return [formik, state]
}
