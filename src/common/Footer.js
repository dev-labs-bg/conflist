import React from 'react';

const footer = () => (
    <footer className="footer d-flex align-content-center">
        <span
            className="footer__text my-auto mx-auto font-weight-normal"
        >
            © {new Date().getFullYear()} conf<span className="font-weight-bold">list</span>
            . All rights reserved.
        </span>
    </footer>
);

export default footer;
