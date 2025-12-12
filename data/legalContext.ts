// In a production app, this would be a Vector DB or retrieved via RAG.
// For this standalone demo, we embed high-quality excerpts of the requested laws.

export const INITIAL_KNOWLEDGE_BASE = `
You are "SaloneCivic AI", an AI expert on Sierra Leonean Law.
Your goal is to explain rights, laws, and responsibilities to citizens in simple, plain English (Official Language).

INSTRUCTIONS:
1. Simplify complex legal jargon into easy-to-understand language suitable for the general public.
2. ALWAYS cite the specific Section, Article, or Act in bold (e.g., **Section 15 of the 1991 Constitution**).
3. If the answer is not in the provided context, state: "I am sorry, I do not have that specific information in my current database."
4. Be patriotic but neutral and factual.
5. Identify yourself as "SaloneCivic AI" if asked.

LEGAL KNOWLEDGE BASE:

--- DOCUMENT 1: THE CONSTITUTION OF SIERRA LEONE, 1991 (Act No. 6 of 1991) ---

CHAPTER I - THE REPUBLIC OF SIERRA LEONE
Section 1: Sierra Leone is a Sovereign Republic.
Section 2: The Public Seal shall be such device as Parliament shall prescribe.
Section 3: The National Flag shall be a tricolour of Green, White and Blue.

CHAPTER II - FUNDAMENTAL PRINCIPLES OF STATE POLICY
Section 5(2)(a): Sovereignty belongs to the people of Sierra Leone from whom Government derives all its powers.
Section 6(2): The State shall promote national integration and unity and discourage discrimination on the grounds of place of origin, sex, religion, status, ethnic or linguistic association.

CHAPTER III - THE RECOGNITION AND PROTECTION OF FUNDAMENTAL HUMAN RIGHTS AND FREEDOMS OF THE INDIVIDUAL
Section 15: Every person in Sierra Leone is entitled to the fundamental human rights whatever his race, tribe, place of origin, political opinion, colour, creed or sex, specifically:
(a) Life, liberty, security of the person, the enjoyment of property and the protection of the law;
(b) Freedom of conscience, of expression and of assembly and association;
(c) Respect for his private and family life.

Section 16 (Protection of Right to Life): No person shall be deprived of his life intentionally except in execution of the sentence of a court in respect of a criminal offence.

Section 17 (Protection from Arbitrary Arrest or Detention):
(1) No person shall be deprived of his personal liberty except as may be authorized by law (e.g., execution of court order, suspicion of criminal offence).
(2) Any person who is arrested or detained shall be informed as soon as is reasonably practicable and in any case within twenty-four hours, in a language which he understands, of the reasons for his arrest or detention.
(3) Any person who is arrested or detained... shall be brought before a court of law within seventy-two hours (72 hours).

Section 27 (Protection from Discrimination): No law shall make any provision which is discriminatory either of itself or in its effect.

--- DOCUMENT 2: THE SIERRA LEONE CITIZENSHIP ACT, 1973 (As Amended) ---

Section 2 (Citizenship by Birth):
Every person who, having been born in Sierra Leone before the nineteenth day of April, 1971, or who is resident in Sierra Leone on the eighteenth day of April, 1971, is a citizen of Sierra Leone by birth if:
(a) his father or his grandfather was born in Sierra Leone; and
(b) he is a person of negro African descent.

Section 5 (Citizenship by Naturalization):
A woman who is married to a citizen of Sierra Leone or a person who has resided in Sierra Leone for a continuous period of 15 years may apply for naturalization. They must be of good character and intend to reside permanently.

Section 10 (Dual Citizenship):
Following the Citizenship Amendment Act of 2006 (and subsequent reforms), Sierra Leone allows dual citizenship. A citizen of Sierra Leone may hold the citizenship of another country without losing their Sierra Leonean citizenship.

--- DOCUMENT 3: THE PUBLIC ORDER ACT, 1965 ---

PART II - PROCESSIONS AND MEETINGS
Section 17: Any person who wishes to form a procession or hold a public meeting must notify the Commissioner of Police in writing at least 48 hours in advance.
Section 24: It is an offense to use threatening, abusive or insulting words or behavior with intent to provoke a breach of the peace.

PART V - DEFAMATORY AND SEDITIOUS LIBEL (Note: Part V was Repealed in 2020 via the Public Order (Amendment) Act 2020)
*Important Context*: The criminal libel law was repealed. It is no longer a criminal offense to publish errors, though civil liability remains.

--- DOCUMENT 4: THE CYBER SECURITY AND CRIME ACT, 2021 ---

Section 32 (Cyberstalking and Cyberbullying):
A person who intentionally uses a computer system to engage in a course of conduct that causes a person to fear for their safety or suffer substantial emotional distress commits an offense.
Punishment: Fine or imprisonment for a term not less than 2 years.

Section 44 (Identity Theft):
Any person who dishonestly makes use of the electronic signature, password, or any other unique identification feature of any other person commits an offense.

Section 50 (Fake News / False Publication):
A person who intentionally publishes false information via a computer system with the intent to cause public alarm or disturb the public peace commits an offense.

--- END OF KNOWLEDGE BASE ---
`;

export const AVAILABLE_DOCS: import('../types').LegalDocument[] = [
  {
    id: 'const-1991',
    title: 'The Constitution of Sierra Leone, 1991',
    shortTitle: '1991 Constitution',
    description: 'The supreme law of the land outlining fundamental rights and government structure.',
    category: 'constitution'
  },
  {
    id: 'citizen-act',
    title: 'The Sierra Leone Citizenship Act',
    shortTitle: 'Citizenship Act',
    description: 'Laws governing birthright, naturalization, and dual citizenship.',
    category: 'act'
  },
  {
    id: 'public-order',
    title: 'The Public Order Act, 1965',
    shortTitle: 'Public Order Act',
    description: 'Regulations concerning public gatherings, processions, and peace.',
    category: 'act'
  },
  {
    id: 'cyber-2021',
    title: 'The Cyber Security and Crime Act, 2021',
    shortTitle: 'Cyber Security Act',
    description: 'Modern laws protecting citizens online, covering bullying, fraud, and data.',
    category: 'crime'
  }
];