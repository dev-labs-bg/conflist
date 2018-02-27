import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';

const Wrapper = (props) => {
    return (
        <div>
            <Header />
            <Loading />
            {props.children}
            <Footer />
        </div>
    );
};

export default Wrapper;
