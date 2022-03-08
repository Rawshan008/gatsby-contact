import React, { useState } from "react"

const onSubmit = async (event, setSubmitText) => {
  event.preventDefault()
  setSubmitText("Submitting ...")

  const formElements = [...event.currentTarget.elements]

  const isValid =
    formElements.filter(elem => elem.name === "bot-field")[0].value === ""

  const validFormElements = isValid ? formElements : []
  console.log(validFormElements)

  if (validFormElements.length < 1) {
    setSubmitText("It looks like you filled out too many fields!")
  } else {
    const filledOutElements = validFormElements
      .filter(elem => !!elem.value)
      .map(
        element =>
          encodeURIComponent(element.name) +
          "=" +
          encodeURIComponent(element.value)
      )
      .join("&")

    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: filledOutElements,
    })
      .then(() => {
        setSubmitText("Successfully submitted!")
      })
      .catch(_ => {
        setSubmitText(
          "There was an error with your submission, please email me using the address above."
        )
      })
  }
}

const ContactForm = () => {
  const [submitText, setSubmitText] = useState(null)
  return (
    <div>
      <form
        action="/success"
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={e => onSubmit(e, setSubmitText)}
      >
        <p style={{ display: "none" }}>
          <label>
            Don’t fill this out if you expect to hear from us!
            <input name="bot-field" value="" readOnly />
          </label>
        </p>
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <input type="text" name="firstname" id="firstname" />
          <label htmlFor="yourname">Your Name:</label> <br />
          <input type="text" name="name" id="yourname" />
        </p>
        <p>
          <label htmlFor="youremail">Your Email:</label> <br />
          <input type="email" name="email" id="youremail" />
        </p>
        <p>
          <label htmlFor="yourmessage">Message:</label> <br />
          <textarea name="message" id="yourmessage"></textarea>
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>

      {submitText && submitText}
    </div>
  )
}

export default ContactForm
