'use client';

import Link from 'next/link';
import { useState } from 'react';
import UstrixLogo from '@/components/brand/ustrix-logo';
import {
  CAPABILITIES,
  DASHBOARD_METRICS,
  PLANS,
  SERVICE_AREAS,
  TESTIMONIALS,
  USER_TYPES,
} from './data';
import { useLanding } from './landing-provider';
import styles from './landing.module.css';
import ContactSupportForm from './contact-support-form';
import CookieBanner from './cookie-banner';
import { CrystalCard } from './crystal-frame';
import EnterpriseAudienceCards from './enterprise-audience-cards';
import EnterpriseHeroVisual from './enterprise-hero-visual';
import HowItWorksFlow from './how-it-works-flow';
import LiveJobBoard from './live-job-board';
import SiteHeader from './site-header';
import LandingIcon from './landing-icons';
import TrustIcon from './trust-icon';
import UtilityBar from './utility-bar';
import UstrixEcosystem from './ustrix-ecosystem';
import {
  formatPlanPrice,
  PLAN_PRICES,
  type BillingCycle,
} from './pricing';

export default function LandingPage() {
  const { t, currency } = useLanding();
  const [billing, setBilling] = useState<BillingCycle>('monthly');

  const trustItems = [
    {
      icon: 'marketplace' as const,
      title: t.trustMarketplace,
      description: t.trustMarketplaceText,
    },
    {
      icon: 'secure' as const,
      title: t.trustSecure,
      description: t.trustSecureText,
    },
    {
      icon: 'workflow' as const,
      title: t.trustWorkflows,
      description: t.trustWorkflowsText,
    },
    {
      icon: 'network' as const,
      title: t.trustNetwork,
      description: t.trustNetworkText,
    },
  ];

  const capabilityIcons = [
    'capability',
    'service',
    'order',
    'order',
    'quote',
    'subscription',
    'payment',
    'analytics',
  ] as const;

  return (
    <div className={styles.page}>
      <UtilityBar />
      <SiteHeader />
      <CookieBanner />

      {/* Hero banner */}
      <section className={styles.heroBanner} aria-labelledby="hero-title">
        <div className={styles.heroBannerFrame}>
          <div className={styles.heroBannerInner}>
            <div>
              <h1 id="hero-title" className={styles.heroTitle}>
                <span className={styles.heroTitleRed}>{t.heroHeadlineRed}</span>
                <span className={styles.heroTitleWhite}>
                  {t.heroHeadlineWhite}
                </span>
              </h1>
              <p className={styles.heroText}>{t.heroSubheadline}</p>
              <div className={styles.heroActions}>
                <Link href="/register" className={styles.btnPrimary}>
                  {t.getStarted}
                </Link>
                <a href="#ecosystem" className={styles.btnHeroSecondary}>
                  {t.exploreEcosystem}
                </a>
              </div>
            </div>
            <div className={styles.heroVisualWrap}>
              <EnterpriseHeroVisual />
            </div>
          </div>
        </div>
      </section>

      <EnterpriseAudienceCards />
      <UstrixEcosystem />

      {/* Trust */}
      <section className={styles.section} aria-labelledby="trust-title">
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <h2 id="trust-title" className={styles.sectionTitle}>
              {t.trustTitle}
            </h2>
          </div>
          <ul className={`${styles.cardGrid} ${styles.cardGrid4}`}>
            {trustItems.map((item) => (
              <li key={item.icon}>
                <CrystalCard className={styles.trustCrystalCard}>
                  <TrustIcon type={item.icon} />
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.description}</p>
                </CrystalCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* User types */}
      <section
        id="user-types"
        className={styles.sectionAlt}
        aria-labelledby="user-types-title"
      >
        <div className={styles.container}>
          <h2 id="user-types-title" className={styles.sectionTitle}>
            {t.userTypesTitle}
          </h2>
          <p className={styles.sectionLead}>{t.userTypesLead}</p>
          <ul className={`${styles.cardGrid} ${styles.cardGrid3}`}>
            {USER_TYPES.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className={styles.cardLinkCrystal}>
                  <CrystalCard className={styles.userTypeCard}>
                    <LandingIcon name={item.icon} size={24} />
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardText}>{item.description}</p>
                  </CrystalCard>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Buyers vs Sellers */}
      <section className={styles.section} aria-labelledby="buyers-sellers-title">
        <div className={styles.container}>
          <h2 id="buyers-sellers-title" className={styles.sectionTitle}>
            {t.buyersSellersTitle}
          </h2>
          <div className={styles.twoCol}>
            <CrystalCard className={styles.panelCrystal}>
              <LandingIcon name="buyers" size={24} />
              <h3 className={styles.panelTitle}>
                {t.buyersLabel}
              </h3>
              <p className={styles.cardText}>{t.buyersText}</p>
            </CrystalCard>
            <CrystalCard className={styles.panelCrystal}>
              <LandingIcon name="sellers" size={24} />
              <h3 className={styles.panelTitle}>
                {t.sellersLabel}
              </h3>
              <p className={styles.cardText}>{t.sellersText}</p>
            </CrystalCard>
          </div>
        </div>
      </section>

      {/* Areas of service */}
      <section
        id="areas-of-service"
        className={styles.sectionAlt}
        aria-labelledby="areas-title"
      >
        <div className={styles.container}>
          <h2 id="areas-title" className={styles.sectionTitle}>
            {t.areasTitle}
          </h2>
          <p className={styles.sectionLead}>{t.areasLead}</p>
          <ul className={`${styles.cardGrid} ${styles.cardGrid3}`}>
            {SERVICE_AREAS.map((area) => (
              <li key={area}>
                <CrystalCard className={styles.serviceCrystalCard}>
                  <LandingIcon name="service" size={22} />
                  <h3 className={styles.cardTitle}>{area}</h3>
                </CrystalCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Platform capabilities */}
      <section
        id="platform-capabilities"
        className={styles.section}
        aria-labelledby="capabilities-title"
      >
        <div className={styles.container}>
          <h2 id="capabilities-title" className={styles.sectionTitle}>
            {t.capabilitiesTitle}
          </h2>
          <ul className={`${styles.cardGrid} ${styles.cardGrid4}`}>
            {CAPABILITIES.map((cap, i) => (
              <li key={cap}>
                <CrystalCard className={styles.serviceCrystalCard}>
                  <LandingIcon name={capabilityIcons[i] ?? 'capability'} size={22} />
                  <h3 className={styles.cardTitle}>{cap}</h3>
                </CrystalCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HowItWorksFlow />
      <LiveJobBoard />

      {/* Subscription plans */}
      <section
        id="subscription-plans"
        className={styles.sectionAlt}
        aria-labelledby="plans-title"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <h2 id="plans-title" className={styles.sectionTitle}>
              {t.plansTitle}
            </h2>
            <div className={styles.billingToggle} role="group" aria-label="Billing cycle">
              <button
                type="button"
                className={
                  billing === 'monthly'
                    ? styles.billingBtnActive
                    : styles.billingBtn
                }
                onClick={() => setBilling('monthly')}
              >
                {t.billingMonthly}
              </button>
              <button
                type="button"
                className={
                  billing === 'yearly'
                    ? styles.billingBtnActive
                    : styles.billingBtn
                }
                onClick={() => setBilling('yearly')}
              >
                {t.billingYearly}
              </button>
            </div>
          </div>

          <ul className={styles.planGrid}>
            {PLANS.map((plan) => {
              const prices = PLAN_PRICES[currency][plan.code];
              const amount =
                billing === 'monthly' ? prices.monthly : prices.yearly;
              return (
                <li
                  key={plan.code}
                  className={`${styles.planCard} ${
                    plan.recommended ? styles.planRecommended : ''
                  }`}
                >
                  {plan.recommended && (
                    <span className={styles.badge}>{t.recommended}</span>
                  )}
                  <h3 className={styles.cardTitle}>{plan.name}</h3>
                  <p className={styles.planPrice}>
                    {formatPlanPrice(currency, amount, billing)}
                  </p>
                  <ul className={styles.planFeatures}>
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Link
                    href={`/register?plan=${plan.query}`}
                    className={styles.btnPrimary}
                  >
                    {plan.cta}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p
            className={styles.sectionLead}
            style={{ textAlign: 'center', marginTop: 28, marginBottom: 0 }}
          >
            {t.subscriptionNote}
          </p>
        </div>
      </section>

      {/* Dashboard overview */}
      <section
        id="dashboard-overview"
        className={styles.section}
        aria-labelledby="dashboard-title"
      >
        <div className={styles.container}>
          <h2 id="dashboard-title" className={styles.sectionTitle}>
            {t.dashboardTitle}
          </h2>
          <p className={styles.sectionLead}>{t.dashboardLead}</p>
          <div className={styles.metricGrid}>
            {DASHBOARD_METRICS.map((m) => (
              <div key={m.label} className={styles.metricCard}>
                <div className={styles.metricValue}>{m.value}</div>
                <div className={styles.metricLabel}>{m.label}</div>
              </div>
            ))}
          </div>
          <div className={styles.chartPlaceholder}>{t.chartPlaceholder}</div>
          <Link href="/tenant-status" className={styles.btnPrimary}>
            {t.dashboardCta}
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className={styles.sectionAlt}
        aria-labelledby="testimonials-title"
      >
        <div className={styles.container}>
          <h2 id="testimonials-title" className={styles.sectionTitle}>
            {t.testimonialsTitle}
          </h2>
          <ul className={`${styles.cardGrid} ${styles.cardGrid3}`}>
            {TESTIMONIALS.map((item) => (
              <li key={item.name} className={styles.quoteCard}>
                <p className={styles.quoteText}>&ldquo;{item.quote}&rdquo;</p>
                <p className={styles.quoteName}>{item.name}</p>
                <p className={styles.quoteRole}>{item.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSupportForm />

      {/* Final CTA */}
      <section className={styles.ctaBanner} aria-labelledby="final-cta-title">
        <h2 id="final-cta-title" className={styles.ctaTitle}>
          {t.finalCtaTitle}
        </h2>
        <p className={styles.ctaText}>{t.finalCtaSubtext}</p>
        <Link href="/register" className={styles.btnPrimary}>
          {t.getStarted}
        </Link>
      </section>

      {/* Footer */}
      <footer id="footer" className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <UstrixLogo width={130} wrapperStyle={{ marginBottom: 8 }} />
              <p>{t.footerDescription}</p>
            </div>
            <div className={styles.footerCol}>
              <h4>Marketplace</h4>
              <ul>
                <li>
                  <a href="#live-job-board">Live Job Board</a>
                </li>
                <li>
                  <a href="#ecosystem">Ecosystem</a>
                </li>
                <li>
                  <Link href="/register">Get Started</Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Platform</h4>
              <ul>
                <li>
                  <a href="#platform-capabilities">Capabilities</a>
                </li>
                <li>
                  <a href="#how-it-works">How It Works</a>
                </li>
                <li>
                  <a href="#subscription-plans">Pricing</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#footer">About</a>
                </li>
                <li>
                  <a href="#footer">Careers</a>
                </li>
                <li>
                  <a href="#footer">Partners</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Support &amp; Legal</h4>
              <ul>
                <li>
                  <a href="#contact">Contact Support</a>
                </li>
                <li>
                  <a href="#footer">Privacy Policy</a>
                </li>
                <li>
                  <a href="#footer">Terms of Service</a>
                </li>
                <li>
                  <a href="mailto:support@ustrix.com">support@ustrix.com</a>
                </li>
              </ul>
            </div>
          </div>
          <p className={styles.footerBottom}>
            © {new Date().getFullYear()} USTRIX. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
