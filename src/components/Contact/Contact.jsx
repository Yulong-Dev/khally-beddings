import React, { useState } from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "your_service_id", // Replace with your EmailJS Service ID
        "your_template_id", // Replace with your EmailJS Template ID
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "your_public_key" // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setSubmitted(true);
          setForm({ name: "", email: "", message: "" });
        },
        (err) => {
          console.error("EmailJS Error:", err);
          setError("Failed to send message. Try again later.");
        }
      );
  };

  return (
    <div className="contact-page">
      <Navbar />
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>Have a question or request? We'd love to hear from you.</p>

        {submitted && <p className="success-message">Message sent successfully!</p>}
        {error && <p className="error-message">{error}</p>}

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="6"
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
