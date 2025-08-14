import { AnimatedContainer, AnimatedLink } from "@/components/shared";
import { CONTACT_TEXTS, LINK_PROPS, SOCIAL_LINKS } from "@/utils/contact";

const ContactSection = () => {
	return (
		<>
			<h3>{CONTACT_TEXTS.SECTION_TITLE}</h3>
			<AnimatedContainer className="flex flex-wrap items-center gap-4">
				{SOCIAL_LINKS.map((link) => (
					<AnimatedLink key={link.label} href={link.href} {...LINK_PROPS}>
						{link.label}
					</AnimatedLink>
				))}
			</AnimatedContainer>
		</>
	);
};

export default ContactSection;
