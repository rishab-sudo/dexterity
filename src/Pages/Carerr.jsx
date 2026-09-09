import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Career.css";

const QUALITIES = [
  {
    key: "believe",
    title: "Believe in Yourself",
    description:
      "You are confident in your abilities and ready to learn, improve and take responsibility.",
  },
  {
    key: "energy",
    title: "Bring Positive Energy",
    description:
      "You want to work in an energetic environment where ideas, enthusiasm and initiative are appreciated.",
  },
  {
    key: "dreams",
    title: "Turn Dreams Into Reality",
    description:
      "You have ambitions and are looking for the right opportunity to pursue them.",
  },
  {
    key: "friendly",
    title: "Enjoy a Friendly Workplace",
    description:
      "You prefer a collaborative team environment rather than a conventional and rigid office culture.",
  },
  {
    key: "idea",
    title: "Have an Idea to Share",
    description:
      "You have an idea and want an opportunity to implement it to create something meaningful.",
  },
];

const POSITIONS = [
  "SEO Executive",
  "Performance Marketing Specialist",
  "Web Developer",
  "Content Writer",
  "Graphic Designer",
  "Business Development Executive",
  "Other",
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  position: "",
  message: "",
};

const Career = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResume(file);
    if (errors.resume) {
      setErrors((prev) => ({ ...prev, resume: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) {
      next.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
      next.phone = "Enter a valid phone number";
    }
    if (!form.position) next.position = "Please select a position";
    if (!resume) {
      next.resume = "Please attach your resume";
    } else {
      const allowed = [".pdf", ".doc", ".docx"];
      const isAllowed = allowed.some((ext) =>
        resume.name.toLowerCase().endsWith(ext)
      );
      if (!isAllowed) next.resume = "Only PDF or Word files are accepted";
      else if (resume.size > 5 * 1024 * 1024)
        next.resume = "File must be under 5MB";
    }
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Check your details",
        text: "A few fields need your attention before we can submit this.",
        confirmButtonColor: "#ff6a1a",
        background: "#0b0e17",
        color: "#f5f1ea",
      });
      return;
    }

    setSubmitting(true);
    try {
      // TODO: replace with your real submit endpoint (API call / form service)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await Swal.fire({
        icon: "success",
        title: "Resume submitted!",
        text: "Thanks for applying to Dexterity. Our team will reach out if there's a match.",
        confirmButtonColor: "#ff6a1a",
        background: "#0b0e17",
        color: "#f5f1ea",
      });

      setForm(INITIAL_FORM);
      setResume(null);
      setErrors({});
      e.target.reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "We couldn't submit your resume. Please try again in a moment.",
        confirmButtonColor: "#ff6a1a",
        background: "#0b0e17",
        color: "#f5f1ea",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="career">
      {/* ---------- Why Join Us ---------- */}
      <div className="career__container">
        <div className="career__intro">
          <span className="career__pill">Build Your Career With Us</span>
          <h1 className="career__heading">
            Why Join <span className="career__heading-accent">Dexterity</span>
          </h1>
          <p className="career__subheading">
            Do you want to join a team that values talent, creativity,
            passion and determination more than academic qualifications? You
            could be the right fit for us if the following qualities describe
            you.
          </p>
        </div>

        <div className="career__grid">
          {QUALITIES.map((quality) => (
            <div className="career__card" key={quality.key}>
              <span className="career__check">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="career__card-title">{quality.title}</h3>
              <p className="career__card-description">{quality.description}</p>
            </div>
          ))}
        </div>

        <div className="career__banner">
          <span className="career__banner-icon">→</span>
          <p className="career__banner-text">
            If these qualities match your personality and career goals, share
            your resume with us. We would be happy to hear from you.
          </p>
        </div>
      </div>

      {/* ---------- Upload Resume ---------- */}
      <div className="career__container career__container--form">
        <div className="career__intro">
          <span className="career__pill">Apply Now</span>
          <h2 className="career__heading">Upload Your Resume</h2>
          <p className="career__subheading">
            Complete the form below and submit your resume. Our team will
            contact you when a suitable opportunity becomes available.
          </p>
        </div>

        <form className="career__form" onSubmit={handleSubmit} noValidate>
          <h3 className="career__form-title">Submit Resume</h3>

          <div className="career__form-row">
            <div className="career__field">
              <label htmlFor="firstName">
                Name<span className="career__required">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? "is-invalid" : ""}
              />
              {errors.firstName && (
                <span className="career__error">{errors.firstName}</span>
              )}
            </div>

            <div className="career__field">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="career__form-row">
            <div className="career__field">
              <label htmlFor="email">
                Email<span className="career__required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "is-invalid" : ""}
              />
              {errors.email && (
                <span className="career__error">{errors.email}</span>
              )}
            </div>

            <div className="career__field">
              <label htmlFor="phone">
                Phone<span className="career__required">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                value={form.phone}
                onChange={handleChange}
                className={errors.phone ? "is-invalid" : ""}
              />
              {errors.phone && (
                <span className="career__error">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="career__field">
            <label htmlFor="position">
              Apply for<span className="career__required">*</span>
            </label>
            <select
              id="position"
              name="position"
              value={form.position}
              onChange={handleChange}
              className={errors.position ? "is-invalid" : ""}
            >
              <option value="">Select a position</option>
              {POSITIONS.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
            {errors.position && (
              <span className="career__error">{errors.position}</span>
            )}
          </div>

          <div className="career__form-row">
            <div className="career__field">
              <label htmlFor="resume">
                Upload Resume<span className="career__required">*</span>
              </label>
              <label
                htmlFor="resume"
                className={`career__file ${errors.resume ? "is-invalid" : ""}`}
              >
                <span>{resume ? resume.name : "Choose file (PDF or Word)"}</span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 16V4M12 4l-4 4M12 4l4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                hidden
              />
              {errors.resume && (
                <span className="career__error">{errors.resume}</span>
              )}
            </div>

            <div className="career__field">
              <label htmlFor="message">Comment / Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Anything you'd like us to know"
                rows={4}
                value={form.message}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="career__submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>

          <p className="career__disclaimer">
            Do not submit confidential information such as card details, OTPs,
            or account passwords.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Career;