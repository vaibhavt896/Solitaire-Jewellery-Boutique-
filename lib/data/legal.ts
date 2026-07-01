/* ─────────────────────────────────────────────────────────────────────────
   Legal documents — Privacy Policy, Terms of Service, Cookie Policy,
   Boutique Policy.

   Each section supports two block kinds:
     · { kind: 'p'; text: string }    — a regular paragraph
     · { kind: 'ul'; items: string[] } — a bulleted list (diamond ◆ marker)

   Governing jurisdiction: Kanpur, Uttar Pradesh, India.
   Indian statutes referenced: DPDPA 2023, IT Act 2000, IT Rules 2011,
   Copyright Act 1957, Consumer Protection Act 2019, Indian Contract Act 1872.
───────────────────────────────────────────────────────────────────────── */

type TextBlock =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] };

type LegalDoc = {
  slug: 'privacy' | 'terms' | 'cookies' | 'returns';
  title: string;
  description: string;
  lastUpdated: string;
  body: { heading: string; blocks: TextBlock[] }[];
};

export const LEGAL: Record<string, LegalDoc> = {
  /* ──────────────────────────────────────────────────────────────────────
     PRIVACY POLICY
     Drafted to comply with:
       · Digital Personal Data Protection Act, 2023 (DPDPA)
       · Information Technology (Reasonable Security Practices and
         Procedures and Sensitive Personal Data or Information) Rules, 2011
       · Information Technology Act, 2000
  ────────────────────────────────────────────────────────────────────── */
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description:
      'How Solitaire Jewellery Boutique collects, uses, and protects your personal data, drafted in compliance with the Digital Personal Data Protection Act, 2023 and the IT Rules, 2011.',
    lastUpdated: '1 July 2026',
    body: [
      {
        heading: 'Who We Are',
        blocks: [
          {
            kind: 'p',
            text: 'Solitaire Jewellery Boutique ("Solitaire", "we", "our", "us") is a family-owned jewellery retail boutique operating from Lane of Skin Mantraa, 113/65B, Behind Hotel Royal Cliff, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002, India. We operate as a data fiduciary as defined under the Digital Personal Data Protection Act, 2023 ("DPDPA").',
          },
          {
            kind: 'p',
            text: 'This Privacy Policy describes how we collect, use, store, share, and protect the personal data you provide when you interact with our website (solitairejewelleryboutique.com), contact us via WhatsApp, book an appointment, or visit our boutique. By using our website or voluntarily sharing your information with us, you acknowledge the practices described in this policy.',
          },
        ],
      },
      {
        heading: 'Personal Data We Collect',
        blocks: [
          {
            kind: 'p',
            text: 'We collect only the information you choose to provide to us. This may include:',
          },
          {
            kind: 'ul',
            items: [
              'Contact details — your name, mobile number, and email address.',
              'Enquiry details — the piece or collection you are interested in, your preferences, and any other information you include in your message to us.',
              'Appointment information — your preferred date and time, wedding date (for bridal consultations), and the nature of your requirement.',
              'Communication records — the content of messages you send us via WhatsApp, the enquiry form, or email.',
              'Website usage data — anonymised, aggregate page-view data collected by Plausible Analytics; and, with your explicit consent, session and event data via Google Analytics and Meta Pixel.',
            ],
          },
          {
            kind: 'p',
            text: 'We do not collect payment card numbers, government identity numbers (such as Aadhaar or PAN), financial account details, biometric data, or any other sensitive personal information. All financial transactions take place in-store and no payment data is transmitted through our website.',
          },
        ],
      },
      {
        heading: 'How We Collect Your Data',
        blocks: [
          {
            kind: 'p',
            text: 'We receive personal data through the following channels:',
          },
          {
            kind: 'ul',
            items: [
              'The enquiry and contact forms on our website.',
              'WhatsApp messages you initiate to our registered business number (+91 89578 04161).',
              'Appointment booking forms for bridal consultations and private viewings.',
              'Newsletter sign-up forms, where you provide only your email address.',
              'In-store interactions, where you may provide contact details directly to our team.',
              'Telephone calls when you contact us directly.',
            ],
          },
        ],
      },
      {
        heading: 'Why We Process Your Data',
        blocks: [
          {
            kind: 'p',
            text: 'We use your personal data solely for the following purposes:',
          },
          {
            kind: 'ul',
            items: [
              'To respond to your enquiry promptly, accurately, and in a helpful manner.',
              'To schedule, confirm, and manage appointments and private viewings.',
              'To share photographs, videos, and details of pieces you have expressed interest in.',
              'To provide after-sales service, including reminders for complimentary annual check-ups.',
              'To send our newsletter, only if you have subscribed; you may unsubscribe at any time.',
              'To understand how visitors use our website and improve the content and experience we offer.',
            ],
          },
          {
            kind: 'p',
            text: 'We do not use your data for automated profiling, algorithmic decision-making, or any purpose that produces legal or similarly significant effects on you.',
          },
        ],
      },
      {
        heading: 'Legal Basis for Processing',
        blocks: [
          {
            kind: 'p',
            text: 'We process your personal data on the following legal bases under the DPDPA 2023 and applicable Indian law:',
          },
          {
            kind: 'ul',
            items: [
              'Consent — where you have voluntarily provided your data by submitting an enquiry, booking an appointment, or subscribing to our newsletter.',
              'Legitimate purpose — to respond to communications you have initiated and to fulfil our obligations as a boutique serving you.',
              'Contractual necessity — where processing is required to honour a booking, special order, or other commitment you have made with us.',
            ],
          },
          {
            kind: 'p',
            text: 'You may withdraw your consent at any time by contacting us using the details in the "Grievance Officer and Contact" section below. Withdrawal of consent does not affect the lawfulness of any processing that took place before withdrawal.',
          },
        ],
      },
      {
        heading: 'Third-Party Service Providers',
        blocks: [
          {
            kind: 'p',
            text: 'We engage carefully selected service providers who may access your data solely to help us operate our boutique and website. These providers are contractually bound to process data only on our instructions and to maintain appropriate security standards:',
          },
          {
            kind: 'ul',
            items: [
              'Cal.com — for appointment and booking management.',
              'Vercel Inc. — for website hosting on enterprise-grade cloud infrastructure.',
              'Plausible Analytics — for privacy-first, cookieless web analytics. No personal data is collected or shared through Plausible.',
              'Google LLC — for Google Analytics (with your consent) and Google Maps integration for store directions.',
              'Meta Platforms, Inc. — for Meta Pixel advertising attribution (with your consent) and WhatsApp Business communications you initiate.',
              'Resend — for transactional email delivery, such as appointment confirmations.',
            ],
          },
          {
            kind: 'p',
            text: 'Some of these providers operate servers outside India. Where your data is transferred internationally, we rely on appropriate safeguards — including the standard contractual clauses recognised under Indian law and the DPDPA — to protect it. We do not sell, rent, exchange, or otherwise transfer your personal data to any third party for their own marketing or commercial purposes, under any circumstances.',
          },
        ],
      },
      {
        heading: 'How Long We Retain Your Data',
        blocks: [
          {
            kind: 'p',
            text: 'We retain your personal data only for as long as is necessary for the purposes for which it was collected, and no longer than required by applicable law:',
          },
          {
            kind: 'ul',
            items: [
              'Enquiry and communication records: up to 12 months from the date of last contact, unless you have an ongoing relationship with us (such as a special order or after-sales service engagement).',
              'Appointment and consultation records: up to 6 months after the appointment date.',
              'Newsletter subscriber data: until you unsubscribe or request deletion, whichever is sooner.',
              'Records we are required to retain by law (for example, accounting or tax records): for the period mandated by the applicable statute.',
            ],
          },
          {
            kind: 'p',
            text: 'After the applicable retention period, data is securely deleted or irreversibly anonymised. We review our data holdings periodically to ensure compliance with this policy.',
          },
        ],
      },
      {
        heading: 'How We Protect Your Data',
        blocks: [
          {
            kind: 'p',
            text: 'We implement reasonable technical and organisational security measures consistent with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, including:',
          },
          {
            kind: 'ul',
            items: [
              'Encrypted transmission of all data between your browser and our website via TLS/HTTPS.',
              'Access controls ensuring that only authorised members of our team can access enquiry and appointment records.',
              'Hosting on Vercel\'s enterprise-grade infrastructure with ISO 27001-certified data centres and continuous security monitoring.',
              'Regular review of vendor agreements and data access permissions.',
              'No storage of sensitive financial data (payment cards, bank details) on our systems.',
            ],
          },
          {
            kind: 'p',
            text: 'No method of data transmission over the internet is completely secure. While we take every reasonable precaution, we cannot guarantee absolute security. In the event of a personal data breach that is likely to result in harm to you, we will notify the Data Protection Board of India and, where required by the DPDPA, inform you directly, without undue delay.',
          },
        ],
      },
      {
        heading: 'Cookies and Analytics',
        blocks: [
          {
            kind: 'p',
            text: 'We use a minimal number of cookies and tracking technologies on our website:',
          },
          {
            kind: 'ul',
            items: [
              'Essential cookie: a single short-lived session cookie for the cookie consent banner. This does not store any personal data and is necessary for the banner to function correctly.',
              'Plausible Analytics: our default analytics tool. Plausible is cookieless, does not track individual users, and processes no personal data. It simply counts page views in aggregate.',
              'Google Analytics (with your consent): tracks pages visited, session duration, and general usage patterns for advertising attribution. Activated only after you provide explicit consent.',
              'Meta Pixel (with your consent): tracks visits and ad-related events for our Facebook and Instagram advertising campaigns. Activated only after you provide explicit consent.',
            ],
          },
          {
            kind: 'p',
            text: 'You can accept all cookies, reject non-essential cookies, or customise your preferences from the banner that appears on your first visit. You may change your choice at any time by clearing your browser cookies and revisiting our website. For full details, please see our Cookie Policy.',
          },
        ],
      },
      {
        heading: 'Your Rights Under the DPDPA 2023',
        blocks: [
          {
            kind: 'p',
            text: 'As a data principal under the Digital Personal Data Protection Act, 2023, you have the following rights in relation to the personal data we hold about you:',
          },
          {
            kind: 'ul',
            items: [
              'Right to access: request a summary of the personal data we hold about you and how it is being used.',
              'Right to correction: ask us to correct personal data that is inaccurate, incomplete, or out of date.',
              'Right to erasure: request the deletion of your personal data, subject to any legal obligations that require us to retain it.',
              'Right to grievance redressal: raise a complaint with our Grievance Officer, and if not resolved to your satisfaction, with the Data Protection Board of India once it is constituted.',
              'Right to withdraw consent: opt out of data processing at any time; this will not affect the lawfulness of any processing carried out before withdrawal.',
              'Right to nominate: nominate another individual to exercise your data rights on your behalf in the event of your death or incapacity.',
            ],
          },
          {
            kind: 'p',
            text: 'To exercise any of these rights, please contact our Grievance Officer using the details in Section 14. We will acknowledge your request within 48 hours and resolve it within 30 days, or within such time as required by law.',
          },
        ],
      },
      {
        heading: "Children's Privacy",
        blocks: [
          {
            kind: 'p',
            text: 'Our website and services are not directed at children under the age of 18. We do not knowingly collect personal data from minors. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately and we will take prompt steps to delete it from our records.',
          },
        ],
      },
      {
        heading: 'Links to Third-Party Websites',
        blocks: [
          {
            kind: 'p',
            text: 'Our website may contain links to third-party websites — for example, to GIA (gia.edu) or IGI (igi.org) for certificate verification, or to our social media profiles on Instagram and Facebook. These links are provided for your convenience and information only. We have no control over the content or privacy practices of those websites. We encourage you to read the privacy policies of any third-party site you visit before providing personal data.',
          },
        ],
      },
      {
        heading: 'Changes to This Policy',
        blocks: [
          {
            kind: 'p',
            text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. When we make material changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes your acknowledgement of the updated policy.',
          },
        ],
      },
      {
        heading: 'Grievance Officer and Contact',
        blocks: [
          {
            kind: 'p',
            text: 'For any questions, concerns, complaints, or requests relating to this Privacy Policy or the personal data we hold about you, please contact our Grievance Officer:',
          },
          {
            kind: 'ul',
            items: [
              'Name: Solitaire Jewellery Boutique — Customer Relations',
              'Address: Lane of Skin Mantraa, 113/65B, Behind Hotel Royal Cliff, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002, India',
              'WhatsApp: +91 89578 04161',
              'Hours: Monday to Saturday, 12 noon to 8 PM IST',
              'Response commitment: acknowledgement within 48 hours; resolution within 30 days',
            ],
          },
          {
            kind: 'p',
            text: 'If you are not satisfied with the resolution provided by us, you may, once the Data Protection Board of India is constituted under the DPDPA 2023, file a complaint with the Board.',
          },
        ],
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────
     TERMS OF SERVICE
     Drafted to comply with:
       · Information Technology Act, 2000
       · Consumer Protection Act, 2019
       · Indian Contract Act, 1872
       · Copyright Act, 1957
       · Jurisdiction: Kanpur, Uttar Pradesh, India
  ────────────────────────────────────────────────────────────────────── */
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    description:
      'Terms governing your use of solitairejewelleryboutique.com. This website is an informational resource for our physical boutique — no products are sold online.',
    lastUpdated: '1 July 2026',
    body: [
      {
        heading: 'Acceptance of These Terms',
        blocks: [
          {
            kind: 'p',
            text: 'By accessing or using the website at solitairejewelleryboutique.com ("Site"), you confirm that you have read, understood, and agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms, please stop using the Site immediately.',
          },
          {
            kind: 'p',
            text: 'We reserve the right to amend these Terms at any time by posting the updated version on this page. Continued use of the Site after any amendments constitutes your acceptance of the revised Terms.',
          },
        ],
      },
      {
        heading: 'About Solitaire Jewellery Boutique',
        blocks: [
          {
            kind: 'p',
            text: 'Solitaire Jewellery Boutique ("Solitaire", "we", "us", "our") is a family-owned jewellery retail boutique located at Lane of Skin Mantraa, 113/65B, Behind Hotel Royal Cliff, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002, India. We specialise in polki, antique gold, temple jewellery, and GIA/IGI-certified diamond jewellery, curated by hand and sold exclusively in-store.',
          },
          {
            kind: 'p',
            text: 'You may contact us via WhatsApp at +91 89578 04161 or visit us in person Monday to Saturday between 12 noon and 8 PM. Sunday viewings are available by appointment.',
          },
        ],
      },
      {
        heading: 'Nature of This Website — No Online Sales',
        blocks: [
          {
            kind: 'p',
            text: 'This Site is a digital presence and informational resource for our physical boutique. Please note the following important points before interacting with us through this website:',
          },
          {
            kind: 'ul',
            items: [
              'No products are sold or delivered through this website under any circumstances. All purchases and transactions take place exclusively in-store at our Kanpur boutique.',
              'Pieces shown on this website are for illustrative purposes, to help you discover our collections before visiting us.',
              'Enquiries submitted through the contact form or via WhatsApp do not constitute an offer to sell, a reservation, or a contract of any kind.',
              'We do not accept payment — of any amount or through any method — through this website.',
              'Confirming an appointment through this website does not reserve or hold a piece for you.',
            ],
          },
        ],
      },
      {
        heading: 'Product Information and Descriptions',
        blocks: [
          {
            kind: 'p',
            text: 'We make every reasonable effort to present our jewellery accurately, including through photographs, videos, material descriptions, and certification details. However, you should be aware of the following:',
          },
          {
            kind: 'ul',
            items: [
              'Photographs and videos may not reproduce the exact colour, lustre, texture, or scale of the physical piece. Please visit us in-store or request a video via WhatsApp for a more accurate impression.',
              'Availability of specific pieces is subject to change without prior notice. We will confirm current availability when you contact us.',
              'Specifications such as weight, stone dimensions, and carat weight are indicative and may vary slightly from piece to piece, particularly for handcrafted and made-to-order items.',
              'Certifications cited on this website (GIA, IGI, BIS Hallmark) are specific to the piece described and are not transferable or interchangeable with any other piece.',
              'Any comparison or estimate of gemstone quality, colour, or clarity is descriptive in nature and is not a substitute for a formal grading report.',
            ],
          },
        ],
      },
      {
        heading: 'Pricing and Availability',
        blocks: [
          {
            kind: 'p',
            text: 'All prices on this website are provided on enquiry only. We do not publish fixed prices online because gold, diamond, polki, and other gemstone prices are linked to daily market rates and may change without notice. The following conditions apply:',
          },
          {
            kind: 'ul',
            items: [
              'The price of any piece will be communicated to you at the time of your enquiry or in-store visit, based on the prevailing market rate on that date.',
              'A price quoted via WhatsApp or in writing is indicative and remains valid only for a limited period, after which it is subject to revision if market conditions change materially.',
              'We reserve the right to revise prices at any time without prior notice.',
              'The display of a piece on this website does not constitute an offer to sell at any particular price.',
            ],
          },
        ],
      },
      {
        heading: 'Appointment and Consultation Bookings',
        blocks: [
          {
            kind: 'p',
            text: 'When you book a bridal consultation, private viewing, or any other appointment through our website, the following conditions apply:',
          },
          {
            kind: 'ul',
            items: [
              'Your booking is provisional until it is confirmed by a member of our team via WhatsApp or telephone.',
              'We may need to reschedule or cancel an appointment if unforeseen circumstances arise; we will notify you as early as possible.',
              'If you need to cancel or reschedule, please give us at least 24 hours\' notice. Frequent last-minute cancellations may result in a longer lead time for your next booking.',
              'Attending a consultation or private viewing does not constitute or imply any commitment to purchase on either party\'s part.',
            ],
          },
        ],
      },
      {
        heading: 'Intellectual Property Rights',
        blocks: [
          {
            kind: 'p',
            text: 'All content on this Site — including but not limited to photographs, videos, text, copy, design, logo, wordmark, brand elements, and the selection and arrangement of content — is the exclusive property of Solitaire Jewellery Boutique or is used by us under a valid licence. This content is protected under the Copyright Act, 1957 (India) and applicable international intellectual property law.',
          },
          {
            kind: 'ul',
            items: [
              'You may not copy, reproduce, distribute, publish, modify, display, create derivative works from, or commercially exploit any content from this Site without our prior written permission.',
              'Sharing our photographs on your personal social media with appropriate credit to @solitairejewelleryboutique and a link to our website is permitted and appreciated.',
              'Wholesale reproduction or use of our photographs, videos, or copy for commercial purposes — including on marketplaces, aggregator sites, or competitor websites — is strictly prohibited.',
              'Unauthorised use of our trademark, brand name, or logo in a way that misrepresents your association with Solitaire is not permitted and may result in legal action.',
            ],
          },
        ],
      },
      {
        heading: 'Prohibited Uses',
        blocks: [
          {
            kind: 'p',
            text: 'By using this Site, you agree not to:',
          },
          {
            kind: 'ul',
            items: [
              'Submit false, misleading, fraudulent, or malicious enquiries or information.',
              'Attempt to gain unauthorised access to our website, servers, databases, or any connected systems.',
              'Introduce or transmit malware, viruses, ransomware, spyware, or any other harmful code or software.',
              'Use automated tools, bots, or scrapers to harvest, copy, or aggregate content, product descriptions, pricing information, or photographs from this Site without our prior written consent.',
              'Impersonate Solitaire Jewellery Boutique, our staff, or any other person or entity.',
              'Use this Site in any manner that violates applicable Indian law, including but not limited to the Information Technology Act, 2000.',
            ],
          },
        ],
      },
      {
        heading: 'Disclaimers and Limitation of Liability',
        blocks: [
          {
            kind: 'p',
            text: 'To the fullest extent permitted by applicable law:',
          },
          {
            kind: 'ul',
            items: [
              'This Site is provided on an "as is" and "as available" basis, without warranties of any kind, whether express, implied, or statutory, including any warranty of accuracy, completeness, merchantability, fitness for a particular purpose, or non-infringement.',
              'We do not warrant that the Site will be uninterrupted, error-free, free of viruses, or free of other harmful components.',
              'We are not liable for any direct, indirect, incidental, consequential, special, or punitive loss or damage arising from your use of, or inability to use, this Site or any content or information on it.',
              'Our total liability to you, in cases where liability cannot be excluded by law, shall not exceed the value of the specific piece you purchased from us in-store (if any).',
              'We are not responsible for any delays, errors, or failures resulting from circumstances beyond our reasonable control, including internet outages, cyberattacks, natural events, labour disputes, government action, or pandemic conditions.',
            ],
          },
          {
            kind: 'p',
            text: 'Nothing in these Terms excludes or limits liability that cannot be excluded or limited under the Consumer Protection Act, 2019 or other mandatory provisions of Indian law.',
          },
        ],
      },
      {
        heading: 'Third-Party Links and Content',
        blocks: [
          {
            kind: 'p',
            text: 'This Site may contain links to external websites — such as GIA (gia.edu) or IGI (igi.org) for certificate verification, Google Maps for store directions, or our social media profiles. These links are provided for your convenience only. We do not endorse, control, or take any responsibility for the content, accuracy, privacy practices, or availability of any linked third-party website. Accessing third-party sites from links on our website is at your own risk.',
          },
        ],
      },
      {
        heading: 'Privacy',
        blocks: [
          {
            kind: 'p',
            text: 'Your use of this Site is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Our Privacy Policy explains how we collect, use, protect, and share your personal data in accordance with the DPDPA 2023 and the IT Rules 2011. Please review it at /legal/privacy.',
          },
        ],
      },
      {
        heading: 'Governing Law and Jurisdiction',
        blocks: [
          {
            kind: 'p',
            text: 'These Terms are governed by, and shall be construed in accordance with, the laws of the Republic of India. Any dispute, claim, or controversy arising out of or relating to these Terms, or your use of this Site, shall be subject to the exclusive jurisdiction of the competent civil courts located in Kanpur, Uttar Pradesh, India. You hereby irrevocably consent to such jurisdiction and waive any objection to proceedings in those courts on grounds of inconvenient forum.',
          },
        ],
      },
      {
        heading: 'Dispute Resolution',
        blocks: [
          {
            kind: 'p',
            text: 'We believe that most disagreements can be resolved quickly and amicably. If you have a complaint, concern, or dispute relating to these Terms or your interaction with us:',
          },
          {
            kind: 'ul',
            items: [
              'Please contact us first by WhatsApp at +91 89578 04161 or in person at our boutique, so we can try to understand and resolve the issue directly.',
              'We will endeavour to respond to and resolve your concern within 14 business days.',
              'If we are unable to reach an amicable resolution, disputes may be referred to consumer dispute redressal mechanisms under the Consumer Protection Act, 2019, or resolved through the courts of Kanpur as specified above.',
            ],
          },
        ],
      },
      {
        heading: 'Amendments to These Terms',
        blocks: [
          {
            kind: 'p',
            text: 'We reserve the right to modify, update, or replace any part of these Terms at any time and without prior notice, by posting the revised Terms on this page. The "Last updated" date at the top of this page reflects when the most recent changes were made. We encourage you to check this page periodically. Your continued use of the Site after any changes are posted constitutes your acceptance of the revised Terms.',
          },
        ],
      },
      {
        heading: 'Contact Us',
        blocks: [
          {
            kind: 'p',
            text: 'If you have any questions about these Terms or our services, please reach out to us:',
          },
          {
            kind: 'ul',
            items: [
              'Solitaire Jewellery Boutique',
              'Lane of Skin Mantraa, 113/65B, Behind Hotel Royal Cliff, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002, India',
              'WhatsApp: +91 89578 04161',
              'Hours: Monday to Saturday, 12 noon to 8 PM IST',
            ],
          },
        ],
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────
     COOKIE POLICY
  ────────────────────────────────────────────────────────────────────── */
  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    description:
      'How we use cookies and similar technologies on solitairejewelleryboutique.com, and how you can control your preferences.',
    lastUpdated: '1 July 2026',
    body: [
      {
        heading: 'What Are Cookies',
        blocks: [
          {
            kind: 'p',
            text: 'Cookies are small text files that a website places on your device when you visit. They are widely used to make websites work efficiently, to remember your preferences, and to provide analytics information to website owners. Some cookies are set by the website you are visiting; others are set by third-party services that operate on the page.',
          },
        ],
      },
      {
        heading: 'Cookies We Use',
        blocks: [
          {
            kind: 'p',
            text: 'We use a deliberately small number of cookies and tracking technologies, categorised as follows:',
          },
          {
            kind: 'ul',
            items: [
              'Essential cookie: a single short-lived session cookie that powers the cookie consent banner. It records whether you have accepted or declined optional cookies, so we do not ask you again on every page. No personal data is stored in this cookie.',
              'Plausible Analytics (no cookie): our default web analytics tool is cookieless. Plausible counts page views in aggregate without tracking individual users, storing IP addresses, or setting any cookies.',
              'Google Analytics (consent required): if you opt in, Google Analytics cookies are set to track which pages you visit and how long you spend on them. This data is used to improve our website.',
              'Meta Pixel (consent required): if you opt in, the Meta Pixel tracks your visit and certain actions for advertising attribution on Facebook and Instagram.',
            ],
          },
        ],
      },
      {
        heading: 'Your Cookie Choices',
        blocks: [
          {
            kind: 'p',
            text: 'When you visit our website for the first time, a consent banner will appear. You can choose to:',
          },
          {
            kind: 'ul',
            items: [
              'Accept all cookies — essential, analytics, and advertising.',
              'Reject non-essential cookies — only the strictly necessary session cookie will be used; no analytics or advertising cookies will be set.',
              'Customise your preferences — choose which categories of cookies you accept.',
            ],
          },
          {
            kind: 'p',
            text: 'You can change or withdraw your consent at any time by clearing your browser cookies and revisiting our website, which will re-display the consent banner. You can also manage or delete cookies directly through your browser settings; please refer to your browser\'s help documentation for instructions.',
          },
        ],
      },
      {
        heading: 'Third-Party Cookies',
        blocks: [
          {
            kind: 'p',
            text: 'The optional analytics and advertising cookies described above are set by Google LLC and Meta Platforms, Inc. respectively. These third parties have their own privacy and cookie policies, which govern how they collect and use the data gathered through their cookies. We have no control over these third-party cookies. For more information, please visit Google\'s Privacy Policy and Meta\'s Privacy Policy.',
          },
        ],
      },
      {
        heading: 'Updates to This Policy',
        blocks: [
          {
            kind: 'p',
            text: 'We may update this Cookie Policy from time to time to reflect changes in technology, law, or our use of cookies. Any changes will be posted on this page with an updated "Last updated" date. For questions about our use of cookies, please contact us via WhatsApp at +91 89578 04161.',
          },
        ],
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────
     BOUTIQUE POLICY (Returns, Exchange, After-Sales)
  ────────────────────────────────────────────────────────────────────── */
  returns: {
    slug: 'returns',
    title: 'Boutique Policy',
    description:
      'Our policy on authentication, after-sales care, exchange, buy-back, and returns for pieces purchased from Solitaire Jewellery Boutique.',
    lastUpdated: '1 July 2026',
    body: [
      {
        heading: 'Authenticity and Documentation',
        blocks: [
          {
            kind: 'p',
            text: 'Every piece sold by Solitaire Jewellery Boutique comes with a Solitaire authentication card. Depending on the type of piece, it will also carry the relevant certification:',
          },
          {
            kind: 'ul',
            items: [
              'Diamonds of significance carry a GIA (Gemological Institute of America) or IGI (International Gemological Institute) grading report.',
              'Gold pieces carry the BIS (Bureau of Indian Standards) Hallmark, confirming metal purity.',
              'Polki and kundan pieces are accompanied by a written description of materials and their provenance where available.',
            ],
          },
          {
            kind: 'p',
            text: 'Please keep all documentation you receive at the time of purchase — the authentication card, certificates, and invoice. These documents are required for resale, exchange, buy-back, and insurance purposes. We are unable to process exchanges, buy-backs, or valuation requests without the original documentation.',
          },
        ],
      },
      {
        heading: 'Complimentary After-Sales Service',
        blocks: [
          {
            kind: 'p',
            text: 'We stand behind every piece we sell. As part of our commitment to you, we offer a lifetime complimentary annual check-up service:',
          },
          {
            kind: 'ul',
            items: [
              'Bring your piece into the boutique once a year and our craftsmen will inspect it at no charge.',
              'We will tighten any loosened prong or setting to protect your stone.',
              'We will polish the gold to restore its lustre.',
              'We will re-foil any kundan work that has loosened or dulled over time.',
              'This service is available for the life of the piece, for pieces purchased from us.',
            ],
          },
          {
            kind: 'p',
            text: 'We recommend bringing your piece in every year, especially after a season of heavy wear such as a wedding season, to catch any small issues before they become larger ones.',
          },
        ],
      },
      {
        heading: 'Exchange Against Future Purchases',
        blocks: [
          {
            kind: 'p',
            text: 'We offer a lifetime exchange programme for pieces purchased from Solitaire. The terms are as follows:',
          },
          {
            kind: 'ul',
            items: [
              'Pieces may be exchanged against new purchases at any time, at the prevailing valuation on the date of exchange.',
              'The credit value of your piece will be assessed by our team based on the current gold rate, the condition of the piece, and the original certificate.',
              'The credit received is applied directly as a discount against your next purchase at our boutique.',
              'The original piece, its authentication card, certificate, and invoice must be presented at the time of exchange.',
              'Exchange is not available for pieces not purchased from Solitaire.',
            ],
          },
        ],
      },
      {
        heading: 'Gold Buy-Back',
        blocks: [
          {
            kind: 'p',
            text: 'If you wish to sell a piece back to us rather than exchange it, we offer a buy-back at the day\'s prevailing gold rate:',
          },
          {
            kind: 'ul',
            items: [
              'Gold is bought back at the day rate per gram for 22K gold, less a deduction for making and finishing charges.',
              'Diamonds and certified gemstones are assessed separately and bought back at a percentage of the current market price, taking condition and grading report into account.',
              'The buy-back price is quoted on the day and is not guaranteed in advance.',
              'Buy-back is subject to verification of the original documentation.',
            ],
          },
        ],
      },
      {
        heading: 'Returns and Refunds',
        blocks: [
          {
            kind: 'p',
            text: 'Because our jewellery is sold in-store with ample opportunity to inspect, discuss, and decide, we do not offer cash refunds post-purchase. The following policy applies to stock pieces:',
          },
          {
            kind: 'ul',
            items: [
              'Stock pieces (not customised or made-to-order) may be exchanged within seven days of purchase, in original, unworn condition, against another piece of equal or greater value.',
              'The piece must be returned with its authentication card, certificate, invoice, and original packaging.',
              'No cash refunds are issued. Exchange credit is applied in-store only.',
              'Made-to-order, personalised, engraved, or altered pieces are not eligible for exchange or return, as they are created specifically for you.',
              'Pieces that show signs of wear, damage, or alteration by a third party will not be accepted for exchange.',
            ],
          },
          {
            kind: 'p',
            text: 'This policy does not affect any rights you may have under the Consumer Protection Act, 2019 in the event of a genuine defect or misrepresentation.',
          },
        ],
      },
      {
        heading: 'Contact for Policy Queries',
        blocks: [
          {
            kind: 'p',
            text: 'If you have any questions about authentication, after-sales service, exchange, or buy-back, please do not hesitate to reach us:',
          },
          {
            kind: 'ul',
            items: [
              'WhatsApp: +91 89578 04161',
              'In person: Monday to Saturday, 12 noon to 8 PM',
              'Address: Lane of Skin Mantraa, 113/65B, Behind Hotel Royal Cliff, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002',
            ],
          },
        ],
      },
    ],
  },
};

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL[slug];
}
