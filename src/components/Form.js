import React from "react"
import { useFormikForm } from "../hooks/useFormikForm"

export const Form = () => {
  const [formik, state] = useFormikForm()

  console.log(formik)
  return (
    <div>
      <h1>Contattaci</h1>
      <form
        name="contact"
        // method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={formik.handleSubmit}
      >
        {state.success && (
          <h3 style={{ background: "green" }}>
            Grazie, ti risponderemo il prima possibile
          </h3>
        )}
        {state.error && (
          <h3 style={{ background: "red" }}>
            Oops! Sembrerebbe che si sia verificato un errore. Riprova a breve
          </h3>
        )}
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>

        <div>
          <label htmlFor="name">Nome:</label>
          <input name="name" {...formik.getFieldProps("name")} />
          {formik.touched.name && formik.errors.name && (
            <div>{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input name="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <input
            name="message"
            {...formik.getFieldProps("message")}
            type="textarea"
          />
          {formik.touched.message && formik.errors.message && (
            <div>{formik.errors.message}</div>
          )}
        </div>

        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Invia
        </button>
      </form>
    </div>
  )
}
