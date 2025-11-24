# Audio Trainer

**Live Demo:** [https://audio-trainer.vercel.app/](https://audio-trainer.vercel.app/)

Un'app web interattiva per allenare l'orecchio musicale, pensata sia per musicisti che per sound engineers.

---

## Caratteristiche

### Per Musicisti

- **Intervalli**: Impara e riconosci tutti gli intervalli musicali (unisono, terza maggiore, quinta giusta, ecc.)
- **Accordi**: Esplora triadi e quadriadi (maggiore, minore, 7th, maj7, ecc.)
- **Scale & Modi**: Teoria completa su scale maggiori, minori, pentatoniche e modi jazz
- Riferimenti mnemonici con canzoni famose
- Modalità arpeggio e blocco
- Selezione della nota di partenza (tutte le 12 note)

### Per Sound Engineers

#### Sine Wave Training

- **Learn Theory**: 3 capitoli didattici (cos'è sine wave, frequenza Hz, applicazioni reali)
- **Practice**: Ascolta 8 frequenze critiche + 10 bande ISO + 12 note musicali
- **Real Scenarios**: 3 scenari pratici (feedback hunting, speaker testing, THD measurement)
- **Tech Specs**: Parametri tecnici (densità spettrale, THD, crest factor)

#### EQ Training (Pink Noise)

- **Learn Theory**:
  - Capitolo 1: Come funziona l'EQ (boost vs cut, Q factor, bell vs shelf)
  - Capitolo 2: Fletcher-Munson & Ear Science (curva sensibilità, effetto volume, ear fatigue)
  - Capitolo 3: Masking & Frequency Conflicts (conflitti comuni, subtractive EQ)
- **Practice**: 8 bande principali con vocali (UU, OO, AH, EH, II, SSS) + 10 ISO octave bands
- **Mix Scenarios**: 4 problemi reali (voce sepolta, mix muddy, sibilanti, chitarra boxy)
- **Reference Chart**: Tabella completa stampabile con tutte le bande

### Per Cantanti

- **Pitch Detection**: Real-time pitch detection con feedback visivo
- **Range Finder**: Scopri la tua estensione vocale (lowest/highest note)
- Training progressivo con quiz interattivi

---

## Struttura Learn/Practice

Ogni modulo segue una struttura a **4 tab** per massima didattica:

1. **Learn Theory**: Contenuto teorico completo con capitoli progressivi
2. **Practice**: Playground interattivo per esercitarsi liberamente
3. **Scenarios** (o Quiz): Applicazioni pratiche e casi reali
4. **Specs/Reference**: Tabelle di riferimento e dati tecnici

---

## Architettura Dati

### Separazione Data/UI

Tutti i contenuti didattici sono separati in file dedicati:

- `/src/data/sineWaveData.ts` - Dati Sine Wave Training
- `/src/data/frequencies.ts` - Dati EQ Training (Pink Noise)
- `/src/data/intervals.ts` - Dati Intervalli
- `/src/data/chords.ts` - Dati Accordi
- `/src/data/scales.ts` - Dati Scale & Modi

### Vantaggi

- Componenti UI puliti (<400 righe)
- Facile aggiungere/modificare contenuti
- Pronto per migrazione Supabase
- Riutilizzabile tra moduli

---

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Audio Engine**: Tone.js (Web Audio API)
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Deployment**: Vercel
- **Icons**: Lucide React (no emoji)

---

## Features Audio

### Tone.js Integration

- Sine wave generation (20Hz - 20kHz)
- Pink noise con boost parametrico
- Note playback (tutte le 12 note + ottave)
- Real-time pitch detection
- Volume control con fade in/out

### Autoplay Policy Handling

- User gesture required per primo play
- VolumeController gestisce Tone.start()
- Feedback chiaro all'utente

---

## Sviluppo Locale

```bash
# Clone repo
git clone https://github.com/JeramFernando13/audio-trainer
cd audio-trainer

# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## Contribuire

Contributi benvenuti! Puoi:

- Aggiungere nuovi contenuti didattici in `/src/data`
- Migliorare UX/UI dei componenti
- Fixare bug audio o cross-browser issues
- Suggerire nuovi moduli training

---

## Licenza

MIT License - vedi LICENSE file

---

## Crediti

Sviluppato da Jerry

Librerie principali:

- [Tone.js](https://tonejs.github.io/) - Audio synthesis
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icons
- [Vite](https://vitejs.dev/) - Build tool
