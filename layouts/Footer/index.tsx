import Link from 'next/link';
import { useState } from 'react';
import InputText from '../../components/Form/InputText';
export default function Footer() {
    const [email,setEmail] = useState('');
    const handleSetEmail = (value:string) : void => {
        setEmail(value);
    }
    return (
        <div className="footer">
            <div className="footer__wrapper">
                <div className="footer__top">
                    <div className="footer__grid-column">
                        <h1 className="logo">TOGETHER<span>CINEMA</span></h1>
                    </div>
                    <div className="footer__grid-column">
                        <p className="footer__grid-column-subheading">Customer service</p>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Movie guide</p>
                        </Link>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Q&A</p>
                        </Link>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Contact Us</p>
                        </Link>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Counterfeiting</p>
                        </Link>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Payment</p>
                        </Link>
                    </div>
                    <div className="footer__grid-column">
                        <p className="footer__grid-column-subheading">After sales service</p>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Customization and replacement</p>
                        </Link>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">After Sales & Appointment</p>
                        </Link>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Shipping & Returns</p>
                        </Link>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Care instructions</p>
                        </Link>
                    </div>
                    <div className="footer__grid-column">
                        <p className="footer__grid-column-subheading">Global TOGETHERCINEMA</p>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Showroom</p>
                        </Link>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Store</p>
                        </Link>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Careers</p>
                        </Link>
                        <Link href="#">
                            <p className="footer__grid-column-nav-link">Blog</p>
                        </Link>
                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="footer__grid-column">
                        <p className="footer__grid-column-subheading">Subscribe to our newsletter to receive informations on our latest updates</p>
                        <div className="footer__input">
                            <InputText label="Địa chỉ Email" input={email} setInput={handleSetEmail}/>
                        </div>
                        <p className="footer__grid-column-nav-link legend">Your email address is being used by Redline for commercial purposes (news, updates...).</p>
                    </div>
                </div>
            </div>
        </div>
    );
}