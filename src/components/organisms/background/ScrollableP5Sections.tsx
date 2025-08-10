import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import { PageIndicator } from '../../atoms/PageIndicator';

type AnimationType = 'particles' | 'waves' | 'geometric' | 'noise';

export const ScrollableP5Sections = () => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.min(
        Math.floor(scrollPosition / windowHeight),
        3 // 最大セクション数 - 1
      );
      setCurrentSection(sectionIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初期状態を設定

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const animations: AnimationType[] = ['particles', 'waves', 'geometric', 'noise'];
  const totalSections = animations.length;

  return (
    <>
      {animations.map((type, index) => (
        <P5Section
          key={index}
          animationType={type}
          isActive={currentSection === index}
        />
      ))}
      <PageIndicator currentPage={currentSection + 1} totalPages={totalSections} />
    </>
  );
};

type P5SectionProps = {
  animationType: AnimationType;
  isActive: boolean;
};

const P5Section = ({ animationType, isActive }: P5SectionProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 既存のインスタンスをクリーンアップ
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }

    // アクティブなセクションのみアニメーションを開始
    if (!isActive) return;

    const sketch = getSketchForType(animationType);
    p5InstanceRef.current = new p5(sketch, containerRef.current);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [animationType, isActive]);

  return (
    <section
      ref={(el) => {
        containerRef.current = el as HTMLDivElement | null;
      }}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0"
      style={{ zIndex: -1 }}
    />
  );
};

const getSketchForType = (type: AnimationType): (p: p5) => void => {
  switch (type) {
    case 'particles':
      return particlesSketch;
    case 'waves':
      return wavesSketch;
    case 'geometric':
      return geometricSketch;
    case 'noise':
      return noiseSketch;
    default:
      return particlesSketch;
  }
};

// 1. パーティクルシステム（既存のアニメーション）
const particlesSketch = (p: p5) => {
  type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: p5.Color;
    life: number;
    maxLife: number;
  };

  const particles: Particle[] = [];
  const maxParticles = 100;
  let mouseX = p.width / 2;
  let mouseY = p.height / 2;
  let prevMouseX = p.width / 2;
  let prevMouseY = p.height / 2;
  let mouseSpeed = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 1);
    p.frameRate(60);
    // 初期背景を黒に設定（切り替え時の「光る」エフェクトを防ぐ）
    p.background(0, 0, 0);
  };

  p.draw = () => {
    p.background(0, 0, 0, 0.05);

    mouseX = p.lerp(mouseX, p.mouseX, 0.1);
    mouseY = p.lerp(mouseY, p.mouseY, 0.1);

    const mouseDx = mouseX - prevMouseX;
    const mouseDy = mouseY - prevMouseY;
    mouseSpeed = p.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
    prevMouseX = mouseX;
    prevMouseY = mouseY;

    if (particles.length < maxParticles) {
      for (let i = 0; i < 3; i++) {
        particles.push(createParticle(p, mouseX, mouseY, mouseSpeed));
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.vy += 0.1;
      particle.life--;

      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const distance = p.sqrt(dx * dx + dy * dy);

      if (distance < 100 && distance > 0) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 2;
        particle.vy += (dy / distance) * force * 2;
      }

      p.fill(particle.color);
      p.noStroke();
      p.circle(particle.x, particle.y, particle.size);

      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx2 = particle.x - other.x;
        const dy2 = particle.y - other.y;
        const dist2 = p.sqrt(dx2 * dx2 + dy2 * dy2);

        if (dist2 < 150) {
          p.stroke(particle.color);
          p.strokeWeight(1);
          p.line(particle.x, particle.y, other.x, other.y);
        }
      }

      if (
        particle.life <= 0 ||
        particle.x < -50 ||
        particle.x > p.width + 50 ||
        particle.y < -50 ||
        particle.y > p.height + 50
      ) {
        particles.splice(i, 1);
      }
    }

    p.fill(200, 100, 100, 0.3);
    p.noStroke();
    p.circle(mouseX, mouseY, 50);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    // リサイズ時にも背景を黒に設定（「光る」エフェクトを防ぐ）
    p.background(0, 0, 0);
  };

  const createParticle = (p: p5, x: number, y: number, mouseSpeed: number): Particle => {
    const angle = p.random(p.TWO_PI);
    const baseSpeed = p.map(p.constrain(mouseSpeed, 0, 10), 0, 10, 0.8, 2.5);
    const speed = p.random(baseSpeed * 0.8, baseSpeed * 1.2);
    const hue = (p.frameCount * 2) % 360;

    return {
      x: x + p.random(-10, 10),
      y: y + p.random(-10, 10),
      vx: p.cos(angle) * speed,
      vy: p.sin(angle) * speed,
      size: p.random(3, 8),
      color: p.color(hue, 80, 100, 0.8),
      life: p.random(100, 200),
      maxLife: 200,
    };
  };
};

// 2. 波紋エフェクト
const wavesSketch = (p: p5) => {
  const waves: Array<{ x: number; y: number; radius: number; life: number }> = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 1);
    p.frameRate(60);
    // 初期背景を黒に設定
    p.background(0, 0, 0);
  };

  p.draw = () => {
    p.background(0, 0, 0, 0.1);

    // マウスクリックまたは移動で波紋を生成
    if (p.mouseIsPressed || p.frameCount % 30 === 0) {
      waves.push({
        x: p.mouseX || p.width / 2,
        y: p.mouseY || p.height / 2,
        radius: 0,
        life: 255,
      });
    }

    // 波紋を更新・描画
    for (let i = waves.length - 1; i >= 0; i--) {
      const wave = waves[i];
      wave.radius += 3;
      wave.life -= 2;

      if (wave.life > 0 && wave.radius < p.width * 1.5) {
        const hue = (p.frameCount * 3) % 360;
        const alpha = p.map(wave.life, 255, 0, 0.8, 0);
        p.stroke(hue, 80, 100, alpha);
        p.strokeWeight(2);
        p.noFill();
        p.circle(wave.x, wave.y, wave.radius * 2);
      } else {
        waves.splice(i, 1);
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    // リサイズ時にも背景を黒に設定
    p.background(0, 0, 0);
  };
};

// 3. 幾何学的パターン
const geometricSketch = (p: p5) => {
  let angle = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 1);
    p.frameRate(60);
    // 初期背景を黒に設定
    p.background(0, 0, 0);
  };

  p.draw = () => {
    p.background(0, 0, 0, 0.05);
    p.translate(p.width / 2, p.height / 2);

    angle += 0.02;

    for (let i = 0; i < 20; i++) {
      const hue = (angle * 50 + i * 18) % 360;
      p.stroke(hue, 100, 100, 0.6);
      p.strokeWeight(2);
      p.noFill();

      const radius = 50 + i * 20;
      const x = p.cos(angle + i * 0.5) * radius;
      const y = p.sin(angle + i * 0.5) * radius;

      p.circle(x, y, 30 + p.sin(angle * 2 + i) * 10);
    }

    // 中心から放射状の線
    for (let i = 0; i < 12; i++) {
      const hue = (angle * 30 + i * 30) % 360;
      p.stroke(hue, 100, 100, 0.4);
      p.strokeWeight(1);
      const angle2 = (p.TWO_PI / 12) * i + angle;
      p.line(0, 0, p.cos(angle2) * 300, p.sin(angle2) * 300);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    // リサイズ時にも背景を黒に設定
    p.background(0, 0, 0);
  };
};

// 4. ノイズベースのアニメーション
const noiseSketch = (p: p5) => {
  let zoff = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 1);
    p.frameRate(60);
    // 初期背景を黒に設定
    p.background(0, 0, 0);
  };

  p.draw = () => {
    p.background(0, 0, 0, 0.1);

    const gridSize = 20;
    zoff += 0.01;

    for (let x = 0; x < p.width; x += gridSize) {
      for (let y = 0; y < p.height; y += gridSize) {
        const n = p.noise(x * 0.01, y * 0.01, zoff);
        const hue = n * 360;
        const size = n * 15;

        p.fill(hue, 80, 100, 0.6);
        p.noStroke();
        p.circle(x, y, size);
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    // リサイズ時にも背景を黒に設定
    p.background(0, 0, 0);
  };
};

