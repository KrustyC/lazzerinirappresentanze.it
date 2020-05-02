import React from "react"
import { navigate } from "gatsby-link"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const useForm = () => {}

export const Form = () => {
  const [state, setState] = React.useState({})
  const [successful, setSuccessful] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": e.target.getAttribute("name"),
          ...state,
        }),
      }

      await fetch("/", options)
      setSuccessful(true)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
      <h1>Contact</h1>
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {successful && (
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
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Nome:
            <br />
            <input type="text" name="name" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Email:
            <br />
            <input type="email" name="email" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Messaggio:
            <br />
            <textarea name="message" onChange={handleChange} />
          </label>
        </p>
        <p>
          <button type="submit">Invia</button>
        </p>
      </form>
    </div>
  )
}
