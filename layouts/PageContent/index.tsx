import React from "react";
import Footer from "../Footer";
export default function PageContent({children}) {

    return (
        <React.Fragment>
            <div className="page-content">
                {children}
            </div>
            <Footer/>
        </React.Fragment>
    )
}