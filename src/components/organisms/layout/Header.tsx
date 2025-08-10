import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-fixed p-md px-xl mix-blend-exclusion">
      <div className="grid grid-cols-[repeat(2,auto)] justify-between place-items-center">
        <Link
          to="/"
          className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] no-underline"
        >
          A01
        </Link>
        <nav className="header-nav">
          <ul className="grid grid-cols-[repeat(2,auto)] gap-xl list-none whitespace-nowrap">
            <li>
              <Link
                to="/"
                className="relative block py-sm font-bold text-base text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] no-underline whitespace-nowrap transition-transform duration-fast hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-1/2 after:content-[''] after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-normal after:-translate-x-1/2 hover:after:w-full"
              >
                ホーム
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="relative block py-sm font-bold text-base text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] no-underline whitespace-nowrap transition-transform duration-fast hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-1/2 after:content-[''] after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-normal after:-translate-x-1/2 hover:after:w-full"
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

