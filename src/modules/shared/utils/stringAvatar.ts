type Avatar = { bgcolor: string; children: string };

const PARTICLES = new Set([
  'de',
  'del',
  'la',
  'las',
  'los',
  'y',
  'da',
  'do',
  'das',
  'dos',
  'van',
  'von',
  'bin',
  'al',
]);

/** Divide, normaliza espacios y quita puntuación periférica simple. */
function normalizeWords(input?: string): string[] {
  if (!input) return [];
  return input
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((w) => w.replace(/^[\s.,-]+|[\s.,-]+$/g, ''))
    .filter(Boolean);
}

/** Quita partículas internas comunes como "de", "del", etc. */
function cleanNameTokens(name?: string): string[] {
  const words = normalizeWords(name);
  if (words.length === 0) return [];

  const filtered = words.filter((w) => !PARTICLES.has(w.toLowerCase()));

  return filtered.length ? filtered : words;
}

export function shortName(name?: string): string {
  const t = cleanNameTokens(name);
  if (t.length === 0) return '';
  if (t.length === 1) return t[0];
  return `${t[0]} ${t[t.length - 1]}`;
}

export function stringToColor(str = ''): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function firstGrapheme(s: string): string {
  const arr = Array.from(s);
  return (arr[0] ?? '').toUpperCase();
}

export function stringAvatar(name?: string): Avatar | undefined {
  const sn = shortName(name);
  if (!sn) return undefined;

  const parts = sn.split(/\s+/);
  const initials =
    parts.length >= 2
      ? firstGrapheme(parts[0]) + firstGrapheme(parts[parts.length - 1])
      : firstGrapheme(parts[0]);

  return {
    bgcolor: stringToColor(name ?? ''),
    children: initials || 'NN',
  };
}
