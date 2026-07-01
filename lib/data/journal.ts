import type { JournalArticle } from './types';
import { PLACEHOLDER } from '@/lib/placeholder-media';

const JOURNAL_COVERS = {
  'akshaya-tritiya-buying-guide':         '/journal/akshaya-tritiya-cover.webp',
  'polki-vs-kundan-a-buyers-guide':       '/journal/polki-vs-kundan-cover.webp',
  'how-to-verify-a-gia-certified-solitaire': '/journal/gia-certificate-cover.webp',
} as const;

export const ARTICLES: JournalArticle[] = [
  {
    slug: 'polki-vs-kundan-a-buyers-guide',
    title: 'Polki vs Kundan: A Simple Guide to Telling Them Apart',
    excerpt:
      'Polki and Kundan look like cousins on the counter, but one holds diamond value and one does not. Here is the difference in plain words, and how to choose.',
    category: 'Buying Guide',
    hero: {
      src: JOURNAL_COVERS['polki-vs-kundan-a-buyers-guide'],
      alt: 'Polki and Kundan jewellery laid side-by-side on cream cloth',
      width: 1600,
      height: 900,
    },
    readMinutes: 7,
    publishedAt: '2026-04-03T08:00:00.000Z',
    body: [
      'Walk into a jewellery shop in Kanpur, ask to see Polki, and half the time you will be shown Kundan instead. The two words get used as if they mean the same thing. They do not. The pieces can look like cousins on the counter, but what they are made of, and what they are worth, is not the same at all.',
      'If you are buying for a wedding, or buying something you hope to hand down, the difference is worth ten minutes of your time. Here it is, the way we explain it to families who sit across from us at the boutique.',
      { type: 'h2', text: 'What Polki really is' },
      'Polki is diamond. Specifically, it is uncut diamond, the natural rough that has been flat-cut and polished only enough to bring out its colour and shine. There is no faceting and no machine cutting. The stone stays close to the form it came out of the earth in.',
      'Because the diamond is barely touched, every Polki stone is a little different. The brilliance is soft and milky rather than sharp. It is set into 22K or 24K gold by hand, using a technique where the goldsmith shapes the metal around each stone. Our Polki comes from two workshops in Jaipur we have worked with for more than ten years.',
      { type: 'h2', text: 'What Kundan really is' },
      'Kundan is a setting technique, not a stone. In traditional Kundan work there is no diamond at all. The bright white stones you see are usually glass, backed with a thin mirror foil so they throw light. The skill sits in the gold: refined gold is worked into thin strips and layered to hold each stone, then finished to a smooth, glassy surface.',
      'This is old, patient work, and a good Kundan piece can take weeks to make. But the value lives in the gold and the labour, not in the stones.',
      { type: 'h2', text: 'The differences that actually matter' },
      {
        type: 'list',
        items: [
          'What the stones are: Polki uses real uncut diamond. Traditional Kundan uses glass or other non-diamond stones.',
          'How they catch light: Polki has a soft, frosted glow. Kundan is brighter and sharper, almost mirror-like.',
          'What they are worth: a Polki piece is valued as gold plus diamond. A Kundan piece is valued as gold plus craftsmanship.',
          'Price: weight for weight, Polki costs more because of the diamond content.',
          'Feel: Polki pieces tend to sit heavier and more substantial on the body.',
        ],
      },
      { type: 'h2', text: 'Which one holds its value' },
      'This is the single most useful thing to understand. The uncut diamonds in a Polki piece keep their worth over time, the same way faceted diamonds do. If you ever have the piece valued, the diamond is counted.',
      'Kundan is valued on its gold weight and the quality of the work. The stones add beauty, not resale value. Neither is better or worse than the other. They are simply different things, and you should know which one you are paying for.',
      {
        type: 'quote',
        text: 'A Polki piece is valued as gold and uncut diamond. A Kundan piece is valued as gold and craftsmanship. The difference is the diamond.',
      },
      { type: 'h2', text: 'How to tell them apart yourself' },
      'You do not need to be an expert. Hold the piece under a steady light. Polki stones look slightly uneven, with a warm, natural depth, and no two are quite alike. Kundan stones look uniform and very bright, because foil-backed glass reflects light evenly.',
      'Now turn the piece over. Traditional Kundan is often open at the back, or you can see the foil behind the stones. Polki settings usually enclose the stone in gold. If you are still unsure, ask the jeweller plainly whether the stones are diamond, and ask for that to be written on the bill.',
      { type: 'h2', text: 'Which is right for your wedding' },
      'For most brides it comes down to budget and feeling. Polki feels like an heirloom from the first day, and it carries real diamond value, so it makes sense as the piece you plan to keep and pass on. Kundan is lighter on the budget and reads beautifully in photographs, which makes it lovely for pieces worn once or twice.',
      'Plenty of our brides choose both. A Polki necklace for the main ceremony and the years after, and a Kundan choker for the lighter functions. One day the daughter inherits the Polki. The choker travels with the bride.',
      { type: 'h2', text: 'Questions we hear often' },
      { type: 'h3', text: 'Is Polki always more expensive than Kundan?' },
      'Usually yes, because Polki contains real uncut diamond and traditional Kundan does not. Two pieces of the same gold weight will differ in price mainly because of that diamond.',
      { type: 'h3', text: 'Can a single piece be both Polki and Kundan?' },
      'Yes. Many bridal sets use uncut Polki diamonds held with the Kundan setting technique. In that case you are paying for both the diamond and the gold work, so ask for a clear breakdown of each.',
      { type: 'h3', text: 'Does Kundan have any resale value?' },
      'It holds its gold value. The stones do not add to resale because they are not precious. That is worth keeping in mind if resale matters to you.',
      'The honest way to settle it is to see both side by side. We keep Polki and Kundan in the boutique in Swaroop Nagar, and we will lay them out under the same light, on the same cloth, and let you decide with your own eyes. There is no pressure to buy. Most people know within a minute which one they want.',
    ],
    relatedSlugs: [
      'how-to-verify-a-gia-certified-solitaire',
      'caring-for-your-polki-pieces',
      'wedding-jewellery-checklist-up-bride',
    ],
  },
  {
    slug: 'how-to-verify-a-gia-certified-solitaire',
    title: 'How to Read a Diamond Certificate: GIA, IGI, and What Matters',
    excerpt:
      'A diamond certificate is a page of numbers, and that is how a weak stone gets sold as a strong one. Here is how to read GIA and IGI reports and verify the stone yourself.',
    category: 'Buying Guide',
    hero: {
      src: JOURNAL_COVERS['how-to-verify-a-gia-certified-solitaire'],
      alt: 'GIA certificate next to a loose diamond on a cream linen surface',
      width: 1600,
      height: 900,
    },
    readMinutes: 7,
    publishedAt: '2026-03-21T08:00:00.000Z',
    body: [
      'A diamond certificate looks like a page of numbers and tiny print, and most people nod along without really reading it. That is exactly how a weaker stone gets sold as a stronger one. The good news is that you do not need a gemmology degree to read a certificate well. You need to know which lines matter, and how to check that the stone in front of you is the one the paper describes.',
      'Here is how we walk our customers through it, step by step, before any money changes hands.',
      { type: 'h2', text: 'Why the certificate is the whole point' },
      'A diamond certificate, also called a grading report, is an independent laboratory’s assessment of a stone. The lab has no stake in the sale. It measures the diamond and records exactly what it is. Without that report you are trusting the seller’s word on quality, and quality is most of the price.',
      'Since lab-grown diamonds became common, the report matters even more. A lab-grown stone can look identical to a mined one to the naked eye. The certificate is what tells you which you are holding, and the two are priced very differently.',
      { type: 'h2', text: 'GIA and IGI, and the difference between them' },
      'Two labs come up most often in India. GIA, the Gemological Institute of America, is the global benchmark and is known for strict, consistent grading. IGI, the International Gemological Institute, is widely used in India and is the common choice for studded and bridal diamond jewellery.',
      'Both are reputable. A GIA report tends to carry a small premium because of its reputation for tight grading, so for a single important solitaire many buyers prefer it. For bridal sets with many smaller stones, IGI is standard and sensible. What matters is that the report comes from a recognised lab, not a name you have never heard of.',
      { type: 'h2', text: 'The four Cs, and which ones to care about' },
      'Every report grades four things. People call them the four Cs.',
      { type: 'h3', text: 'Cut' },
      'Cut is how well the diamond is shaped and polished, and it decides how much the stone sparkles. For a round diamond, look for Excellent or Very Good. This is the one we tell people not to compromise on, because cut is what your eye actually sees.',
      { type: 'h3', text: 'Colour' },
      'Colour is graded from D, which is colourless, down through the alphabet as a faint warmth creeps in. D to F is colourless. G to J is near colourless and looks white in a finished piece to most eyes. You rarely need to pay for D when H looks just as white set in gold.',
      { type: 'h3', text: 'Clarity' },
      'Clarity measures the tiny natural marks inside a stone, called inclusions. The scale runs from Flawless down to Included. For most buyers, VS1 or VS2 is the sweet spot: the marks are there but invisible without magnification, so you are not paying for a perfection you cannot see.',
      { type: 'h3', text: 'Carat' },
      'Carat is weight, not size, though the two are linked. A heavier stone costs more per carat as well as in total. A small step down, say from 1.00 to 0.90 carat, can save a noticeable amount while looking almost the same on the hand.',
      { type: 'h2', text: 'How to verify the stone matches the report' },
      {
        type: 'list',
        items: [
          'Check the report online. GIA reports can be confirmed at gia.edu, and IGI reports at igi.org. Enter the report number and match the carat, cut, colour, and clarity on screen against the paper. Every detail should agree.',
          'Find the laser inscription. Most modern reports note that the report number is laser-engraved on the diamond’s girdle, the thin edge around its middle. Ask for a 10x loupe and look for it. It should read the same number as the report.',
          'Read the proportions. The report lists the table percentage and depth percentage. For a round brilliant in the Excellent range, the table is usually around 54 to 58 percent and the depth around 60 to 62.5 percent. Numbers far outside that are worth asking about.',
        ],
      },
      {
        type: 'quote',
        text: 'Two minutes on the lab’s website, a 10x loupe, and the report in your hand. That is all it takes to know the stone is what the paper says.',
      },
      { type: 'h2', text: 'Red flags to watch for' },
      {
        type: 'list',
        items: [
          'No report at all for a stone of any real size.',
          'A report from a lab you cannot find or verify online.',
          'Details on the paper that do not match what you see on the screen.',
          'A seller who is reluctant to hand you a loupe or let you check the number yourself.',
        ],
      },
      { type: 'h2', text: 'Questions we hear often' },
      { type: 'h3', text: 'Is a GIA diamond better than an IGI diamond?' },
      'Not by itself. The stone is the stone. GIA is known for stricter grading, so its report carries extra confidence and often a small premium. IGI is reputable and standard for bridal jewellery in India. Both are fine when the report is genuine.',
      { type: 'h3', text: 'Do small diamonds need certificates?' },
      'Very small accent stones are usually not certified one by one, and that is normal. For any centre stone or solitaire of about 0.30 carat and above, ask for a report.',
      { type: 'h3', text: 'Can I trust a certificate the shop printed itself?' },
      'No. The report must come from an independent lab, not from the seller. A shop’s own printout is a claim, not a certificate.',
      'At Solitaire we do these checks with you, out in the open, before you pay. Every diamond of 0.30 carat and above that we sell is graded by GIA or IGI, and the report goes home with the piece. If you are buying a certified diamond anywhere, do the checks yourself. It takes a few minutes and it is your right as the buyer. Come and see us in Swaroop Nagar and we will show you exactly how.',
    ],
    relatedSlugs: [
      'polki-vs-kundan-a-buyers-guide',
      'why-certified-jewellery-matters-2026',
    ],
  },
  {
    slug: 'caring-for-your-polki-pieces',
    title: 'How to Care for Polki Jewellery So It Lasts for Generations',
    excerpt:
      'Polki is beautiful and delicate, and the two go together. A few small habits, all coming from one fact about how it is made, keep a piece looking new for decades.',
    category: 'Craft',
    hero: {
      src: PLACEHOLDER.journal('caring-for-your-polki-pieces'),
      alt: 'Soft cloth being used to clean a Polki necklace',
      width: 1600,
      height: 900,
    },
    readMinutes: 5,
    publishedAt: '2026-03-09T08:00:00.000Z',
    body: [
      'Polki is beautiful and it is delicate, and the two go together. The same handwork that makes a Polki piece special also means it cannot be treated like a machine-made gold chain. Look after it well and it will outlive you. Treat it carelessly and you will be back at the workshop within a year.',
      'None of the care is complicated. It all comes from one simple fact about how Polki is made.',
      { type: 'h2', text: 'First, understand how Polki is set' },
      'Polki is uncut diamond held in 22K or 24K gold using the Kundan technique. Thin strips of soft, refined gold are pressed around each stone by hand to grip it. There are no claws or modern fittings holding the diamond. The gold itself is the setting, and gold is soft.',
      'That is the reason for every rule below. Anything that loosens or stresses the gold will loosen the stone. Keep the gold happy and the piece stays perfect.',
      { type: 'h2', text: 'Keep it away from water' },
      'Never wear Polki in the shower, the pool, or the sea. Salt water is the worst of the three. Water works its way behind the foil over time, dulls the shine, and slowly loosens the gold’s grip on the stones.',
      'Take the piece off before you wash your hands properly, and certainly before a bath. A few seconds of splashing will not ruin it, but a habit of wearing it near water will.',
      { type: 'h2', text: 'Skip the chemicals' },
      'Perfume, hairspray, lotion, and makeup all contain chemicals that react with the foil and the gold finish. The rule jewellers everywhere repeat is a good one: your jewellery goes on last, after your perfume and makeup have settled, and comes off first at the end of the day.',
      'Never clean Polki with silver polish, jewellery dip, or toothpaste. They are far too harsh. They strip the finish and can ruin the foil behind the stones.',
      { type: 'h2', text: 'Never use an ultrasonic cleaner' },
      'This one matters enough to stand on its own. Ultrasonic cleaners use high-frequency vibration, and that vibration shakes the Kundan setting loose. We see two or three pieces a year that have been cleaned this way and need to come back to the workshop for re-setting. Steam cleaning is the same story. Keep both well away from Polki.',
      { type: 'h2', text: 'How to clean it at home' },
      'Gentle is the whole idea. Wipe the piece with the soft, dry cloth it came with, following the line of the gold. That is usually all it needs. If you have lost the cloth, ask us and we will give you another.',
      'For a little more, use a soft, dry makeup brush to lift dust from between the stones. Do not soak it, do not scrub it, and do not put water or liquid cleaner on the stones.',
      { type: 'h2', text: 'Store each piece on its own' },
      {
        type: 'list',
        items: [
          'Keep every piece in its own soft pouch or a lined box, so stones do not rub against other metal.',
          'Lay necklaces flat rather than hanging them, which strains the gold over time.',
          'Keep a silica gel sachet in the box to soak up moisture, especially through the monsoon.',
          'Do not pile pieces on top of one another in a single drawer.',
        ],
      },
      { type: 'h2', text: 'Bring it in once a year' },
      'Once a year, let a jeweller look the piece over. We check the Kundan, polish the gold, and re-foil any stone that has loosened, before it becomes a lost stone. For anything bought from us, this is included for the life of the piece, at no charge.',
      'A yearly check is the single best habit for keeping Polki looking new for decades. Most of the damage we see could have been caught early.',
      { type: 'h2', text: 'Questions we hear often' },
      { type: 'h3', text: 'Can I wear my Polki every day?' },
      'It is better kept for occasions. Daily wear means daily exposure to water, sweat, and knocks, and that shortens the life of the setting. Polki is made to be worn often, not constantly.',
      { type: 'h3', text: 'My Polki looks dull. Can it be restored?' },
      'Usually yes. Bring it in. A professional clean and polish brings most pieces back, and we can re-foil stones that have dulled from moisture.',
      { type: 'h3', text: 'Is Kundan cared for the same way?' },
      'Yes. Kundan uses the same soft-gold setting, so the same rules apply: no water, no chemicals, no ultrasonic cleaner, and a yearly check.',
      'Polki rewards a little care with a long life. Keep it dry, keep chemicals away, clean it gently, and bring it in once a year. Do that and the piece you wear at your wedding can be worn at your granddaughter’s. If you are ever unsure about a piece, bring it to the boutique in Swaroop Nagar and we will look at it with you.',
    ],
    relatedSlugs: ['polki-vs-kundan-a-buyers-guide'],
  },
  {
    slug: 'wedding-jewellery-checklist-up-bride',
    title: 'The Wedding Jewellery Checklist for the Bride',
    excerpt:
      'Every piece a bride needs, and the order to plan them in, so nothing is left to the last week.',
    category: 'Bridal',
    hero: {
      src: PLACEHOLDER.journal('wedding-jewellery-checklist-up-bride'),
      alt: 'Bridal jewellery laid out for a wedding day photograph',
      width: 1600,
      height: 900,
    },
    readMinutes: 7,
    publishedAt: '2026-02-26T08:00:00.000Z',
    body: [
      'A UP bride traditionally wears more jewellery than the wedding industry diagrams. The diagrams flatten Polki choker plus rani-haar plus mathapatti plus jhumka plus chooda plus haath-phool into one chart and call it complete. It is a starting point, not a final answer.',
      'For most brides, the must-buy list is shorter than expected. A Polki or Kundan choker, a longer second necklace, jhumka or chandelier earrings, a mathapatti or maang-tikka, and the chooda. Everything else is decoration around these five.',
      'Borrow the haath-phool from your mother or grandmother, it is meant to. Borrow the heaviest rani-haar if there is one in the family, most are unworn for years between weddings. The bridal day is one of the few moments that family heirlooms are seen.',
      'Commission only what you will wear again. The choker becomes a high-occasion choker, the jhumka becomes formal-evening earrings, the mathapatti is once-only, let your mother or sister borrow it. We sit with brides at the start of the planning to map this, what to buy, what to borrow, what to skip, before the spend.',
      'The last entry on the checklist is sleep. The day is long. Two-thirds of the photographs are taken between 4 PM and midnight. Eat lunch.',
    ],
    relatedSlugs: ['polki-vs-kundan-a-buyers-guide', 'caring-for-your-polki-pieces'],
  },
  {
    slug: 'why-certified-jewellery-matters-2026',
    title: 'Why a Certificate Is Worth More Than a Good Price',
    excerpt:
      'The cheapest stone is rarely the best value. Here is how to think about it.',
    category: 'Buying Guide',
    hero: {
      src: PLACEHOLDER.journal('why-certified-jewellery-matters-2026'),
      alt: 'Certificate of authenticity displayed alongside a diamond ring',
      width: 1600,
      height: 900,
    },
    readMinutes: 5,
    publishedAt: '2026-02-12T08:00:00.000Z',
    body: [
      'Twenty years ago, certification was a premium add-on. Today it is the floor. Three things changed.',
      'First, lab-grown diamonds. They are real diamonds, chemically, optically, structurally identical to mined diamonds, and they cost a tenth the price. The only way to know which one you are holding is the certificate. Without one, you cannot price the piece honestly.',
      'Second, BIS hallmarking. Mandatory in India since 16 June 2021. Every gold piece sold legally in India carries the hallmark. If a piece does not have it, it should not be on sale.',
      'Third, the customer. The 2026 buyer is comfortable asking for documentation, comfortable verifying it themselves, and uncomfortable buying without it. We meet that buyer with the documentation already in hand.',
      'At Solitaire, every diamond ≥0.30 ct is GIA or IGI certified, every gold piece carries the BIS hallmark, and every transaction is documented. Ask any seller of jewellery in 2026 to do the same.',
    ],
    relatedSlugs: ['how-to-verify-a-gia-certified-solitaire'],
  },
  {
    slug: 'akshaya-tritiya-buying-guide',
    title: 'Buying Gold on Akshaya Tritiya: A Calm, Simple Guide',
    excerpt:
      'Akshaya Tritiya is one of the busiest gold-buying days of the year, which is exactly why it is easy to buy badly. Here is how to buy gold with a clear head.',
    category: 'Festive',
    hero: {
      src: JOURNAL_COVERS['akshaya-tritiya-buying-guide'],
      alt: 'Gold coins and bangles arranged for Akshaya Tritiya',
      width: 1600,
      height: 900,
    },
    readMinutes: 6,
    publishedAt: '2026-04-10T08:00:00.000Z',
    body: [
      'Akshaya Tritiya is one of the busiest gold-buying days of the year, and that is exactly why it is easy to buy badly. The shops are full, everyone is in a hurry, and the rate is moving. A little planning turns a rushed purchase into a good one. Here is how to buy gold on Akshaya Tritiya, or on any festival, with a clear head.',
      { type: 'h2', text: 'What Akshaya Tritiya is, briefly' },
      'Akshaya Tritiya falls on the third lunar day of the bright half of Vaishakha, the Hindu month that runs through April and May. In 2026 it falls on Sunday, 19 April. The word akshaya means something that never diminishes, and tradition holds that anything bought or begun on this day brings lasting good fortune. For generations, that has meant gold.',
      { type: 'h2', text: 'Why gold, and what it really gives you' },
      'Buying gold on this day is partly faith and partly habit, and there is nothing wrong with either. It is also a store of value that families in India have trusted for a very long time. Just be clear with yourself about why you are buying, whether as a small ritual purchase, a gift, or a long-term holding. The answer changes what you should buy.',
      { type: 'h2', text: 'Coins, bars, or jewellery' },
      { type: 'h3', text: 'If you want the simplest, safest buy' },
      'A small fixed-weight gold coin or bar from a hallmarked source is the cleanest option. There is very little making charge, the purity is certified, and it is easy to value later. We keep 5 gram, 10 gram, and 25 gram 24K coins in stock through the week of Akshaya Tritiya.',
      { type: 'h3', text: 'If you want something to actually wear' },
      'A small piece of jewellery, a bangle, a light chain, a pair of jhumkas, is the better instinct for most families. It is worn, remembered, and kept, rather than sitting in a locker. You do pay a making charge for it, so ask for that charge to be shown clearly on the bill.',
      { type: 'h2', text: 'Always check the hallmark' },
      'Since 16 June 2021, BIS hallmarking has been mandatory for gold jewellery sold in India. Every piece should carry the BIS mark, the purity in carats, and a HUID number. If a piece has no hallmark, it should not be on sale. On a busy festival day, this is the one check you must not skip.',
      {
        type: 'list',
        items: [
          'The BIS logo, a small triangle.',
          'The purity, such as 22K916 for 22 carat or 18K750 for 18 carat.',
          'A six-character HUID code, unique to that piece.',
        ],
      },
      { type: 'h2', text: 'How much making charge is fair' },
      'Making charge is the cost of turning raw gold into a finished piece. It is usually a percentage of the gold value or a fixed rate per gram. Plain coins and bars carry almost none. Simple jewellery carries less than heavy, detailed designs. There is no single right number, but you should always be told the making charge as its own line, not have it folded silently into the total.',
      { type: 'h2', text: 'Timing, and the truth about muhurat' },
      'The shubh muhurat windows are useful structure, and if a particular time matters to your family, follow it. But do not let the clock push you into a hurried decision at a crowded counter. The right time to buy is the time that lets you check the hallmark, read the bill, and buy calmly.',
      'We stay open through Akshaya Tritiya from the morning, and we hold the day’s gold rate, so the price you see at 11 in the morning is the price you pay at 7 in the evening. That takes the rush out of it.',
      {
        type: 'quote',
        text: 'The right time to buy gold is not the busiest hour of the day. It is the moment you can check the hallmark and read the bill without being hurried.',
      },
      { type: 'h2', text: 'A short checklist before you pay' },
      {
        type: 'list',
        items: [
          'Confirm the BIS hallmark and the HUID on the piece.',
          'Ask for the day’s gold rate and how it was applied.',
          'See the making charge as a separate line.',
          'Check whether GST is added on top, and that it appears on the bill.',
          'Keep the full bill. You will want it for insurance, resale, or exchange later.',
        ],
      },
      { type: 'h2', text: 'Questions we hear often' },
      { type: 'h3', text: 'Is festival gold more expensive?' },
      'The gold rate is set by the market, not by the festival, so the metal itself is not dearer on Akshaya Tritiya. What can rise is demand for certain ready-made pieces. Buying a standard coin or a simple design avoids that.',
      { type: 'h3', text: 'Coin or jewellery for a first gold purchase?' },
      'For pure value and easy resale, a hallmarked coin. For something the family will use and remember, a simple piece of jewellery. Many people buy a small coin each year and a piece of jewellery for the bigger occasions.',
      { type: 'h3', text: 'Can I exchange festival gold later?' },
      'Hallmarked gold is straightforward to exchange or update, which is another reason the hallmark and the bill matter. Keep both safe.',
      'Akshaya Tritiya is meant to be a happy, hopeful purchase, not a stressful one. Check the hallmark, understand the making charge, keep the bill, and buy at a pace that suits you. If you would rather buy without the festival-day crowd, come and see us at the boutique in Swaroop Nagar, and we will take the time to get it right with you.',
    ],
    relatedSlugs: ['why-certified-jewellery-matters-2026'],
  },
];

export function getArticle(slug: string): JournalArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRecentArticles(limit = 3): JournalArticle[] {
  return [...ARTICLES]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit);
}

export function getRelatedArticles(article: JournalArticle): JournalArticle[] {
  if (!article.relatedSlugs?.length) {
    return ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  }
  return article.relatedSlugs
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is JournalArticle => Boolean(a));
}
