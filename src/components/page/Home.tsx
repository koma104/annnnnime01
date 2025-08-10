import Header from '../organisms/layout/Header';
import Card from '../molecules/Card';

const Home = () => {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen">
        <div className="grid place-items-center gap-[var(--spacing-5xl)] mx-auto pt-[calc(var(--header-height)+var(--spacing-4xl))] pb-[var(--spacing-2xl)] px-[10%]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(var(--card-min-width),1fr))] gap-[var(--spacing-3xl)] w-full">
            <Card backgroundImage="/images/card01.png" title="Anime01">
              <p>Anime01</p>
            </Card>
            <Card backgroundImage="/images/card02.png" title="Anime02">
              <p>Anime02</p>
            </Card>
            <Card backgroundImage="/images/card03.png" title="Anime04">
              <p>Anime03</p>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
