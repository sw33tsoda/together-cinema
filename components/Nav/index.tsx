import Link from 'next/link';

export default function Nav() : JSX.Element {

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <div className="nav">
                    <div className="nav__side">
                        <div className="nav__side__title">
                            <Link href="/"><h1>Together<span>Cinema</span></h1></Link>
                        </div>
                        <div className="nav__side__nav-items-wrapper">
                            <div className="nav__side__nav-items-wrapper__nav-item">
                                <p>Sắp chiếu</p>
                            </div>
                            <div className="nav__side__nav-items-wrapper__nav-item">
                                <p>Đang chiếu</p>
                            </div>
                            <div className="nav__side__nav-items-wrapper__nav-item">
                                <p>Bảng xếp hạng</p>
                            </div>
                        </div>
                    </div>

                    <div className="nav__side">
                        <div className="nav__side__nav-items-wrapper">
                            <div className="nav__side__nav-items-wrapper__nav-item">
                                <i className="fas fa-ticket-alt"></i>
                                <p>Vé</p>
                            </div>
                            <div className="nav__side__nav-items-wrapper__nav-item">
                                <i className="fas fa-shopping-cart"></i>
                                <p>Giỏ</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}