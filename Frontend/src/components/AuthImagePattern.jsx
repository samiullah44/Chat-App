import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * AuthImagePattern — Rubik-like interactive 3x3 grid
 *
 * - Click a tile: if you're hovering a row that row rotates left; if hovering a column that column rotates down.
 * - Row/col arrows: explicit controls at the sides/top/bottom to rotate that row/col.
 * - Keyboard arrows: operate on hovered row/col, or middle (index 1) when none hovered.
 * - Tiles have light pastel gradients and subtle floating animation + pulse.
 */

const tileGradient = (id) =>
  `linear-gradient(135deg,
    hsl(${(200 + id * 22) % 360} 70% 92%),
    hsl(${(230 + id * 18) % 360} 75% 88%)
  )`;

const ArrowBtn = ({ onClick, children, style, aria }) => (
  <motion.button
    onClick={onClick}
    style={style}
    aria-label={aria}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="w-9 h-9 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center shadow-md cursor-pointer transition opacity-20"
  >
    {children}
  </motion.button>
);

const AuthImagePattern = ({
  title = "Create Account",
  subtitle = "Beautiful animated cube",
}) => {
  // 3x3 matrix storing tile ids so colors/IDs move with tiles
  const [cubes, setCubes] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ]);

  // hovered row/col for keyboard and highlight
  const [hoverRow, setHoverRow] = useState(null);
  const [hoverCol, setHoverCol] = useState(null);

  // refs to always read latest hovered positions inside keyboard handler
  const hoverRowRef = useRef(null);
  const hoverColRef = useRef(null);
  useEffect(() => {
    hoverRowRef.current = hoverRow;
    hoverColRef.current = hoverCol;
  }, [hoverRow, hoverCol]);

  // rotate row: dir = 1 -> right shift; dir = -1 -> left shift
  const rotateRow = (rowIndex, dir = 1) => {
    setCubes((prev) => {
      const next = prev.map((r) => [...r]);
      const row = next[rowIndex];
      if (dir === 1) row.unshift(row.pop()); // right
      else row.push(row.shift()); // left
      next[rowIndex] = row;
      return next;
    });
  };

  // rotate column: dir = 1 -> down shift; dir = -1 -> up shift
  const rotateCol = (colIndex, dir = 1) => {
    setCubes((prev) => {
      const next = prev.map((r) => [...r]);
      const col = [next[0][colIndex], next[1][colIndex], next[2][colIndex]];
      if (dir === 1) col.unshift(col.pop()); // down
      else col.push(col.shift()); // up
      for (let i = 0; i < 3; i++) next[i][colIndex] = col[i];
      return next;
    });
  };

  // Keyboard controls — arrow keys act on hovered row/col, fallback to middle (1)
  useEffect(() => {
    const handleKey = (e) => {
      const r = hoverRowRef.current != null ? hoverRowRef.current : 1;
      const c = hoverColRef.current != null ? hoverColRef.current : 1;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        rotateRow(r, -1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        rotateRow(r, 1);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        rotateCol(c, -1);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        rotateCol(c, 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // wrapper size (grid fixed size — change for responsiveness if you like)
  const GRID_PX = 400;
  const ARROW_OFFSET = 24; // how far arrows sit from grid edges
  const cellPercent = 100 / 3;

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 relative overflow-hidden">
      <div className="max-w-xl text-center relative z-10">
        {/* Grid container */}
        <div
          className="relative mx-auto"
          style={{ width: GRID_PX, height: GRID_PX }}
        >
          {/* the 3x3 grid itself */}
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              width: "100%",
              height: "100%",
              borderRadius: 16,
            }}
          >
            {cubes.flat().map((id, flatIdx) => {
              const row = Math.floor(flatIdx / 3);
              const col = flatIdx % 3;
              const highlight = hoverRow === row || hoverCol === col;

              return (
                <motion.div
                  key={id}
                  layout
                  onMouseEnter={() => {
                    setHoverRow(row);
                    setHoverCol(col);
                  }}
                  onMouseLeave={() => {
                    setHoverRow(null);
                    setHoverCol(null);
                  }}
                  onClick={() => {
                    if (hoverRow === row) rotateRow(row, -1);
                    else if (hoverCol === col) rotateCol(col, 1);
                  }}
                  whileHover={{
                    scale: 1.12,
                    y: -5,
                    filter: "brightness(1.04) saturate(1.2) blur(0.4px)",
                    boxShadow:
                      "0 0 35px rgba(99,102,241,0.5), 0 0 60px rgba(236,72,153,0.3)",
                  }}
                  whileTap={{ scale: 0.96, y: 0 }}
                  className={`rounded-2xl flex items-center justify-center text-2xl font-semibold text-white cursor-pointer select-none relative animate-pulse`}
                  style={{
                    background: tileGradient(id),
                    border: highlight
                      ? "2px solid rgba(59,130,246,0.16)"
                      : "1px solid rgba(0,0,0,0.04)",
                    boxShadow: `
                        0 0 12px rgba(255,255,255,0.15), 
                        0 0 24px rgba(99,102,241,0.25), 
                        inset 0 -6px 18px rgba(255,255,255,0.05)`,
                    backdropFilter: "saturate(120%)",
                  }}
                >
                  <span
                    style={{
                      textShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      opacity: 0.7,
                    }}
                  >
                    {/* {id + 1} */}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Title & subtitle */}
        <h2 className="text-3xl font-extrabold mt-8 mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-base-content/70 text-lg">{subtitle}</p>
      </div>

      {/* decorative floating blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.2), transparent)",
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.10), transparent)",
        }}
        animate={{ scale: [1.15, 1, 1.2], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 5.5, repeat: Infinity }}
      />
    </div>
  );
};

export default AuthImagePattern;
