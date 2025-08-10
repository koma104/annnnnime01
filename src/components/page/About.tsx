import Header from '../organisms/layout/Header';

const About = () => {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen">
        <div className="grid place-items-center gap-[var(--spacing-5xl)] mx-auto pt-[calc(var(--header-height)+var(--spacing-4xl))] pb-[var(--spacing-2xl)] px-[10%]">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-[var(--spacing-xl)]">
              A01について
            </h1>
            <p className="text-lg text-[var(--color-text-primary)]">
              ここにA01についての説明を記載します。
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;

