import React from "react";
import "./PageBanner.css";
import { Link } from "react-router-dom";

const PageBanner = ({
  title = "Page Title",
  currentPage = "Current Page",
  videoSrc = "/videos/banner-video.mp4",
}) => {
  return (
    <section className="page-banner">
      <video
        className="page-banner-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="page-banner-overlay" />

      <div className="page-banner-content container">
        <h1 className="page-banner-title">{title}</h1>

        <div className="page-banner-breadcrumb">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>

          <span className="breadcrumb-separator">&gt;</span>

          <span className="breadcrumb-current">
            {currentPage}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;