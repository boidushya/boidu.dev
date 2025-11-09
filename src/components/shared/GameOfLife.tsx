import { useCallback, useEffect, useRef } from "react";

interface GameOfLifeProps {
	colors: string[];
	children?: React.ReactNode;
	className?: string;
}

export const GameOfLife = ({
	colors,
	children,
	className = "",
}: GameOfLifeProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationIdRef = useRef<number>();
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

	const resizeCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}, []);

	const gridRef = useRef<boolean[][]>([]);
	const lastUpdateRef = useRef(0);
	const gridHistoryRef = useRef<Set<string>>(new Set());
	const stuckCounterRef = useRef(0);

	const initializeGrid = useCallback((cols: number, rows: number) => {
		const grid = Array(rows)
			.fill(null)
			.map(() => Array(cols).fill(false));
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				grid[y][x] = Math.random() < 0.15;
			}
		}
		gridRef.current = grid;
	}, []);

	const countNeighbors = useCallback(
		(grid: boolean[][], x: number, y: number) => {
			let count = 0;
			const rows = grid.length;
			const cols = grid[0].length;

			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) {
					if (dx === 0 && dy === 0) continue;
					const ny = (y + dy + rows) % rows;
					const nx = (x + dx + cols) % cols;
					if (grid[ny][nx]) count++;
				}
			}
			return count;
		},
		[],
	);

	const gridToString = useCallback((grid: boolean[][]) => {
		// Use a more efficient string building method
		let result = "";
		for (const row of grid) {
			for (const cell of row) {
				result += cell ? "1" : "0";
			}
		}
		return result;
	}, []);

	const updateGrid = useCallback(() => {
		const grid = gridRef.current;
		if (!grid.length) return;

		const rows = grid.length;
		const cols = grid[0].length;
		const newGrid = Array(rows)
			.fill(null)
			.map(() => Array(cols).fill(false));

		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				const neighbors = countNeighbors(grid, x, y);
				const alive = grid[y][x];

				if (alive && (neighbors === 2 || neighbors === 3)) {
					newGrid[y][x] = true;
				} else if (!alive && neighbors === 3) {
					newGrid[y][x] = true;
				}
			}
		}

		const newGridString = gridToString(newGrid);
		const history = gridHistoryRef.current;

		if (history.has(newGridString)) {
			stuckCounterRef.current++;
			if (stuckCounterRef.current > 2) {
				initializeGrid(cols, rows);
				gridHistoryRef.current = new Set();
				stuckCounterRef.current = 0;
				return;
			}
		} else {
			stuckCounterRef.current = 0;
		}

		history.add(newGridString);
		// Keep only the last 10 states by converting to array
		if (history.size > 10) {
			const arr = Array.from(history);
			history.clear();
			arr.slice(-10).forEach((item) => history.add(item));
		}

		gridRef.current = newGrid;
	}, [countNeighbors, gridToString, initializeGrid]);

	const drawGameOfLife = useCallback(
		(ctx: CanvasRenderingContext2D, width: number, height: number) => {
			const cellSize = 4;
			const cols = Math.floor(width / cellSize);
			const rows = Math.floor(height / cellSize);

			if (!gridRef.current.length || gridRef.current.length !== rows) {
				initializeGrid(cols, rows);
			}

			const grid = gridRef.current;

			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					if (grid[y][x]) {
						const colorIndex = (x + y) % colors.length;
						ctx.fillStyle = colors[colorIndex];
						ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
					}
				}
			}
		},
		[colors, initializeGrid],
	);

	const animate = useCallback(
		(time: number) => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			// Cache the context
			if (!ctxRef.current) {
				ctxRef.current = canvas.getContext("2d");
			}
			const ctx = ctxRef.current;
			if (!ctx) return;

			// Only update grid at 24fps
			if (time - lastUpdateRef.current > 1000 / 24) {
				updateGrid();
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawGameOfLife(ctx, canvas.width, canvas.height);
				lastUpdateRef.current = time;
			}

			animationIdRef.current = requestAnimationFrame(animate);
		},
		[updateGrid, drawGameOfLife],
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		resizeCanvas();

		const resizeObserver = new ResizeObserver(resizeCanvas);
		resizeObserver.observe(canvas);

		animationIdRef.current = requestAnimationFrame(animate);

		return () => {
			resizeObserver.disconnect();
			if (animationIdRef.current) {
				cancelAnimationFrame(animationIdRef.current);
			}
		};
	}, [resizeCanvas, animate]);

	return (
		<div className={`absolute inset-0 ${className}`}>
			<canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
			{children && (
				<div className="relative z-10 flex items-center justify-center h-full p-4">
					{children}
				</div>
			)}
		</div>
	);
};
