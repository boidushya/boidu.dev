import type { ProjectItem } from "./projects";

export type BentoSize =
	| "small"
	| "medium"
	| "large"
	| "wide"
	| "tall"
	| "smallWide";

export interface BentoProjectConfig extends ProjectItem {
	size: BentoSize;
	featured?: boolean;
}

export const BENTO_LAYOUT_ORDER = [
	{ id: "better-lyrics", size: "large" as BentoSize },
	{ id: "rang", size: "medium" as BentoSize },
	{ id: "eip-6963", size: "small" as BentoSize },
	{ id: "blog", size: "small" as BentoSize },
	{ id: "camp-ui-kit", size: "smallWide" as BentoSize },
	{ id: "camp-sdk", size: "small" as BentoSize },
	{ id: "dope-ui", size: "small" as BentoSize },
	{ id: "rezonance", size: "medium" as BentoSize },
	{ id: "sqwid-app", size: "small" as BentoSize },
	{ id: "portfolio-website", size: "small" as BentoSize },
	{ id: "walletconnect-docs", size: "large" as BentoSize },
	{ id: "tom-jerry", size: "smallWide" as BentoSize },
	{ id: "create-reef-dapp", size: "small" as BentoSize },
	{ id: "flow-hackathon", size: "small" as BentoSize },
	{ id: "vinyl", size: "small" as BentoSize },
	{ id: "reef-wallet", size: "small" as BentoSize },
	{ id: "reef-explorer", size: "smallWide" as BentoSize },
];

export const BENTO_LAYOUT: Record<string, BentoSize> =
	BENTO_LAYOUT_ORDER.reduce(
		(acc, item) => {
			acc[item.id] = item.size;
			return acc;
		},
		{} as Record<string, BentoSize>,
	);

export const BENTO_GRID_CLASSES =
	"grid auto-rows-[128px] gap-5 sm:grid-cols-4 grid-cols-1";
