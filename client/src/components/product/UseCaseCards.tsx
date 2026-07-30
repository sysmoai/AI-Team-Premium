import { motion } from "framer-motion";
import { langOf } from "@/lib/lang";

export interface UseCase {
  emoji: string;
  emojiColor?: string;
  title: string;
  who: string;
  what: string;
  timeSaved: string;
  examplePrompt: string;
}

interface UseCaseCardsProps {
  useCases: UseCase[];
  productName?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function UseCaseCards({ useCases }: UseCaseCardsProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {useCases.slice(0, 7).map((uc, i) => {
        const bg = uc.emojiColor ?? "#2563EB";
        return (
          <motion.div
            key={i}
            variants={card}
            whileHover={{ y: -8, boxShadow: "0 20px 48px rgba(37,99,235,0.14)" }}
            className="flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden cursor-default transition-shadow"
            data-testid={`use-case-card-${i}`}
          >
            <div
              className="h-1"
              style={{ background: `linear-gradient(90deg, ${bg} 0%, transparent 100%)` }}
            />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div
                className="flex items-center justify-center rounded-xl text-2xl"
                style={{ width: 48, height: 48, background: `${bg}15` }}
              >
                {uc.emoji}
              </div>
              <h3 {...langOf(uc.title)} className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight">{uc.title}</h3>
              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <div>
                  <span className="font-semibold text-gray-400 dark:text-gray-500 uppercase text-[10px] tracking-wide">WHO</span>
                  <p {...langOf(uc.who)} className="mt-0.5">{uc.who}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-400 dark:text-gray-500 uppercase text-[10px] tracking-wide">WHAT</span>
                  <p {...langOf(uc.what)} className="mt-0.5">{uc.what}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-400 dark:text-gray-500 uppercase text-[10px] tracking-wide">TIME SAVED</span>
                  <p className="mt-0.5 text-emerald-600 dark:text-emerald-400 font-medium">{uc.timeSaved}</p>
                </div>
              </div>
              <div className="mt-auto pt-2">
                <span className="font-semibold text-gray-400 dark:text-gray-500 uppercase text-[10px] tracking-wide">EXAMPLE PROMPT</span>
                <p {...langOf(uc.examplePrompt)} className="mt-1 font-mono text-xs bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {uc.examplePrompt}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
