import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { BRAND } from '@/brand/brand';
import { EmailCta } from './EmailCta';

const faq: AccordionItem[] = [
  { question: `What is ${BRAND.name}?`, answer: `${BRAND.name} streams open movies and shorts made by Blender Studio. It is a demo app built with REA and Claude Code.` },
  { question: `How much does ${BRAND.name} cost?`, answer: 'Nothing. Every film here is published under a Creative Commons licence.' },
  { question: 'Where can I watch?', answer: 'Anywhere with a modern browser: phone, tablet, laptop or TV.' },
  { question: 'Is it secure?', answer: 'Passwords are hashed with Argon2, sessions use httpOnly cookies, and every video link is signed and expires.' },
  { question: 'What can I watch?', answer: 'Thirteen open films, from Big Buck Bunny and Sintel to Sprite Fright and Charge.' },
  { question: 'Is it good for kids?', answer: 'Yes: family-friendly titles have their own row and maturity labels.' },
];

export function FaqSection() {
  return (
    <section className="mx-auto max-w-5xl px-6" aria-labelledby="faq">
      <h2 id="faq" className="mb-6 text-3xl font-black">Frequently Asked Questions</h2>
      <Accordion items={faq} />
      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <p className="text-lg">Ready to watch? Enter your email to create your free account.</p>
        <EmailCta />
      </div>
    </section>
  );
}
