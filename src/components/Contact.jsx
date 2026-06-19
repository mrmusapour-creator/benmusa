import { Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { contentText } from '../services/contentService';
import { SectionHeader } from './SectionHeader';

export function Contact({ content }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage;

  return (
    <section id="contact" className="bg-pearl py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <SectionHeader title={contentText(content, 'contact', 'title', language) || t('contact.title')} subtitle={contentText(content, 'contact', 'subtitle', language) || t('contact.subtitle')} centered={false} />
          <div className="grid gap-4">
            <ContactRow icon={Phone} label={t('contact.phone')} value={content?.contact?.phone || '+966 55 000 1888'} />
            <ContactRow icon={MessageCircle} label={t('contact.whatsapp')} value={content?.contact?.whatsapp || '+966 55 000 1888'} />
            <ContactRow icon={MapPin} label={t('contact.address')} value={contentText(content, 'contact', 'address', language) || t('contact.addressValue')} />
          </div>
          {content?.contact?.image_url && <img src={content.contact.image_url} alt="" className="mt-5 aspect-[4/3] w-full rounded-lg object-cover shadow-luxury" />}
        </div>
        <form className="rounded-lg border border-teal-brand/10 bg-white p-6 shadow-luxury" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t('contact.name')} placeholder={t('contact.namePlaceholder')} />
            <Field label={t('contact.email')} placeholder={t('contact.emailPlaceholder')} type="email" icon={Mail} />
          </div>
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-ink">{t('contact.message')}</span>
            <textarea
              rows="5"
              placeholder={t('contact.messagePlaceholder')}
              className="w-full rounded-lg border border-teal-brand/15 bg-pearl px-4 py-3 text-ink outline-none transition focus:border-gold-brand focus:bg-white focus:ring-4 focus:ring-gold-brand/20"
            />
          </label>
          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-brand px-6 py-4 font-black text-white shadow-luxury transition hover:-translate-y-1 hover:bg-teal-ink sm:w-auto"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {t('contact.send')}
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-white bg-white/80 p-4 shadow-sm">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-teal-brand text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-bold text-gold-brand">{label}</p>
        <p className="font-black text-ink">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-teal-brand/15 bg-pearl px-4 py-3 text-ink outline-none transition focus:border-gold-brand focus:bg-white focus:ring-4 focus:ring-gold-brand/20"
      />
    </label>
  );
}
