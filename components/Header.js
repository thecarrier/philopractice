import Link from "next/link";

const siteHeader = () => {
  return (
    <header>
      <div className="topbar">
        <Link href="/">
          <a>PhiloPractice</a>
        </Link>
      </div>

      <nav className="navigation">
        <i className="fas fa-bars"></i>
        <div className="nav-list">
          <Link href="/">
            <a>Naslovna</a>
          </Link>

          <Link href="/projekti">
            <a>Projekti</a>
          </Link>

          <Link href="/savjetovanje">
            <a>Savjetovanje</a>
          </Link>

          <Link href="/radionice">
            <a>Radionice</a>
          </Link>

          <Link href="/publikacije">
            <a>Publikacije</a>
          </Link>

          <Link href="/biografija">
            <a>Biografija</a>
          </Link>

          <Link href="/kontakt">
            <a>Kontakt</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default siteHeader;
