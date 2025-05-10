import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

export default function Contact() {
  const emailRef = useRef(null);
  const companyNameRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    Name: "",
    companyName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidMobileNo = (phone) => {
    return isValidPhoneNumber("+" + phone);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.Name) {
      newErrors.Name = "Name is required";
    }
    if (!formData.companyName) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (!isValidMobileNo(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message) {
      newErrors.message = "Please enter a message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted", formData);
      // Send data to backend here if needed
    } else {
      console.log("Form Validation Failed");
    }
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (nextRef && nextRef.current) {
        nextRef.current.focus(); // Focus on the next input field
      }
    }
  };

  return (
    <div className="min-h-screen bg-burgundy">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-16">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 p-8 rounded-lg">
              <h2 className="font-serif text-2xl text-gold mb-6">Get in Touch</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-gold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="w-full bg-white/10 border-gold/30 rounded-md text-gold"
                    onKeyDown={(e) => handleKeyDown(e, companyNameRef)}
                  />
                  {errors?.Name && <div className="errors">{errors.Name}</div>}
                </div>

                <div>
                  <label htmlFor="CName" className="block text-gold mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="CName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter Your Company Name"
                    className="w-full bg-white/10 border-gold/30 rounded-md text-gold"
                    ref={companyNameRef}
                    onKeyDown={(e) => handleKeyDown(e, phoneRef)} // Move focus to the next field (Phone)
                  />
                  {errors?.companyName && (
                    <div className="errors">{errors.companyName}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gold mb-2">
                    Mobile No.
                  </label>
                  <PhoneInput
                    country={"in"}
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone })}
                    inputClass="w-full bg-white/10 border-gold/30 rounded-md text-gold"
                    inputStyle={{
                      backgroundColor: "transparent",
                      border: "1px solid #D4AF37",
                      color: "#D4AF37",
                      width: "100%",
                    }}
                    buttonStyle={{
                      backgroundColor: "transparent",
                      border: "1px solid #D4AF37",
                    }}
                    onKeyDown={(e) => handleKeyDown(e, emailRef)} // Move focus to the next field (Email)
                  />
                  {errors?.phone && <div className="errors">{errors.phone}</div>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gold mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="abc@gmail.com"
                    className="w-full bg-white/10 border-gold/30 rounded-md text-gold"
                    ref={emailRef}
                    onKeyDown={(e) => handleKeyDown(e, messageRef)} // Move focus to the next field (Message)
                  />
                  {errors?.email && <div className="errors">{errors.email}</div>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-gold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/10 border-gold/30 rounded-md text-gold"
                    ref={messageRef}
                  />
                  {errors?.message && <div className="errors">{errors.message}</div>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-burgundy py-2 rounded-md hover:bg-gold/90 transition-colors">
                  Send Message
                </button>
              </form>
            </div>

            <div className="text-gold">
              <h2 className="font-serif text-2xl mb-6">Visit Our Store</h2>
              <div className="space-y-4">
                <p>
                  <strong>Address:</strong>
                  <br />
                  702, DD JEWELS, 7th FLOOR,
                  <br />
                  1st AGAIRY LANE, ZAVERI BAZZAR,
                  <br />
                  KALBADEVI ROAD, Mumbai, 400002
                </p>
                <p>
                  <strong>Phone:</strong>
                  <br />
                  +91 9920033377
                </p>
                <p>
                  <strong>Email:</strong>
                  <br />
                  sangamhoj@gmail.com
                </p>
                <p>
                  <strong>Hours:</strong>
                  <br />
                  Monday - Saturday: 11:00 AM - 8:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
