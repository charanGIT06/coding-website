import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="container">
        <div className="row py-5">
          <div className="quick-links col-6">
            <p className="py-0 my-0" style={{ fontWeight: "bold" }}>
              Quick Links
            </p>
            <ul style={{ listStyleType: "none" }} className="p-0">
              {["Home", "Practice", "Register", "Login"].map((link) => {
                return (
                  <li
                    className="m-0 pt-2"
                    onClick={() => {
                      navigate(`/${link.toLowerCase()}`);
                    }}
                  >
                    <button>{link}</button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="developer-links col-6">
            <p className="py-0 my-0">
              Developed by :{" "}
              <span style={{ fontWeight: "bold" }}>Charan K</span>{" "}
            </p>
            <ul style={{ listStyleType: "none" }} className="p-0">
              {[
                ["Github", "https://github.com/charanGIT06"],
                ["LinkedIn", "https://www.linkedin.com/in/imcharank/"],
                ["Portfolio", "https://charank06.netlify.app/"],
                ['Mail', "mailto:imcharan.k@gmail.com"]
              ].map(([link, address]) => {
                return (
                  <li className="m-0 pt-2">
                    <a href={address}>{link}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
