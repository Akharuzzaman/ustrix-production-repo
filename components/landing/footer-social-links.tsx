import Image from 'next/image';
import { SOCIAL_LINKS } from './data';
import styles from './landing.module.css';

export default function FooterSocialLinks() {
  return (
    <div className={styles.footerSocial}>
      <p className={styles.footerSocialLabel}>Follow USTRIX</p>
      <ul className={styles.footerSocialList}>
        {SOCIAL_LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className={styles.footerSocialLink}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
            >
              <span className={styles.footerSocialIcon}>
                <Image
                  src={link.iconSrc}
                  alt=""
                  width={20}
                  height={20}
                  className={styles.footerSocialIconImage}
                />
              </span>
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
