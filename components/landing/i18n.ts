export type LanguageCode = 'EN' | 'FR';

export type TranslationKeys = {
  cookies: string;
  country: string;
  language: string;
  currency: string;
  navPlatform: string;
  navMarketplace: string;
  navSolutions: string;
  navHowItWorks: string;
  navPricePlan: string;
  navJobBoard: string;
  navSupport: string;
  signIn: string;
  getStarted: string;
  heroHeadlineRed: string;
  heroHeadlineWhite: string;
  heroSubheadline: string;
  exploreEcosystem: string;
  resultsTitle: string;
  resultsLead: string;
  audienceContractor: string;
  audienceContractorText: string;
  audienceCustomer: string;
  audienceCustomerText: string;
  audienceAgent: string;
  audienceAgentText: string;
  ecosystemTitle: string;
  ecosystemSubtitle: string;
  ecosystemBuyer: string;
  ecosystemBuyerText: string;
  ecosystemSeller: string;
  ecosystemSellerText: string;
  ecosystemAgents: string;
  ecosystemAgentsText: string;
  trustTitle: string;
  trustMarketplace: string;
  trustMarketplaceText: string;
  trustSecure: string;
  trustSecureText: string;
  trustWorkflows: string;
  trustWorkflowsText: string;
  trustNetwork: string;
  trustNetworkText: string;
  userTypesTitle: string;
  userTypesLead: string;
  buyersSellersTitle: string;
  buyersLabel: string;
  buyersText: string;
  sellersLabel: string;
  sellersText: string;
  areasTitle: string;
  areasLead: string;
  capabilitiesTitle: string;
  howItWorksTitle: string;
  howItWorksLead: string;
  plansTitle: string;
  billingMonthly: string;
  billingYearly: string;
  subscriptionNote: string;
  dashboardTitle: string;
  dashboardLead: string;
  dashboardCta: string;
  chartPlaceholder: string;
  testimonialsTitle: string;
  contactTitle: string;
  contactLead: string;
  contactSuccess: string;
  contactFullName: string;
  contactEmail: string;
  contactOrganization: string;
  contactTopic: string;
  contactMessage: string;
  contactSubmit: string;
  cookieMessage: string;
  cookieAcceptAll: string;
  cookieManage: string;
  cookieReject: string;
  recommended: string;
  finalCtaTitle: string;
  finalCtaSubtext: string;
  scheduleEyebrow: string;
  scheduleTitle: string;
  footerDescription: string;
};

export const translations: Record<LanguageCode, TranslationKeys> = {
  EN: {
    cookies: 'Cookies',
    country: 'Country',
    language: 'Language',
    currency: 'Currency',
    navPlatform: 'Platform',
    navMarketplace: 'Marketplace',
    navSolutions: 'Solutions',
    navHowItWorks: 'How It Works',
    navPricePlan: 'Price Plan',
    navJobBoard: 'Live Job Board',
    navSupport: 'Support',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    heroHeadlineRed: 'USTRIX CONNECTS',
    heroHeadlineWhite: 'PROCUREMENT, SELLING, LEADS, AND PAYMENTS',
    heroSubheadline:
      'Manage requests, quotations, service orders, subscriptions, payment settlement, and dashboard operations through one secure SaaS marketplace.',
    exploreEcosystem: 'Explore Ecosystem',
    resultsTitle: 'Delivering Connected Marketplace Results',
    resultsLead:
      'USTRIX brings a digital-first, outcome-based approach to procurement, selling, service orders, lead flow, subscriptions, and settlement workflows.',
    audienceContractor: 'Contractor Network',
    audienceContractorText:
      'Structured access for skilled technicians, vendors, and service providers.',
    audienceCustomer: 'Customer Operations',
    audienceCustomerText:
      'A connected request, quotation, and order experience for individuals and organizations.',
    audienceAgent: 'Agent Channel',
    audienceAgentText:
      'Approved partners support qualified lead flow and ecosystem growth while confidential details remain protected.',
    ecosystemTitle: 'Business Ecosystem',
    ecosystemSubtitle:
      'A connected marketplace where buyers post requirements, sellers deliver goods or services, and approved agents guide transactions through the USTRIX platform core.',
    ecosystemBuyer: 'Buyer',
    ecosystemBuyerText:
      'Requests goods, services, quotations, and fulfillment tracking.',
    ecosystemSeller: 'Seller',
    ecosystemSellerText:
      'Offers goods, services, contractor work, and order execution.',
    ecosystemAgents: 'Agents',
    ecosystemAgentsText:
      'Confidential partner channel supporting qualified lead flow and ecosystem growth.',
    trustTitle: 'Built for operational trust',
    trustMarketplace: 'Centralized Marketplace',
    trustMarketplaceText:
      'One digital hub connecting buyers, sellers, and approved partners.',
    trustSecure: 'Secure & Transparent',
    trustSecureText:
      'Structured workflows, audit visibility, and protected operations.',
    trustWorkflows: 'Efficient Workflows',
    trustWorkflowsText:
      'Quotes, orders, milestones, and subscriptions in one flow.',
    trustNetwork: 'Trusted Network',
    trustNetworkText:
      'Enterprise-grade onboarding for organizations and professionals.',
    userTypesTitle: 'Who uses USTRIX',
    userTypesLead:
      'Select the pathway that matches your role in the marketplace ecosystem.',
    buyersSellersTitle: 'Buyers and sellers, connected',
    buyersLabel: 'Buyers',
    buyersText:
      'Individuals, corporations, and organizations seeking reliable goods, services, contractors, quotations, and fulfillment tracking.',
    sellersLabel: 'Sellers',
    sellersText:
      'Professionals, contractors, vendors, and service providers offering specialized goods and services through structured digital workflows.',
    areasTitle: 'Areas of service',
    areasLead:
      'Structured categories for procurement and service ordering across residential and commercial operations.',
    capabilitiesTitle: 'Platform capabilities',
    howItWorksTitle: 'How USTRIX Works',
    howItWorksLead:
      'A structured onboarding path from pathway selection to daily operations.',
    plansTitle: 'Subscription plans',
    billingMonthly: 'Monthly',
    billingYearly: 'Yearly',
    subscriptionNote:
      'After subscription, buyers, sellers, and approved partners access the secure dashboard.',
    dashboardTitle: 'Admin dashboard overview',
    dashboardLead:
      'Operational control continues in the secure dashboard.',
    dashboardCta: 'Go to Dashboard Sign In',
    chartPlaceholder: 'Recent Activity & Top Services — chart preview',
    testimonialsTitle: 'What customers say',
    contactTitle: 'Contact USTRIX Support',
    contactLead:
      'Have questions about procurement, subscriptions, marketplace access, or dashboard onboarding? Send us a message.',
    contactSuccess:
      'Thank you. Your message has been prepared for USTRIX support.',
    contactFullName: 'Full Name',
    contactEmail: 'Email Address',
    contactOrganization: 'Organization / Company',
    contactTopic: 'Topic',
    contactMessage: 'Message',
    contactSubmit: 'Send Message',
    cookieMessage:
      'We use cookies to improve site performance, personalize content, and analyze traffic.',
    cookieAcceptAll: 'Accept All',
    cookieManage: 'Manage Preferences',
    cookieReject: 'Reject Optional',
    recommended: 'Recommended',
    finalCtaTitle: 'Ready to streamline procurement and service orders?',
    finalCtaSubtext:
      'Create your USTRIX account, select a plan, complete payment, and access your dashboard.',
    scheduleEyebrow: 'Marketplace Schedule',
    scheduleTitle: 'LIVE JOB BOARD',
    footerDescription:
      'USTRIX is a SaaS marketplace for procurement, selling, lead generation, subscriptions, and payment settlement.',
  },
  FR: {
    cookies: 'Témoins',
    country: 'Pays',
    language: 'Langue',
    currency: 'Devise',
    navPlatform: 'Plateforme',
    navMarketplace: 'Marché',
    navSolutions: 'Solutions',
    navHowItWorks: 'Comment ça marche',
    navPricePlan: 'Forfaits',
    navJobBoard: 'Offres en direct',
    navSupport: 'Soutien',
    signIn: 'Connexion',
    getStarted: 'Commencer',
    heroHeadlineRed: 'USTRIX CONNECTE',
    heroHeadlineWhite:
      'L’APPROVISIONNEMENT, LA VENTE, LES PROSPECTS ET LES PAIEMENTS',
    heroSubheadline:
      'Gérez les demandes, devis, commandes de services, abonnements, règlement des paiements et opérations du tableau de bord dans un marché SaaS sécurisé.',
    exploreEcosystem: 'Explorer l’écosystème',
    resultsTitle: 'Des résultats de marché connectés',
    resultsLead:
      'USTRIX adopte une approche numérique axée sur les résultats pour l’approvisionnement, la vente, les commandes de services, les prospects, les abonnements et les flux de règlement.',
    audienceContractor: 'Réseau d’entrepreneurs',
    audienceContractorText:
      'Accès structuré pour techniciens qualifiés, fournisseurs et prestataires de services.',
    audienceCustomer: 'Opérations clients',
    audienceCustomerText:
      'Une expérience connectée de demande, devis et commande pour particuliers et organisations.',
    audienceAgent: 'Canal agents',
    audienceAgentText:
      'Les partenaires approuvés soutiennent les prospects qualifiés et la croissance de l’écosystème, les détails confidentiels restant protégés.',
    ecosystemTitle: 'Écosystème commercial',
    ecosystemSubtitle:
      'Un marché connecté où les acheteurs publient leurs besoins, les vendeurs livrent biens ou services, et les agents approuvés guident les transactions via le cœur de plateforme USTRIX.',
    ecosystemBuyer: 'Acheteur',
    ecosystemBuyerText:
      'Demande des biens, services, devis et suivi d’exécution.',
    ecosystemSeller: 'Vendeur',
    ecosystemSellerText:
      'Offre des biens, services, travaux d’entrepreneur et exécution de commandes.',
    ecosystemAgents: 'Agents',
    ecosystemAgentsText:
      'Canal partenaire confidentiel soutenant les prospects qualifiés et la croissance de l’écosystème.',
    trustTitle: 'Conçu pour la confiance opérationnelle',
    trustMarketplace: 'Marché centralisé',
    trustMarketplaceText:
      'Un hub numérique reliant acheteurs, vendeurs et partenaires approuvés.',
    trustSecure: 'Sécurisé et transparent',
    trustSecureText:
      'Flux structurés, visibilité d’audit et opérations protégées.',
    trustWorkflows: 'Flux efficaces',
    trustWorkflowsText:
      'Devis, commandes, jalons et abonnements dans un seul flux.',
    trustNetwork: 'Réseau de confiance',
    trustNetworkText:
      'Intégration de niveau entreprise pour organisations et professionnels.',
    userTypesTitle: 'Qui utilise USTRIX',
    userTypesLead:
      'Choisissez le parcours qui correspond à votre rôle dans l’écosystème du marché.',
    buyersSellersTitle: 'Acheteurs et vendeurs, connectés',
    buyersLabel: 'Acheteurs',
    buyersText:
      'Particuliers, entreprises et organisations recherchant des biens, services, entrepreneurs, devis et suivi d’exécution fiables.',
    sellersLabel: 'Vendeurs',
    sellersText:
      'Professionnels, entrepreneurs, fournisseurs et prestataires offrant des biens et services spécialisés par des flux numériques structurés.',
    areasTitle: 'Domaines de service',
    areasLead:
      'Catégories structurées pour l’approvisionnement et les commandes de services résidentiels et commerciaux.',
    capabilitiesTitle: 'Capacités de la plateforme',
    howItWorksTitle: 'Comment fonctionne USTRIX',
    howItWorksLead:
      'Un parcours d’intégration structuré de la sélection du parcours aux opérations quotidiennes.',
    plansTitle: 'Forfaits d’abonnement',
    billingMonthly: 'Mensuel',
    billingYearly: 'Annuel',
    subscriptionNote:
      'Après l’abonnement, les acheteurs, vendeurs et partenaires approuvés accèdent au tableau de bord sécurisé.',
    dashboardTitle: 'Aperçu du tableau de bord admin',
    dashboardLead:
      'Le contrôle opérationnel se poursuit dans le tableau de bord sécurisé.',
    dashboardCta: 'Connexion au tableau de bord',
    chartPlaceholder:
      'Activité récente et services principaux — aperçu graphique',
    testimonialsTitle: 'Ce que disent nos clients',
    contactTitle: 'Contacter le soutien USTRIX',
    contactLead:
      'Des questions sur l’approvisionnement, les abonnements, l’accès au marché ou l’intégration au tableau de bord? Envoyez-nous un message.',
    contactSuccess:
      'Merci. Votre message a été préparé pour le soutien USTRIX.',
    contactFullName: 'Nom complet',
    contactEmail: 'Adresse courriel',
    contactOrganization: 'Organisation / Entreprise',
    contactTopic: 'Sujet',
    contactMessage: 'Message',
    contactSubmit: 'Envoyer le message',
    cookieMessage:
      'Nous utilisons des témoins pour améliorer les performances, personnaliser le contenu et analyser le trafic.',
    cookieAcceptAll: 'Tout accepter',
    cookieManage: 'Gérer les préférences',
    cookieReject: 'Refuser les optionnels',
    recommended: 'Recommandé',
    finalCtaTitle:
      'Prêt à rationaliser l’approvisionnement et les commandes de services?',
    finalCtaSubtext:
      'Créez votre compte USTRIX, choisissez un forfait, effectuez le paiement et accédez à votre tableau de bord.',
    scheduleEyebrow: 'Horaire du marché',
    scheduleTitle: 'TABLEAU DES OFFRES EN DIRECT',
    footerDescription:
      'USTRIX est un marché SaaS pour l’approvisionnement, la vente, la génération de prospects, les abonnements et le règlement des paiements.',
  },
};
