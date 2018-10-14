import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const feedback = () => (
    <div className="container mx-auto pt-5 pb-5">
        <h1 className="text-center mb-5"> Thank you for your feedback, we hope you enjoyed that conference! </h1>

        <h3 className="font-weight-normal mb-5">
            You can find more conferences
            at <Link href="#home" to="/home">
                <Logo authentication />
               </Link>,
        </h3>
        <h3> Or <Link className="text-info" to="/conference-suggest">
            Suggest a conference
        </Link> to improve our list!
        </h3>

    </div>
);

export default feedback;
