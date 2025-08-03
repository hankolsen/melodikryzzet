export const getArrowKey = (key: string) => {
	const [, arrow] = key.match(/Arrow((?:Up|Down|Left|Right))$/) || [];
	return arrow;
};
