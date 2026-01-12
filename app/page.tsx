"use client";
import { useState, useEffect } from "react";

export default function Home() {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill form data from URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlData: any = {};

    Object.keys(formData).forEach((key) => {
      const value = params.get(key);
      if (value) {
        urlData[key] = decodeURIComponent(value);
      }
    });

    if (Object.keys(urlData).length > 0) {
      setFormData((prev) => ({ ...prev, ...urlData }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://dashbpoai.app.n8n.cloud/webhook/f10840da-cb57-44b8-9fc4-a81fb7f1f147",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-top">
          <div className="logo">RYOBI</div>
          <input
            className="search"
            placeholder="Can we help you find something?"
            aria-label="Search"
          />
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
            <div className="row-two">
              <div>
                <label htmlFor="firstName">First Name*</label>
                <input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name*</label>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row-two">
              <div>
                <label htmlFor="email">Email*</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Disallow spaces
                    if (!/\s/.test(value)) {
                      setFormData((prev) => ({ ...prev, email: value }));
                    }
                  }}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  maxLength={254}
                  title="Enter a valid email address (example: name@example.com)"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">Phone*</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="6135551111"
                  value={formData.phone}
                  onChange={(e) => {
                    // Remove any non-phone characters immediately
                    const sanitizedValue = e.target.value.replace(/[^0-9()+\-\s]/g, "");
                    setFormData((prev) => ({ ...prev, phone: sanitizedValue }));
                  }}
                  pattern="^(\+1\s?)?(\(?\d{3}\)?[\s-]?)\d{3}[\s-]?\d{4}$"
                  inputMode="tel"
                  maxLength={20}
                  title="Enter a valid US or Canadian phone number"
                  required
                />


              </div>
            </div>

            <div className="row-four">
              <div>
                <label htmlFor="street">Street*</label>
                <input
                  id="street"
                  name="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="city">City*</label>
                <input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="state">State/Province*</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">State/Province</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>

                </select>
              </div>
              <div>
                <label htmlFor="zip">Zip / Postal Code*</label>
                <input
                  id="zip"
                  name="zip"
                  placeholder="12345 or A1A 1A1"
                  value={formData.zip}
                  onChange={(e) => {
                    let value = e.target.value.toUpperCase();

                    // Allow only letters, numbers, space, and dash
                    if (/^[A-Z0-9 -]*$/.test(value)) {
                      setFormData((prev) => ({ ...prev, zip: value }));
                    }
                  }}
                  pattern="^(\d{5}(-\d{4})?|[A-Z]\d[A-Z][ ]?\d[A-Z]\d)$"
                  maxLength={10}
                  title="Enter a valid US ZIP (12345 or 12345-6789) or Canadian postal code (A1A 1A1)"
                  required
                />
              </div>

            </div>

          </section>

          {/* Tool Details */}
          <section>
            <h3>Tool Details</h3>
            <div className="row-two">
              <div>
                <label htmlFor="modelNumber">Model Number*</label>
                <input
                  id="modelNumber"
                  name="modelNumber"
                  value={formData.modelNumber}
                  type="text"
                  placeholder="Model Number"
                  readOnly
                  required
                />
              </div>
              <div>
                <label htmlFor="serialNumber">Serial Number*</label>
                <input
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber}
                  type="text"
                  placeholder="Serial Number"
                  readOnly
                  required
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <h3>Additional Information</h3>
            <div className="full">
              <label htmlFor="shipBox">Do you need us to ship you a box?*</label>
              <select
                id="shipBox"
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
              <label htmlFor="emailLabel">
                Can we use the email provided to send you a shipping label?*
              </label>
              <select
                id="emailLabel"
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
              <label htmlFor="recallSource">
                How did you hear about this recall?
              </label>
              <select
                id="recallSource"
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

          <p className="required">*Required</p>
          <button type="submit" className="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Claim →"}
          </button>
        </form>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo-section">
              <div className="footer-logo">RYOBI</div>
              <div className="social-icons">
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="TikTok">🎵</a>
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="YouTube">📺</a>
                <a href="#" aria-label="Pinterest">📌</a>
              </div>
            </div>

            <div className="footer-links-grid">
              <div className="footer-column">
                <h4>SUPPORT</h4>
                <ul>
                  <li><a href="#">Manuals</a></li>
                  <li><a href="#">Warranties</a></li>
                  <li><a href="#">Replacement Parts</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>CATEGORIES</h4>
                <ul>
                  <li><a href="#">Power Tools</a></li>
                  <li><a href="#">Outdoor Power</a></li>
                  <li><a href="#">Recreation</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>SYSTEMS</h4>
                <ul>
                  <li><a href="#">18V ONE+</a></li>
                  <li><a href="#">40V</a></li>
                  <li><a href="#">80V</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>INTERNATIONAL</h4>
                <ul>
                  <li><a href="#">Australia</a></li>
                  <li><a href="#">Canada</a></li>
                  <li><a href="#">Europe</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-newsletter">
              <h4>STAY IN THE KNOW</h4>
              <p>
                SIGN UP TODAY FOR A CHANCE TO WIN AN 18V ONE+ HP SWIFTCLEAN
                MID-SIZE SPOT & CARPET CLEANER KIT
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 RYOBI. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}