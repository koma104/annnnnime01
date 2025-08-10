import { useEffect, useRef } from 'react';
import p5 from 'p5';

export const P5AboutBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
      }> = [];

      p.setup = () => {
        // ウィンドウの実際のサイズを使用
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        p.createCanvas(containerWidth, containerHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);

        // 静かな浮遊パーティクルを初期化
        for (let i = 0; i < 30; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
            size: p.random(2, 4),
          });
        }
      };

      p.draw = () => {
        // 白背景を維持
        p.background(0, 0, 96);

        time += 0.01;

        // 静かなグラデーションのような波を描画（パステルカラー）
        for (let i = 0; i < 5; i++) {
          const y = p.height / 2 + p.sin(time + i) * 50;
          const alpha = 60 + p.sin(time * 0.5 + i) * 20;

          // 色相を時間と位置に応じて変化（パステルカラー）
          const hue = (time * 10 + i * 60) % 360;
          p.stroke(hue, 40, 80, alpha);
          p.strokeWeight(1.5);
          p.noFill();

          p.beginShape();
          // 確実に右端まで描画するため、最後の点をp.widthに設定
          for (let x = 0; x < p.width; x += 10) {
            const waveY = y + p.sin(x * 0.01 + time * 2 + i) * 30;
            p.vertex(x, waveY);
          }
          // 最後の点を確実に右端に配置
          const finalY = y + p.sin(p.width * 0.01 + time * 2 + i) * 30;
          p.vertex(p.width, finalY);
          p.endShape();
        }

        // 浮遊する小さなパーティクル
        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];
          particle.x += particle.vx;
          particle.y += particle.vy;

          // 画面外に出たら反対側に
          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;
          if (particle.y < 0) particle.y = p.height;
          if (particle.y > p.height) particle.y = 0;

          // 静かな動きを追加
          particle.vx += p.sin(time + particle.x * 0.01) * 0.01;
          particle.vy += p.cos(time + particle.y * 0.01) * 0.01;
          particle.vx *= 0.99;
          particle.vy *= 0.99;

          // パーティクルを描画（パステルカラー）
          const hue = (time * 5 + i * 12) % 360;
          p.fill(hue, 50, 70, 80);
          p.noStroke();
          p.circle(particle.x, particle.y, particle.size);
        }
      };

      p.windowResized = () => {
        // ウィンドウの実際のサイズを使用
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        p.resizeCanvas(containerWidth, containerHeight);
      };
    };

    p5InstanceRef.current = new p5(sketch, containerRef.current);

    // キャンバスのスタイルを調整（スケーリングを防ぐ）
    if (p5InstanceRef.current && containerRef.current) {
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) {
        canvas.style.display = 'block';
        canvas.style.margin = '0';
        canvas.style.padding = '0';
      }
    }

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ zIndex: -1, margin: 0, padding: 0 }}
    />
  );
};
