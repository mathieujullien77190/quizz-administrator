import { useEffect } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
}

export const useCursorBubbles = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    const bubbles: Bubble[] = [];
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.4) return;
      for (let i = 0; i < 1; i++) {
        bubbles.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          radius: Math.random() * 12 + 5,
          alpha: 0.85 + Math.random() * 0.15,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(Math.random() * 1.8 + 0.4),
        });
      }
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.x += b.vx;
        b.y += b.vy;
        b.radius *= 0.975;
        b.alpha *= 0.93;

        if (b.alpha < 0.02 || b.radius < 0.5) {
          bubbles.splice(i, 1);
          continue;
        }

        // remplissage blanc avec dégradé léger pour effet 3D
        const grad = ctx.createRadialGradient(
          b.x - b.radius * 0.3,
          b.y - b.radius * 0.35,
          b.radius * 0.05,
          b.x,
          b.y,
          b.radius
        );
        grad.addColorStop(0, `rgba(255,255,255,${b.alpha})`);
        grad.addColorStop(0.7, `rgba(230,230,230,${b.alpha * 0.9})`);
        grad.addColorStop(1, `rgba(200,200,200,${b.alpha * 0.6})`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // contour noir
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,0,${b.alpha * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // reflet blanc brillant en haut à gauche
        ctx.beginPath();
        ctx.arc(
          b.x - b.radius * 0.32,
          b.y - b.radius * 0.32,
          b.radius * 0.22,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255,255,255,${b.alpha * 0.6})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.body.removeChild(canvas);
    };
  }, []);
};
