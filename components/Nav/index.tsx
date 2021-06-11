export default function Nav() : JSX.Element {

    return (
        <div className="nav">
            <div className="nav__side">
                <div className="nav__side__title">
                    <h1>Together<span>Cinema</span></h1>
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
    );
}