import { LinkPreview } from "@/components/link-preview";
import BetterLyrics from "@/components/projects/better-lyrics";
import Blog from "@/components/projects/blog";
import CampSDK from "@/components/projects/camp-sdk";
import CampUIKit from "@/components/projects/camp-ui-kit";
import CreateReefDapp from "@/components/projects/create-reef-dapp";
import DopeUI from "@/components/projects/dope-ui";
import EIP6963 from "@/components/projects/eip-6963";
import FlowHackathon from "@/components/projects/flow-hackathon";
import PortfolioWebsite from "@/components/projects/portfolio-website";
import Rang from "@/components/projects/rang";
import ReefExplorer from "@/components/projects/reef-explorer";
import ReefWallet from "@/components/projects/reef-wallet";
import Rezonance from "@/components/projects/rezonance";
import SquidApp from "@/components/projects/sqwid-app";
import TomJerry from "@/components/projects/tom-jerry";
import Vinyl from "@/components/projects/vinyl";
import WalletConnectDocs from "@/components/projects/walletconnect-docs";
import type { ProjectItem } from "./projects";

export const PROJECT_ITEMS: ProjectItem[] = [
	{
		id: "better-lyrics",
		title: "Better Lyrics",
		description: "Youtube music lyrics on steroids.",
		link: "https://better-lyrics.boidu.dev/",
		image:
			"https://raw.githubusercontent.com/boidushya/better-lyrics/master/images/icons/icon-512.png",
		component: BetterLyrics,
	},
	{
		id: "rang",
		title: "Rang - The Color Accuracy Game",
		description:
			"Match the target color as fast as you can. Give it a try, I've been told it's quite addictive!",
		link: "https://rang.boidu.dev",
		image: "https://rang.boidushya.com/favicon.ico",
		component: Rang,
	},
	{
		id: "eip-6963",
		title: "EIP-6963",
		description: "A playground for testing EIP-6963",
		link: "https://eip6963.org",
		image: "https://eip6963.org/favicon.ico",
		component: EIP6963,
	},
	{
		id: "blog",
		title: "Blog",
		description: "A place for my thoughts and experiences",
		link: "https://blog.boidu.dev",
		image: "https://blog.boidu.dev/favicon.ico",
		component: Blog,
	},
	{
		id: "camp-ui-kit",
		title: "Camp UI Kit",
		description:
			"A collection of React components for building Camp Network dapps",
		link: "https://camp-ui-kit.vercel.app",
		image:
			"https://pbs.twimg.com/profile_images/1774932612160557056/QOyzwbO2_400x400.jpg",
		component: CampUIKit,
	},
	{
		id: "camp-sdk",
		title: "Camp SDK",
		description: "A simple SDK for authenticating users with Camp Network",
		link: "https://github.com/campaign-layer/camp-sdk",
		image:
			"https://pbs.twimg.com/profile_images/1774932612160557056/QOyzwbO2_400x400.jpg",
		component: CampSDK,
	},
	{
		id: "walletconnect-docs",
		title: "WalletConnect Docs",
		description:
			"Documentation for WalletConnect SDKs. I was responsible for the 2023 docs refactor.",
		link: "https://docs.walletconnect.com",
		image: "https://avatars.githubusercontent.com/u/37784886?s=200&v=4",
		component: WalletConnectDocs,
	},
	{
		id: "dope-ui",
		title: "This Website is Dope",
		description: "A UI-Kit for creating neo-modern glassmorphic websites",
		link: "https://dope.boidushya.com",
		image: "https://dope.boidushya.com/logo-white.svg",
		component: DopeUI,
	},
	{
		id: "sqwid-app",
		title: "Sqwid App",
		description:
			"Sqwid is an NFT marketplace running on the Reef chain that features per-item customizable royalties.",
		link: "https://www.sqwid.app",
		image: "https://www.sqwid.app/favicon.ico",
		component: SquidApp,
	},
	{
		id: "rezonance",
		title: "Rezonance",
		description:
			"Rezonance lets you play your favorite songs in high quality without getting interrupted by ads",
		link: "https://listen.rezonance.in/",
		image: "https://rezonance.in/favicon.png",
		component: Rezonance,
	},
	{
		id: "portfolio-website",
		title: "Portfolio Website",
		description:
			"My very own portfolio website (haha not this one). The terminal system is built without using any third party modules",
		link: "https://boidushya.com",
		image: "https://www.boidushya.com/assets/favicon/logo.png",
		component: PortfolioWebsite,
	},
	{
		id: "create-reef-dapp",
		title: "Create Reef Dapp",
		description: "Starter kit/ Boilerplate for bootstrapping a React Reef Dapp",
		link: "https://github.com/boidushya/create-reef-dapp",
		image: "https://reef.io/favicons/apple-touch-icon.png",
		component: CreateReefDapp,
	},
	{
		id: "tom-jerry",
		title: "Every Tom and Jerry Frame in Order",
		description:
			"A facebook bot that posted Tom and Jerry frames one at a time.",
		link: "https://www.facebook.com/etjfo/",
		image: "https://www.facebook.com/images/fb_icon_325x325.png",
		component: TomJerry,
	},
	{
		id: "flow-hackathon",
		title: "Flow Hackathon",
		description: "Created the landing page for the Flow Hackathon",
		link: "https://hackathon.flow.com/",
		image:
			"https://cdn.prod.website-files.com/5f734f4dbd95382f4fdfa0ea/67e175cb23ef717b2fbd75d7_Flow_Icon_Color.png",
		component: FlowHackathon,
	},
	{
		id: "vinyl",
		title: "Vinyl",
		description:
			"A music-based hangman. Runners up of AWS Amplify x Hashnode Hackathon",
		link: "https://vinyl-client.vercel.app/",
		image: "https://vinyl-client.vercel.app/favicon.ico",
		component: Vinyl,
	},
	{
		id: "reef-wallet",
		title: "Reef Wallet",
		description: "A wallet for the Reef chain",
		link: "https://reefwallet.boidu.dev",
		image: "https://reefwallet.boidu.dev/favicon.ico",
		component: ReefWallet,
	},
	{
		id: "reef-explorer",
		title: "Reef Explorer",
		description: "A block explorer for the Reef chain",
		link: "https://reefscan.com/",
		image: "https://reef.io/favicons/apple-touch-icon.png",
		component: ReefExplorer,
	},
];

export const WORK_ITEMS = [
	{
		logo: "https://pbs.twimg.com/profile_images/1948758995100938240/kSWf3cNk_400x400.jpg",
		alt: "Junction",
		link: "https://junction.exchange",
		content: (
			<>
				I used to work as a Frontend Lead at{" "}
				<LinkPreview url="https://junction.exchange">Junction</LinkPreview>. My
				role involved leading our frontend development efforts and making sure
				the UI/UX is <em>muy bueno</em> ✨
			</>
		),
	},
	{
		logo: "https://pbs.twimg.com/profile_images/1774932612160557056/QOyzwbO2_400x400.jpg",
		alt: "Camp Network",
		link: "https://campnetwork.xyz",
		content: (
			<>
				Previously, I worked as a Frontend Lead at{" "}
				<LinkPreview url="https://www.campnetwork.xyz/">
					Camp Network
				</LinkPreview>
				. My day-to-day involved curating frontend architectures for various
				projects/dapps under the Camp Network umbrella.
			</>
		),
	},
	{
		logo: "https://avatars.githubusercontent.com/u/37784886?s=200&v=4",
		alt: "WalletConnect",
		link: "https://walletconnect.com",
		content: (
			<>
				I used to be a Sr. JS Engineer turned Developer Relations Engineer at{" "}
				<LinkPreview url="https://walletconnect.com">WalletConnect</LinkPreview>
				. I worked on developer education, documentation, and community
				engagement. I also helped developers build dapps using WalletConnect.
			</>
		),
	},
	{
		logo: "https://avatars.githubusercontent.com/u/69769634?s=200&v=4",
		alt: "Reef",
		link: "https://reef.io",
		content: (
			<>
				Previously, I've worked at{" "}
				<LinkPreview url="https://reef.io">Reef</LinkPreview> as a Mobile & App
				Developer. During my time at Reef, I worked on{" "}
				<LinkPreview url="https://sqwid.app">Sqwid</LinkPreview>, an NFT
				marketplace running on the Reef chain that features per-item
				customizable royalties. I was also a part of the Developer Relations
				team at Reef & hosted several workshops both virtually and irl.
			</>
		),
	},
	{
		logo: "/logo.jpg",
		alt: "Freelance",
		link: "https://boidu.dev",
		content: (
			<>
				I'm always open to freelance work. If you're interested, feel free to{" "}
				<a
					href="mailto:hi@boidushya.com?subject=Hi Boidushya!&body=Heard you're available for freelancing, are you up for a chat?"
					target="_blank"
					rel="noreferrer"
					className="text-[var(--color-fg)] font-semibold hover:no-underline"
				>
					email me
				</a>
			</>
		),
	},
];
