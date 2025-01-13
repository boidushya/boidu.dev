import { motion } from "framer-motion";
import { Fragment } from "react";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.125,
    },
  },
};

const itemVariants = {
  initial: {
    opacity: 0,
    filter: "blur(3px)",
    y: -20,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
  },
};

const WORK_ITEMS = [
  {
    logo: "https://pbs.twimg.com/profile_images/1828904295908970496/8ntwuIGn_400x400.jpg",
		alt: "Junction",
		link: "https://junction.exchange",
    content: (
      <>
        I'm currently working as a Frontend Lead at{" "}
        <a href="https://junction.exchange" target="_blank" rel="noreferrer">
          Junction
        </a>
        . My role involves leading our frontend development efforts and making sure the UI/UX is{" "}
        <em>muy bueno</em> ✨
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
        <a href="https://www.campnetwork.xyz/" target="_blank" rel="noreferrer">
          Camp Network
        </a>
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
        <a href="https://walletconnect.com" target="_blank" rel="noreferrer">
          WalletConnect
        </a>
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
        <a href="https://reef.io" target="_blank" rel="noreferrer">
          Reef{" "}
        </a>
        as a Mobile & App Developer. During my time at Reef, I worked on{" "}
        <a href="https://sqwid.app" target="_blank" rel="noreferrer">
          Sqwid
        </a>
        , an NFT marketplace running on the Reef chain that features
        per-item customizable royalties. I was also a part of the Developer
        Relations team at Reef & hosted several workshops both virtually and
        irl.
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
        >
          email me
        </a>
      </>
    ),
  },
];

export interface WorkItemProps {
  logo: string;
  alt: string;
	children: React.ReactNode;
	grayScale?: boolean;
  showGlow?: boolean;
}

const WorkItem = ({ logo, alt, children, showGlow = false, grayScale = false }: WorkItemProps) => {
  return (
    <motion.div variants={itemVariants} className="relative work-title">
			<motion.img
				initial={{
            filter: "grayscale(0%)",
          }}
          animate={{
						filter: !showGlow && grayScale ? "grayscale(100%)" : "grayscale(0%)",
          }}
          transition={{
            delay: 1.25,
            duration: 0.5,
					}}
				className={`work-logo`} src={logo} alt={alt} />
      <span>{children}</span>
      {showGlow && (
        <motion.img
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 1,
          }}
          className="absolute top-0 -left-2 -z-[1] size-[4rem] object-cover blur-xl saturate-150"
          src={logo}
          alt={alt}
        />
      )}
    </motion.div>
  );
};


const WorkSection = () => {
	const currentWork = WORK_ITEMS[0];

  return (
    <>
      <h3>
        I'm currently working at{" "}
        <a href={currentWork.link}target="_blank" rel="noreferrer">
          {currentWork.alt}
        </a>
      </h3>
      <motion.div variants={containerVariants} initial="initial" animate="animate">
        {WORK_ITEMS.map((item, index) => (
          <Fragment key={item.alt}>
            <WorkItem
              logo={item.logo}
              alt={item.alt}
							showGlow={index === 0}
							grayScale={index !== WORK_ITEMS.length - 1}
            >
              {item.content}
            </WorkItem>
            {index !== WORK_ITEMS.length - 1 && <br />}
          </Fragment>
        ))}
      </motion.div>
    </>
  );
};

export default WorkSection;
