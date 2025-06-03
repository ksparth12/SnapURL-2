import { ContactForm } from '@/components/contact/contact-form';
import { ContactInfo } from '@/components/contact/contact-info';
import { ContactHero } from '@/components/contact/contact-hero';

export const metadata = {
  title: 'Contact Me | Parth Sharma',
  description: 'Get in touch with Parth Sharma for collaboration, questions, or just to say hello.',
};

export default function Contact() {
  return (
    <div className="flex flex-col items-center w-full">
      <ContactHero />
      <div className="container py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}