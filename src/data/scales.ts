// Scale intervals in semitones from root
export interface Scale {
  name: string;
  category: 'Foundational' | 'Modes' | 'Pentatonic' | 'Jazz' | 'Exotic';
  intervals: number[]; // Semitones from root (0 = root)
  formula: string; // Interval pattern (T = Tone, S = Semitone)
  degrees: string; // Scale degrees
  description: string;
  mood: string;
  context: string;
  chords: string; // Chords built on this scale
  usage: string; // Practical usage
  examples?: string; // Famous songs/standards
  color: string; // For UI category color
  difficulty: 'easy' | 'medium' | 'hard' | 'pro';
}

export const SCALES_GUIDE: Scale[] = [
  // ============================================
  // FOUNDATIONAL SCALES
  // ============================================
  {
    name: 'Major (Ionian)',
    category: 'Foundational',
    intervals: [0, 2, 4, 5, 7, 9, 11], // C D E F G A B
    formula: 'T-T-S-T-T-T-S',
    degrees: '1 - 2 - 3 - 4 - 5 - 6 - 7',
    description: 'The most fundamental scale in Western music. Bright, happy, and stable.',
    mood: 'Happy, bright, optimistic, stable',
    context: 'Foundation of major key harmony. Used everywhere: pop, rock, classical, jazz.',
    chords: 'I - ii - iii - IV - V - vi - vii°',
    usage: 'Melodies, improvisation, composition. Start here for beginners.',
    examples: 'Do-Re-Mi (Sound of Music), Twinkle Twinkle Little Star',
    color: 'bg-blue-900',
    difficulty: 'easy',
  },
  {
    name: 'Natural Minor (Aeolian)',
    category: 'Foundational',
    intervals: [0, 2, 3, 5, 7, 8, 10], // C D Eb F G Ab Bb
    formula: 'T-S-T-T-S-T-T',
    degrees: '1 - 2 - ♭3 - 4 - 5 - ♭6 - ♭7',
    description: 'The natural minor scale. Dark, sad, and melancholic.',
    mood: 'Sad, melancholic, mysterious, emotional',
    context: 'Minor key harmony. Rock, metal, classical, emotional ballads.',
    chords: 'i - ii° - ♭III - iv - v - ♭VI - ♭VII',
    usage: 'Minor key melodies, dark emotional content, metal riffs.',
    examples: 'Losing My Religion (R.E.M.), Stairway to Heaven intro',
    color: 'bg-purple-900',
    difficulty: 'easy',
  },
  {
    name: 'Harmonic Minor',
    category: 'Foundational',
    intervals: [0, 2, 3, 5, 7, 8, 11], // C D Eb F G Ab B
    formula: 'T-S-T-T-S-T½-S',
    degrees: '1 - 2 - ♭3 - 4 - 5 - ♭6 - 7',
    description: 'Minor scale with raised 7th degree. Creates exotic Middle-Eastern sound.',
    mood: 'Dramatic, exotic, classical, tense',
    context: 'Classical music, neoclassical metal, Middle-Eastern music, flamenco.',
    chords: 'i - ii° - ♭III+ - iv - V - ♭VI - vii°',
    usage: 'V-i cadences in minor, exotic melodies, classical harmony.',
    examples: 'Used extensively by Bach, Yngwie Malmsteen solos',
    color: 'bg-purple-900',
    difficulty: 'medium',
  },
  {
    name: 'Melodic Minor',
    category: 'Foundational',
    intervals: [0, 2, 3, 5, 7, 9, 11], // C D Eb F G A B (ascending)
    formula: 'T-S-T-T-T-T-S',
    degrees: '1 - 2 - ♭3 - 4 - 5 - 6 - 7',
    description: 'Minor scale with raised 6th and 7th. Smooth ascending, natural descending.',
    mood: 'Sophisticated, jazzy, smooth, bittersweet',
    context: 'Jazz improvisation (HUGE in jazz!), classical music, fusion.',
    chords: 'i - ii - ♭III+ - IV - V - vi° - vii°',
    usage: 'Jazz soloing, altered dominant chords, modal interchange.',
    examples: 'Giant Steps (Coltrane), jazz standards',
    color: 'bg-purple-900',
    difficulty: 'hard',
  },

  // ============================================
  // GREEK MODES
  // ============================================
  {
    name: 'Dorian',
    category: 'Modes',
    intervals: [0, 2, 3, 5, 7, 9, 10], // C D Eb F G A Bb
    formula: 'T-S-T-T-T-S-T',
    degrees: '1 - 2 - ♭3 - 4 - 5 - 6 - ♭7',
    description: 'Minor scale with raised 6th degree. Jazzy and sophisticated.',
    mood: 'Cool, jazzy, sophisticated, funky',
    context: 'Jazz, funk, fusion. THE jazz minor mode. Less dark than Aeolian.',
    chords: 'i - ii - ♭III - IV - v - vi° - ♭VII',
    usage: 'Jazz improvisation on minor chords, funk grooves, Santana-style solos.',
    examples: 'So What (Miles Davis), Oye Como Va (Santana)',
    color: 'bg-indigo-900',
    difficulty: 'medium',
  },
  {
    name: 'Phrygian',
    category: 'Modes',
    intervals: [0, 1, 3, 5, 7, 8, 10], // C Db Eb F G Ab Bb
    formula: 'S-T-T-T-S-T-T',
    degrees: '1 - ♭2 - ♭3 - 4 - 5 - ♭6 - ♭7',
    description: 'Minor scale with lowered 2nd degree. Dark, Spanish, flamenco sound.',
    mood: 'Dark, Spanish, exotic, mysterious, tense',
    context: 'Flamenco, metal, Spanish music, Egyptian music.',
    chords: 'i - ♭II - ♭III - iv - v° - ♭VI - ♭vii',
    usage: 'Metal riffs, flamenco guitar, exotic/Middle-Eastern vibes.',
    examples: 'Wherever I May Roam (Metallica), flamenco music',
    color: 'bg-indigo-900',
    difficulty: 'medium',
  },
  {
    name: 'Lydian',
    category: 'Modes',
    intervals: [0, 2, 4, 6, 7, 9, 11], // C D E F# G A B
    formula: 'T-T-T-S-T-T-S',
    degrees: '1 - 2 - 3 - ♯4 - 5 - 6 - 7',
    description: 'Major scale with raised 4th degree. Dreamy, ethereal, floating.',
    mood: 'Dreamy, ethereal, bright, futuristic, uplifting',
    context: 'Film scores, prog rock, jazz, fusion. Joe Satriani loves this!',
    chords: 'I - II - iii - ♯iv° - V - vi - vii',
    usage: 'Maj7#11 chords, film scores, prog rock solos, uplifting sections.',
    examples: 'Flying in a Blue Dream (Satriani), The Simpsons theme',
    color: 'bg-indigo-900',
    difficulty: 'medium',
  },
  {
    name: 'Mixolydian',
    category: 'Modes',
    intervals: [0, 2, 4, 5, 7, 9, 10], // C D E F G A Bb
    formula: 'T-T-S-T-T-S-T',
    degrees: '1 - 2 - 3 - 4 - 5 - 6 - ♭7',
    description: 'Major scale with lowered 7th degree. Bluesy, rock, dominant sound.',
    mood: 'Bluesy, rock, funky, groovy, confident',
    context: 'Blues, rock, funk, country. The dominant 7th chord scale.',
    chords: 'I - ii - iii° - IV - v - vi - ♭VII',
    usage: 'Blues/rock solos, dominant 7th chords, jam bands, Grateful Dead.',
    examples: 'Sweet Child O\' Mine (Guns N\' Roses), Norwegian Wood (Beatles)',
    color: 'bg-indigo-900',
    difficulty: 'medium',
  },
  {
    name: 'Locrian',
    category: 'Modes',
    intervals: [0, 1, 3, 5, 6, 8, 10], // C Db Eb F Gb Ab Bb
    formula: 'S-T-T-S-T-T-T',
    degrees: '1 - ♭2 - ♭3 - 4 - ♭5 - ♭6 - ♭7',
    description: 'The darkest mode. Diminished and unstable. Rarely used as tonal center.',
    mood: 'Unstable, dark, dissonant, mysterious, scary',
    context: 'Metal, avant-garde jazz, diminished harmony.',
    chords: 'i° - ♭II - ♭iii - iv - ♭V - ♭VI - ♭vii',
    usage: 'Half-diminished chords (m7♭5), metal, dissonant sections.',
    examples: 'Army of Me (Björk), metal breakdowns',
    color: 'bg-indigo-900',
    difficulty: 'hard',
  },

  // ============================================
  // PENTATONIC & BLUES
  // ============================================
  {
    name: 'Major Pentatonic',
    category: 'Pentatonic',
    intervals: [0, 2, 4, 7, 9], // C D E G A (5 notes)
    formula: 'T-T-m3-T-m3',
    degrees: '1 - 2 - 3 - 5 - 6',
    description: 'Five-note major scale. Simple, happy, folk-like. No dissonance.',
    mood: 'Happy, simple, folk, country, optimistic',
    context: 'Blues, rock, country, folk, pop. Easiest scale to sound good!',
    chords: 'Works over I - IV - V progressions',
    usage: 'Beginner solos, country licks, pop melodies, very forgiving.',
    examples: 'My Girl (The Temptations), Amazing Grace',
    color: 'bg-green-900',
    difficulty: 'easy',
  },
  {
    name: 'Minor Pentatonic',
    category: 'Pentatonic',
    intervals: [0, 3, 5, 7, 10], // C Eb F G Bb (5 notes)
    formula: 'm3-T-T-m3-T',
    degrees: '1 - ♭3 - 4 - 5 - ♭7',
    description: 'Five-note minor scale. THE rock/blues scale. Instant rock star sound.',
    mood: 'Bluesy, rock, cool, raw, emotional',
    context: 'Rock, blues, metal. Most used scale in rock guitar solos.',
    chords: 'Works over i - iv - v progressions',
    usage: 'Rock solos, blues licks, metal riffs. Start here for rock guitar!',
    examples: 'Stairway to Heaven solo, Black Dog (Led Zeppelin)',
    color: 'bg-green-900',
    difficulty: 'easy',
  },
  {
    name: 'Blues Scale',
    category: 'Pentatonic',
    intervals: [0, 3, 5, 6, 7, 10], // C Eb F F# G Bb (6 notes)
    formula: 'm3-T-S-S-m3-T',
    degrees: '1 - ♭3 - 4 - ♭5 - 5 - ♭7',
    description: 'Minor pentatonic + blue note (♭5). THE blues sound.',
    mood: 'Bluesy, soulful, expressive, raw, emotional',
    context: 'Blues, rock, jazz. The ♭5 "blue note" is the secret sauce.',
    chords: 'Works over 12-bar blues, dominant 7th chords',
    usage: 'Blues solos, BB King style, bending the blue note.',
    examples: 'The Thrill Is Gone (B.B. King), Crossroads (Cream)',
    color: 'bg-green-900',
    difficulty: 'medium',
  },

  // ============================================
  // JAZZ SCALES
  // ============================================
  {
    name: 'Bebop Dominant',
    category: 'Jazz',
    intervals: [0, 2, 4, 5, 7, 9, 10, 11], // C D E F G A Bb B (8 notes!)
    formula: 'T-T-S-T-T-S-S-S',
    degrees: '1 - 2 - 3 - 4 - 5 - 6 - ♭7 - 7',
    description: 'Mixolydian + major 7th passing tone. Bebop classic for V7 chords.',
    mood: 'Jazzy, swinging, bebop, sophisticated',
    context: 'Bebop, jazz standards. Used on dominant 7th chords (G7, C7).',
    chords: 'V7 chords in ii-V-I progressions',
    usage: 'Jazz soloing on dominant chords, creates strong downbeats on chord tones.',
    examples: 'Charlie Parker solos, Dizzy Gillespie runs',
    color: 'bg-amber-900',
    difficulty: 'hard',
  },
  {
    name: 'Bebop Major',
    category: 'Jazz',
    intervals: [0, 2, 4, 5, 7, 8, 9, 11], // C D E F G G# A B (8 notes!)
    formula: 'T-T-S-T-S-S-T-S',
    degrees: '1 - 2 - 3 - 4 - 5 - ♯5 - 6 - 7',
    description: 'Major scale + #5 passing tone. Bebop for major chords.',
    mood: 'Jazzy, bebop, sophisticated, major feel',
    context: 'Bebop, jazz standards. Used on major 7th chords (Cmaj7, Fmaj7).',
    chords: 'Imaj7, IVmaj7 chords',
    usage: 'Jazz soloing on major chords, bebop lines.',
    examples: 'Clifford Brown solos, bebop melodies',
    color: 'bg-amber-900',
    difficulty: 'hard',
  },
  {
    name: 'Altered Scale (Super Locrian)',
    category: 'Jazz',
    intervals: [0, 1, 3, 4, 6, 8, 10], // C Db Eb E(Fb) Gb Ab Bb
    formula: 'S-T-S-T-T-T-T',
    degrees: '1 - ♭2 - ♭3 - ♭4(3) - ♭5 - ♭6(#5) - ♭7',
    description: '7th mode of melodic minor. For altered dominant chords (7#9, 7b9).',
    mood: 'Tense, dissonant, modern jazz, outside',
    context: 'Modern jazz, fusion. THE scale for altered dominant chords.',
    chords: '7♯9, 7♭9, 7♯5, 7♭5, 7alt chords',
    usage: 'Jazz soloing on altered dominants, creates tension before resolution.',
    examples: 'Giant Steps (Coltrane), Herbie Hancock solos',
    color: 'bg-amber-900',
    difficulty: 'pro',
  },
  {
    name: 'Lydian Dominant (Mixolydian ♯11)',
    category: 'Jazz',
    intervals: [0, 2, 4, 6, 7, 9, 10], // C D E F# G A Bb
    formula: 'T-T-T-S-T-S-T',
    degrees: '1 - 2 - 3 - ♯4 - 5 - 6 - ♭7',
    description: 'Mixolydian with raised 4th. For 7#11 chords.',
    mood: 'Colorful, jazzy, tension, sophisticated',
    context: 'Jazz, fusion. 4th mode of melodic minor. Sounds "out" but controlled.',
    chords: '7♯11 chords (C7♯11, D7♯11)',
    usage: 'Jazz soloing on dominant 7#11 chords, creates colorful tension.',
    examples: 'The Simpsons theme, jazz fusion solos',
    color: 'bg-amber-900',
    difficulty: 'pro',
  },
  {
      name: 'Whole-Half Diminished',
      category: 'Jazz',
      intervals: [0, 2, 3, 5, 6, 8, 9, 11], // C D Eb F F# G# A B (8 notes!)
      formula: 'T-S-T-S-T-S-T-S',
      degrees: "1 - 2 - ♭3 - 4 - ♭5 - ♯5 - 6 - 7",
      description: 'Symmetrical scale alternating whole-half steps. For dim7 chords.',
      mood: 'Tense, symmetrical, unstable, mysterious',
      context: 'Jazz, classical. Used on diminished 7th chords.',
      chords: 'dim7 chords (Cdim7, Ebdim7, F#dim7, Adim7 - all same scale!)',
      usage: 'Soloing on dim7 chords, passing chords, tension.',
      examples: 'Classical music, jazz transitions',
      color: 'bg-amber-900',
      difficulty: 'pro',
  },
  {
      name: 'Half-Whole Diminished',
      category: 'Jazz',
      intervals: [0, 1, 3, 4, 6, 7, 9, 10], // C Db Eb E F# G A Bb (8 notes!)
      formula: 'S-T-S-T-S-T-S-T',
      degrees: "1 - ♭2 - ♭3 - 3 - ♯4 - 5 - 6 - ♭7",
      description: 'Symmetrical scale alternating half-whole steps. For 7b9 chords.',
      mood: 'Tense, colorful, dominant, jazzy',
      context: 'Jazz. Used on dominant 7b9 chords.',
      chords: '7♭9 chords (C7♭9, Eb7♭9, F#7♭9, A7♭9)',
      usage: 'Soloing on dominant 7b9 chords, bebop, modern jazz.',
      examples: 'Bebop lines, Dizzy Gillespie',
      color: 'bg-amber-900',
      difficulty: 'pro',
  },

  // ============================================
  // EXOTIC/WORLD SCALES
  // ============================================
  {
    name: 'Whole Tone',
    category: 'Exotic',
    intervals: [0, 2, 4, 6, 8, 10], // C D E F# G# A# (6 notes, all whole steps)
    formula: 'T-T-T-T-T-T',
    degrees: '1 - 2 - 3 - ♯4 - ♯5 - ♯6',
    description: 'Six notes, all whole tones apart. Dreamy, surreal, floating.',
    mood: 'Dreamy, surreal, floating, impressionist, otherworldly',
    context: 'Impressionist music (Debussy), film scores, dream sequences.',
    chords: 'Augmented triads, whole tone clusters',
    usage: 'Film scores, creating floating/dream atmosphere, avant-garde.',
    examples: 'Voiles (Debussy), Stevie Wonder songs',
    color: 'bg-rose-900',
    difficulty: 'hard',
  },
  {
    name: 'Chromatic',
    category: 'Exotic',
    intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // All 12 notes
    formula: 'S-S-S-S-S-S-S-S-S-S-S-S',
    degrees: 'All 12 semitones',
    description: 'All twelve notes. Maximum tension, no tonal center.',
    mood: 'Tense, chromatic, transitional, atonal',
    context: 'Classical, jazz, transitions, chromatic passages.',
    chords: 'Chromatic passing tones',
    usage: 'Chromatic runs, connecting chord tones, bebop lines.',
    examples: 'Flight of the Bumblebee, bebop chromatic runs',
    color: 'bg-rose-900',
    difficulty: 'hard',
  },
  {
    name: 'Hungarian Minor (Gypsy)',
    category: 'Exotic',
    intervals: [0, 2, 3, 6, 7, 8, 11], // C D Eb F# G Ab B
    formula: 'T-S-T½-S-S-T½-S',
    degrees: '1 - 2 - ♭3 - ♯4 - 5 - ♭6 - 7',
    description: 'Harmonic minor with raised 4th. Exotic gypsy/Hungarian sound.',
    mood: 'Exotic, gypsy, dramatic, Middle-Eastern, intense',
    context: 'Gypsy music, klezmer, metal, neoclassical.',
    chords: 'i - II - ♭III+ - ♯iv° - V',
    usage: 'Exotic melodies, gypsy jazz, Yngwie Malmsteen style.',
    examples: 'Gypsy jazz, Csárdás (folk dance)',
    color: 'bg-rose-900',
    difficulty: 'hard',
  },
  {
    name: 'Phrygian Dominant (Spanish Gypsy)',
    category: 'Exotic',
    intervals: [0, 1, 4, 5, 7, 8, 10], // C Db E F G Ab Bb
    formula: 'S-T½-S-T-S-T-T',
    degrees: '1 - ♭2 - 3 - 4 - 5 - ♭6 - ♭7',
    description: 'Phrygian with major 3rd. Flamenco, Spanish, Middle-Eastern.',
    mood: 'Spanish, flamenco, exotic, passionate, intense',
    context: 'Flamenco, Spanish music, Middle-Eastern, metal.',
    chords: 'I - ♭II - ♭III - iv - v° - ♭VI - ♭vii',
    usage: 'Flamenco guitar, Spanish melodies, exotic metal.',
    examples: 'Flamenco music, Malagueña, Dire Straits solos',
    color: 'bg-rose-900',
    difficulty: 'hard',
  },
  {
    name: 'Arabic Scale (Hijaz)',
    category: 'Exotic',
    intervals: [0, 1, 4, 5, 7, 8, 11], // C Db E F G Ab B
    formula: 'S-T½-S-T-S-T½-S',
    degrees: '1 - ♭2 - 3 - 4 - 5 - ♭6 - 7',
    description: 'Traditional Arabic/Middle-Eastern scale. Very exotic and tense.',
    mood: 'Middle-Eastern, exotic, mysterious, tense',
    context: 'Arabic music, Middle-Eastern, Bollywood.',
    chords: 'Traditional Middle-Eastern harmony',
    usage: 'Middle-Eastern melodies, exotic atmosphere, world music.',
    examples: 'Traditional Arabic music, Bollywood soundtracks',
    color: 'bg-rose-900',
    difficulty: 'hard',
  },
];

// Difficulty configuration for training
export const SCALES_DIFFICULTY_CONFIG = {
  easy: {
    scales: ['Major (Ionian)', 'Natural Minor (Aeolian)', 'Major Pentatonic', 'Minor Pentatonic'],
    direction: 'ascending',
    timeLimit: null,
    showHints: true,
    label: 'Easy 🟢',
    description: 'Basic scales: Major, Minor, Pentatonics (ascending only)',
  },
  medium: {
    scales: [
      'Major (Ionian)',
      'Natural Minor (Aeolian)',
      'Dorian',
      'Mixolydian',
      'Phrygian',
      'Major Pentatonic',
      'Minor Pentatonic',
      'Blues Scale',
    ],
    direction: 'both',
    timeLimit: 20,
    showHints: true,
    label: 'Medium 🟡',
    description: 'Main modes + pentatonics + blues (both directions)',
  },
  hard: {
    scales: [
      'Major (Ionian)',
      'Natural Minor (Aeolian)',
      'Harmonic Minor',
      'Melodic Minor',
      'Dorian',
      'Phrygian',
      'Lydian',
      'Mixolydian',
      'Locrian',
      'Major Pentatonic',
      'Minor Pentatonic',
      'Blues Scale',
      'Bebop Dominant',
      'Lydian Dominant',
    ],
    direction: 'both',
    timeLimit: 15,
    showHints: false,
    label: 'Hard 🟠',
    description: 'All modes + jazz bebop scales',
  },
  pro: {
    scales: SCALES_GUIDE.map((s) => s.name), // ALL scales
    direction: 'both',
    timeLimit: 10,
    showHints: false,
    label: 'Pro 🔴',
    description: 'All scales including exotic & altered (blind mode)',
  },
};