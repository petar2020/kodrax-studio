"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";

import { defaultLocale, getDictionary, type Locale } from "@/lib/i18n";

import styles from "./ContactForm.module.css";

interface FormValues {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface ContactFormProps {
  locale?: Locale;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  service: "",
  message: ""
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ locale = defaultLocale }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const dictionary = getDictionary(locale);
  const serviceOptions = useMemo(() => dictionary.contactForm.serviceOptions, [dictionary]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);

    if (!emailPattern.test(values.email)) {
      setError(dictionary.contactForm.invalidEmail);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await Promise.race([
        new Promise((resolve) => setTimeout(resolve, 900)),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 3200))
      ]);

      setSuccess(true);
      setValues(initialValues);
      alert(dictionary.contactForm.alertMessage);
    } catch {
      setError(dictionary.contactForm.networkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span>{dictionary.contactForm.nameLabel}</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={onChange}
          placeholder={dictionary.contactForm.namePlaceholder}
          required
        />
      </label>

      <label className={styles.field}>
        <span>{dictionary.contactForm.emailLabel}</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={onChange}
          placeholder={dictionary.contactForm.emailPlaceholder}
          required
        />
      </label>

      <label className={styles.field}>
        <span>{dictionary.contactForm.serviceLabel}</span>
        <select name="service" value={values.service} onChange={onChange} required>
          <option value="">{dictionary.contactForm.servicePlaceholder}</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>{dictionary.contactForm.messageLabel}</span>
        <textarea
          name="message"
          value={values.message}
          onChange={onChange}
          placeholder={dictionary.contactForm.messagePlaceholder}
          rows={7}
          required
        />
      </label>

      <button type="submit" className={`button ${styles.submit}`} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle size={16} className={styles.loadingIcon} />
            <span>{dictionary.contactForm.submitting}</span>
          </>
        ) : (
          dictionary.contactForm.submit
        )}
      </button>

      {success ? (
        <p className={styles.success} role="status">
          {dictionary.contactForm.success}
        </p>
      ) : null}

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
