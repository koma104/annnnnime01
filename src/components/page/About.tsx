import { Header } from '../organisms/layout/Header';
import { P5AboutBackground } from '../organisms/background/P5AboutBackground';

export const About = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <P5AboutBackground />
      <Header />
      <main className="w-full min-h-screen">
        <div className="grid place-items-center gap-5xl mx-auto pt-[calc(var(--header-height)+clamp(6rem,7vw,8rem))] pb-2xl px-[10%]">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl font-bold text-black mb-xl">A01について</h1>

            <p className="text-lg text-black leading-relaxed">
              A01は、インタラクティブな表現を通じて、0から1への成長と変化を探求していく実験的な場所です。
              技術や手法に限定されることなく、様々なビジュアル表現を実験的に試していく場として、
              今後も継続的に形を変えながら進化していきます。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
