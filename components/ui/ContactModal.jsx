"use client";

import Modal from "@/components/ui/Modal";
import ContactForm from "@/components/ui/ContactForm";
import CloseButton from "@/components/common/CloseButton";
import { quickContactFields } from "@/data/contactFields";
import { submitForm } from "@/lib/submitForm";

const TITLE_ID = "get-in-touch-modal-title";

// Sends the popup's values to the same endpoint as the contact page
const handleSubmit = (values) => submitForm("/api/contact", values);

/** The "Get in Touch" popup. Loaded on demand by ContactModalProvider. */
export default function ContactModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy={TITLE_ID}
      contentClassName="justify-center px-[4vw] max-md:px-4"
    >
      <div className="relative w-full max-w-[75vw] max-h-[85vh] overflow-y-auto rounded-[2vw] bg-white/5 backdrop-blur-lg border border-white/10 text-white p-[3vw] max-[1025px]:max-w-[85vw] max-[1025px]:p-8 max-md:max-w-full max-md:p-6 max-md:rounded-3xl">
        <div className="absolute top-[2vw] right-[2vw] max-[1025px]:top-6 max-[1025px]:right-6 max-md:top-4 max-md:right-4">
          <CloseButton onClick={onClose} />
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-[3vw] items-start max-[1025px]:grid-cols-1 max-[1025px]:gap-8 pt-[4vw]">
          <div>
            <h2 id={TITLE_ID} className="text-[4.8vw] leading-[1.1]! max-[1025px]:text-[5vw] max-md:text-[8vw]">
              Get in Touch
            </h2>
            <p className="mt-[1vw] text-[1.1vw] text-white max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
              Tell us what you&apos;re building — we&apos;ll get back to you within one business day.
            </p>
          </div>
          <div className="get-in-touch-form">
            <ContactForm
              fields={quickContactFields}
              onSubmit={handleSubmit}
              submitLabel="Send Message"
              successMessage="Thanks — we've received your message and will respond within one business day."
              errorMessage="Something went wrong. Please try again or email us directly."
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
