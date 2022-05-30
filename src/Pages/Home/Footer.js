import React from 'react';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="footer-title">Services</span>
        <a href="/" className="link link-hover">Tools</a>
        <a href="/" className="link link-hover">Chips</a>
        <a href="/" className="link link-hover">Components</a>
        <a href="/" className="link link-hover">PCB</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a href="/" className="link link-hover">About us</a>
        <a href="/" className="link link-hover">Contact</a>
        <a href="/" className="link link-hover">Jobs</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a href="/" className="link link-hover">Terms of use</a>
        <a href="/" className="link link-hover">Privacy policy</a>
        <a href="/" className="link link-hover">Cookie policy</a>
      </div>


    </footer>
  );
};

export default Footer;