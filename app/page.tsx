"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const initialized = useRef(false); // ensure we prefill only once

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

  /* PREFILL FROM URL PARAMETERS (ONCE) */
  useEffect(() => {
    if (initialized.current) return;

    const phone = searchParams.get("phone") || "";
    const modelNumber = searchParams.get("model") || ""; // match your query param
    const serialNumber = searchParams.get("serial") || "";

    setFormData(prev => ({
      ...prev,
      phone,
      modelNumber,
      serialNumber,
    }));

    initialized.current = true;
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://dashbpoai.app.n8n.cloud/webhook/f10840da-cb57-44b8-9fc4-a81fb7f1f147",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("Form submitted successfully!");
        setFormData({
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
      } else {
        alert("Error submitting form.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error.");
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
        <form className="form" onSubmit={handleSubmit}>
          {/* Customer Information */}
          <section>
            <h3>Customer Information</h3>
            <div className="row">
              <div>
                <label>First Name*</label>
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Last Name*</label>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div>
                <label>Email*</label>
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Phone*</label>
                <input
                  name="phone"
                  placeholder="6135551111"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div>
                <label>Street*</label>
                <input
                  name="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>City*</label>
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>State/Province*</label>
                <select name="state" value={formData.state} onChange={handleChange}>
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
                  placeholder="Zip/Postal Code"
                  value={formData.zip}
                  onChange={handleChange}
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
                  type="text"
                />
              </div>
              <div>
                <label>Serial Number*</label>
                <input
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  type="text"
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <h3>Additional Information</h3>
            <div className="full">
              <label>Do you need us to ship you a box?*</label>
              <select name="shipBox" value={formData.shipBox} onChange={handleChange}>
                <option value="">Select Yes or No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="full">
              <label>Can we use the email provided to send you a shipping label?*</label>
              <select name="emailLabel" value={formData.emailLabel} onChange={handleChange}>
                <option value="">Select Yes or No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="full">
              <label>How did you hear about this recall?</label>
              <select name="recallSource" value={formData.recallSource} onChange={handleChange}>
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

          <p className="required">*Required</p>
          <button type="submit" className="submit">
            Submit Claim →
          </button>
        </form>
      </main>
    </>
  );
}
