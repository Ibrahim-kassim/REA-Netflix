// One-open-at-a-time accordion (the FAQ). Keyboard and screen-reader friendly.
import { useId, useState } from 'react';
import { cn } from '@/utils/cn';

export type AccordionItem = { question: string; answer: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <li key={item.question} className="bg-surface-2">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`${id}-${index}`}
              onClick={() => setOpen(expanded ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left text-lg font-medium hover:bg-line md:text-2xl"
            >
              {item.question}
              <span className={cn('text-3xl transition-transform duration-300', expanded && 'rotate-45')}>+</span>
            </button>
            <div id={`${id}-${index}`} hidden={!expanded} className="border-t border-ink p-6 text-lg leading-relaxed md:text-xl">
              {item.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
