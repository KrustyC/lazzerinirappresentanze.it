import React from "react"
import CenteredColumn from "../CenteredColumn"
import { useFormikForm } from "../../hooks/useFormikForm"
import {
  StyledForm,
  Row,
  Textarea,
  Input,
  InputGroup,
  Button,
} from "./Form.styled"

export const Form = () => {
  const [formik, state] = useFormikForm()

  console.log(formik)
  return (
    <CenteredColumn>
      <StyledForm
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

        <Row>
          <InputGroup>
            <Input name="name" {...formik.getFieldProps("name")} />
            {formik.touched.name && formik.errors.name && (
              <div>{formik.errors.name}</div>
            )}
          </InputGroup>

          <InputGroup>
            {/* <label htmlFor="email">Email:</label> */}
            <Input name="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email && (
              <div>{formik.errors.name}</div>
            )}
          </InputGroup>
        </Row>

        <InputGroup>
          {/* <label htmlFor="name">Oggetto:</label> */}
          <Input name="subject" {...formik.getFieldProps("subject")} />
          {formik.touched.subject && formik.errors.subject && (
            <div>{formik.errors.subject}</div>
          )}
        </InputGroup>

        <InputGroup>
          {/* <label htmlFor="message">Message:</label> */}
          <Textarea
            name="message"
            {...formik.getFieldProps("message")}
            type="textarea"
            rows={10}
          />
          {formik.touched.message && formik.errors.message && (
            <div>{formik.errors.message}</div>
          )}
        </InputGroup>

        <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Invia
        </Button>
      </StyledForm>
    </CenteredColumn>
  )
}
