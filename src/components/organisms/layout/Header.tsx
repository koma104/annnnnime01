import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[1030] p-[var(--spacing-md)] px-[var(--spacing-xl)]">
      <div className="grid grid-cols-[repeat(2,auto)] justify-between place-items-center">
        <Link to="/" className="text-xl font-bold text-[var(--color-text-primary)] no-underline">
          A01
        </Link>
        <nav className="header-nav">
          <ul className="grid grid-cols-[repeat(2,auto)] gap-[var(--spacing-xl)] list-none whitespace-nowrap">
            <li>
              <Link
                to="/"
                className="relative block py-[var(--spacing-sm)] font-bold text-base text-[var(--color-text-primary)] no-underline whitespace-nowrap transition-transform duration-[150ms] hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-1/2 after:content-[''] after:w-0 after:h-0.5 after:bg-[var(--color-text-primary)] after:transition-all after:duration-[300ms] after:-translate-x-1/2 hover:after:w-full"
              >
                ホーム
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="relative block py-[var(--spacing-sm)] font-bold text-base text-[var(--color-text-primary)] no-underline whitespace-nowrap transition-transform duration-[150ms] hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-1/2 after:content-[''] after:w-0 after:h-0.5 after:bg-[var(--color-text-primary)] after:transition-all after:duration-[300ms] after:-translate-x-1/2 hover:after:w-full"
              >
                A01について
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

