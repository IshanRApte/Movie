import "./Header.css";
import logo from "../assets/react.svg"; // ✅ import the SVG

export default function Header() {
  return (
    <header className="header">
      {/* Left: Logo + App Name */}
      <div className="header-left">
        <img
          src={logo}  // ✅ use imported SVG
          alt="App Logo"
          className="logo"
        />
        <h1 className="app-name">MovieVerse</h1>
      </div>

      {/* Right: Search Box */}
      <div className="header-right">
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
        />
      </div>
    </header>
  );
}
