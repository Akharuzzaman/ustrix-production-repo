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
  ecosystemPresentationLaunch: string;
  ecosystemPresentationClose: string;
  ecosystemPresentationSoundOn: string;
  ecosystemPresentationSoundOff: string;
  ecosystemPresentationPlay: string;
  ecosystemPresentationPause: string;
  ecosystemPresentationEyebrow: string;
  ecosystemPresentationBuyerTitle: string;
  ecosystemPresentationSellerTitle: string;
  ecosystemPresentationAgentsTitle: string;
  ecosystemPresentationCoreEyebrow: string;
  ecosystemPresentationCoreTitle: string;
  ecosystemPresentationCoreBody: string;
  ecosystemPresentationWorkflowEyebrow: string;
  ecosystemPresentationWorkflowTitle: string;
  ecosystemPresentationWorkflowBody: string;
  ecosystemPresentationSubscriptionEyebrow: string;
  ecosystemPresentationSubscriptionTitle: string;
  ecosystemPresentationSubscriptionBody: string;
  ecosystemPresentationOutroEyebrow: string;
  ecosystemPresentationOutroTitle: string;
  ecosystemPresentationOutroBody: string;
  ecosystemPresentationAgentCta: string;
  ecosystemPresentationScene: string;
  ecosystemVideoEyebrow: string;
  ecosystemVideoTitle: string;
  ecosystemVideoSubtitle: string;
  ecosystemVideoAria: string;
  ecosystemVideoFallback: string;
  ecosystemVideoCaptionNote: string;
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
  subscriptionForHint: string;
  subscriptionSubscribeHint: string;
  subscriptionPlanGateHint: string;
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
    ecosystemPresentationLaunch: 'Experience Ecosystem',
    ecosystemPresentationClose: 'Close',
    ecosystemPresentationSoundOn: 'Sound On',
    ecosystemPresentationSoundOff: 'Sound Off',
    ecosystemPresentationPlay: 'Play',
    ecosystemPresentationPause: 'Pause',
    ecosystemPresentationEyebrow: 'USTRIX Audio Visual',
    ecosystemPresentationBuyerTitle: 'Buyer network activated',
    ecosystemPresentationSellerTitle: 'Seller network activated',
    ecosystemPresentationAgentsTitle: 'Approved agent channels',
    ecosystemPresentationCoreEyebrow: 'Platform Core',
    ecosystemPresentationCoreTitle: 'USTRIX Platform Core',
    ecosystemPresentationCoreBody:
      'The secure command center orchestrating procurement, orders, subscriptions, and settlement.',
    ecosystemPresentationWorkflowEyebrow: 'Procurement workflow',
    ecosystemPresentationWorkflowTitle: 'Nine-step closed loop',
    ecosystemPresentationWorkflowBody:
      'Buyer and seller lanes pulse through the platform in a continuous RFP-to-settlement cycle.',
    ecosystemPresentationSubscriptionEyebrow: 'Subscription engine',
    ecosystemPresentationSubscriptionTitle: 'Always-on subscription loop',
    ecosystemPresentationSubscriptionBody:
      'Plans orbit the ecosystem, keeping buyers, sellers, and partners connected to platform services.',
    ecosystemPresentationOutroEyebrow: 'Ready to connect',
    ecosystemPresentationOutroTitle: 'Connect. Transact. Grow.',
    ecosystemPresentationOutroBody:
      'Join the USTRIX marketplace and run procurement, service orders, and settlement from one dashboard.',
    ecosystemPresentationAgentCta: 'Agent Enrollment',
    ecosystemPresentationScene: 'Scene',
    ecosystemVideoEyebrow: 'Ecosystem Overview',
    ecosystemVideoTitle: 'See the USTRIX ecosystem in motion',
    ecosystemVideoSubtitle:
      'An animated walkthrough of buyers, sellers, agents, tax authority compliance, platform core, workflow, and subscription loop.',
    ecosystemVideoAria: 'USTRIX business ecosystem animated overview',
    ecosystemVideoFallback:
      'Animation is not available in your browser. Scroll to the ecosystem diagram below.',
    ecosystemVideoCaptionNote:
      'Live ecosystem animation with scene captions — loops automatically.',
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
      'Choose your role and subscription owner, select a plan, then register. Organization admins can assign roles and users after purchase.',
    subscriptionForHint:
      'Step 1: Choose Subscription For to continue.',
    subscriptionSubscribeHint:
      'Step 1: Choose Subscribe as (Buyer, Seller, or Agent) to continue.',
    subscriptionPlanGateHint:
      'Complete Subscribe as and Please Specify to enable plan selection.',
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
    ecosystemPresentationLaunch: 'Découvrir l’écosystème',
    ecosystemPresentationClose: 'Fermer',
    ecosystemPresentationSoundOn: 'Son activé',
    ecosystemPresentationSoundOff: 'Son désactivé',
    ecosystemPresentationPlay: 'Lecture',
    ecosystemPresentationPause: 'Pause',
    ecosystemPresentationEyebrow: 'Présentation audiovisuelle USTRIX',
    ecosystemPresentationBuyerTitle: 'Réseau acheteurs activé',
    ecosystemPresentationSellerTitle: 'Réseau vendeurs activé',
    ecosystemPresentationAgentsTitle: 'Canaux agents approuvés',
    ecosystemPresentationCoreEyebrow: 'Cœur de plateforme',
    ecosystemPresentationCoreTitle: 'Cœur de plateforme USTRIX',
    ecosystemPresentationCoreBody:
      'Le centre de commande sécurisé qui orchestre approvisionnement, commandes, abonnements et règlement.',
    ecosystemPresentationWorkflowEyebrow: 'Flux d’approvisionnement',
    ecosystemPresentationWorkflowTitle: 'Boucle fermée en neuf étapes',
    ecosystemPresentationWorkflowBody:
      'Les voies acheteur et vendeur pulsent via la plateforme dans un cycle continu de l’appel d’offres au règlement.',
    ecosystemPresentationSubscriptionEyebrow: 'Moteur d’abonnement',
    ecosystemPresentationSubscriptionTitle: 'Boucle d’abonnement continue',
    ecosystemPresentationSubscriptionBody:
      'Les forfaits orbitent autour de l’écosystème et maintiennent acheteurs, vendeurs et partenaires connectés.',
    ecosystemPresentationOutroEyebrow: 'Prêt à vous connecter',
    ecosystemPresentationOutroTitle: 'Connecter. Transiger. Croître.',
    ecosystemPresentationOutroBody:
      'Rejoignez le marché USTRIX et gérez approvisionnement, commandes de services et règlement depuis un tableau de bord.',
    ecosystemPresentationAgentCta: 'Inscription agent',
    ecosystemPresentationScene: 'Scène',
    ecosystemVideoEyebrow: 'Aperçu de l’écosystème',
    ecosystemVideoTitle: 'L’écosystème USTRIX en mouvement',
    ecosystemVideoSubtitle:
      'Une animation guidée des acheteurs, vendeurs, agents, conformité fiscale, cœur de plateforme, flux de travail et boucle d’abonnement.',
    ecosystemVideoAria: 'Aperçu animé de l’écosystème commercial USTRIX',
    ecosystemVideoFallback:
      'L’animation n’est pas disponible dans votre navigateur. Faites défiler jusqu’au diagramme ci-dessous.',
    ecosystemVideoCaptionNote:
      'Animation de l’écosystème en direct avec légendes — lecture en boucle automatique.',
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
      'Choisissez votre rôle et le propriétaire de l’abonnement, sélectionnez un forfait, puis inscrivez-vous. Les administrateurs d’organisation peuvent assigner des rôles après l’achat.',
    subscriptionForHint:
      'Étape 1 : choisissez Subscription For pour continuer.',
    subscriptionSubscribeHint:
      'Étape 1 : choisissez Subscribe as (Acheteur, Vendeur ou Agent) pour continuer.',
    subscriptionPlanGateHint:
      'Complétez Subscribe as et Please Specify pour activer le choix du forfait.',
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
