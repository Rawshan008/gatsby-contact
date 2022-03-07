import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ContactForm from "../components/contact-form"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <ContactForm />
  </Layout>
)

export default IndexPage
