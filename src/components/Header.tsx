import { useNavigate } from "react-router";

function Header({ mode = "dark" }) {
    const navigate = useNavigate();
    return (
        <div className="d-flex align-items-center p-3 position-absolute top-0 start-0 z-3">
            <i
                className={`bi bi-arrow-left fs-4 ${
                    mode === "dark" ? "" : "text-white"
                }`}
                onClick={() => navigate(-1)}
                style={{ cursor: "pointer" }}
            ></i>
        </div>
    );
}

export default Header;
