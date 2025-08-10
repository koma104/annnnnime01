import { Header } from '../organisms/layout/Header';
import { ScrollableP5Sections } from '../organisms/background/ScrollableP5Sections';

export const Home = () => {
  const sections = [
    {
      title: 'パーティクル',
      description: 'マウスの動きに反応して広がる光の粒子',
    },
    { title: '波紋', description: 'クリックや移動で広がる美しい波紋' },
    { title: '幾何学模様', description: '回転する幾何学的なパターン' },
    { title: 'ノイズアート', description: '有機的で流れるような表現' },
  ];

  return (
    <>
      <ScrollableP5Sections />
      <Header />
      <main className="relative">
        {sections.map((section, index) => (
          <section
            key={index}
            className="h-screen w-full flex flex-col items-center justify-center px-[10%]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="text-center z-10">
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {section.title}
              </h2>
              <p className="text-lg text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                {section.description}
              </p>
            </div>
          </section>
        ))}
      </main>
    </>
  );
};
