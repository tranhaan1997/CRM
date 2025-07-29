import "./Preloader.css";
import Logo from "~/assets/Logo/logo_act_white_theme.png";
function Preloader() {
  return (
    <>
      <div id="preloader-active">
        <div className="preloader d-flex align-items-center justify-content-center">
          <div className="preloader-inner position-relative">
            <div className="preloader-circle"></div>
            <div className="preloader-img pere-text">
              <img src={Logo} alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preloader;
