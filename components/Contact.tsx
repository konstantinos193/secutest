"use client";
import React from "react";

const Contact = () => (
  <section id="contact" className="contact">
    <div className="wrapper">
      <header className="contact__header">
        <h2 className="contact__title">
          <span className="text-gradient">Let us</span>
          <span className="text-gradient">secure you</span>
        </h2>
      </header>
      <form
        className="contact__form"
        method="post"
        action="https://secu.sa/requestService"
      >
        {/* If you need a CSRF token, add it here */}
        <div className="space-y-4 lg:space-y-6">
          <input
            type="text"
            required
            name="name"
            className="contact__form-input"
            placeholder="Name"
          />
          <input
            type="email"
            required
            name="email"
            className="contact__form-input"
            placeholder="Email"
          />
          <input
            type="text"
            required
            name="security_type"
            className="contact__form-input"
            placeholder="Security Type"
          />
          <input
            type="text"
            required
            name="project_details"
            className="contact__form-input"
            placeholder="Project Details"
          />
        </div>
        <button type="submit" className="contact__form-btn">
          Submit Message
        </button>
      </form>
    </div>
  </section>
);

export default Contact; 