<script lang="ts">
	import { CELL_WIDTH } from '$lib/constants';

	type Props = {
		row: number;
		column: number;
	};
	const { row, column }: Props = $props();

	const lineLength = 7;
	const strokeWidth = 1;

	const hx1 = (column + 1) * (CELL_WIDTH + 1) - 3;
	const hx2 = hx1 - lineLength;
	const hy1 = row * (CELL_WIDTH + 1) + 4;
	const hy2 = hy1;

	const vx1 = hx1;
	const vx2 = vx1;
	const vy1 = hy1;
	const vy2 = vy1 + lineLength;
</script>

<g>
	<line x1={vx1} y1={vy1} x2={vx2} y2={vy2} stroke-width={strokeWidth} stroke="black" />
	<line x1={hx1} y1={hy1} x2={hx2} y2={hy2} stroke-width={strokeWidth} stroke="black" />
	<path d={`M${vx1 - 2},${vy2} L${vx1 + 2},${vy2} L${vx1},${vy2 + 5} z`} fill="#000" />
</g>
