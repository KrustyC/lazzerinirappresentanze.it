import React from "react"
import { Link } from "gatsby"
import { CenteredColumn } from "../CenteredColumn"
import { useContactForm } from "../../hooks/useContactForm"
import {
  StyledForm,
  Row,
  BottomRow,
  Textarea,
  Input,
  InputGroup,
  PolicyRow,
  Button,
} from "./Form.styled"

export const Form = () => {
  const [contactForm, { success, error }] = useContactForm()

  return (
    <CenteredColumn>
      <StyledForm
        name="contact"
        // method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={contactForm.handleSubmit}
      >
        {success && (
          <h3 style={{ background: "green" }}>
            Grazie, ti risponderemo il prima possibile
          </h3>
        )}

        {error && (
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
            <Input
              name="name"
              placeholder="Nome"
              {...contactForm.getFieldProps("name")}
            />
            {contactForm.touched.name && contactForm.errors.name && (
              <div>{contactForm.errors.name}</div>
            )}
          </InputGroup>

          <InputGroup>
            <Input
              name="email"
              placeholder="Email"
              {...contactForm.getFieldProps("email")}
            />
            {contactForm.touched.email && contactForm.errors.email && (
              <div>{contactForm.errors.email}</div>
            )}
          </InputGroup>
        </Row>

        <InputGroup>
          <Input
            name="subject"
            placeholder="Oggetto"
            {...contactForm.getFieldProps("subject")}
          />
          {contactForm.touched.subject && contactForm.errors.subject && (
            <div>{contactForm.errors.subject}</div>
          )}
        </InputGroup>

        <InputGroup>
          <Textarea
            name="message"
            placeholder="Messaggio"
            {...contactForm.getFieldProps("message")}
            type="textarea"
            rows={10}
          />
          {contactForm.touched.message && contactForm.errors.message && (
            <div>{contactForm.errors.message}</div>
          )}
        </InputGroup>

        <BottomRow>
          <PolicyRow>
            <input
              name="policy"
              type="checkbox"
              {...contactForm.getFieldProps("policy")}
            />
            <span>
              Confermo di aver preso visione dell'
              <Link to="/privacy-policy">
                informativa sul trattamento dei dati
              </Link>
            </span>
          </PolicyRow>
          <Button
            type="submit"
            disabled={!contactForm.isValid || contactForm.isSubmitting}
          >
            Invia
          </Button>
        </BottomRow>
      </StyledForm>
    </CenteredColumn>
  )
}
