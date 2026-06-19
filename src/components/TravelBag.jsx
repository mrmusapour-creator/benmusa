import { motion } from 'framer-motion';

export function TravelBag({ variant = 'standard', title, description, imageUrl, onClick }) {
  const isVip = variant === 'vip';

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-lg border p-6 text-start shadow-luxury transition ${
        isVip ? 'border-gold-brand/45 bg-teal-ink text-white' : 'border-teal-brand/15 bg-white text-ink'
      }`}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,162,39,.2),transparent_38%)] opacity-80" />
      <span className="relative mx-auto mb-8 block aspect-[4/3] w-full max-w-sm">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="absolute inset-x-6 bottom-0 h-[82%] w-[calc(100%-3rem)] rounded-lg object-cover shadow-2xl" />
        ) : (
          <span className={`travel-bag ${isVip ? 'vip-bag' : 'standard-bag'} absolute inset-x-6 bottom-0`} />
        )}
        <span className="absolute inset-x-12 bottom-2 h-10 rounded-full bg-gold-brand/20 blur-2xl transition group-hover:bg-gold-brand/40" />
      </span>
      <span className="relative block font-serif text-3xl font-bold">{title}</span>
      <span className={`relative mt-3 block text-sm leading-7 ${isVip ? 'text-white/75' : 'text-ink/65'}`}>{description}</span>
    </motion.button>
  );
}
