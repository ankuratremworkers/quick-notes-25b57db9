// Every API call goes through here. A hardcoded http://localhost:8000 in a
// component works in dev and breaks the instant it is deployed.
const BASE = (import.meta.env.VITE_API_URL ?? '') + '/api';

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

export interface Note {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

export async function listNotes(): Promise<Note[]> {
  return getJson<Note[]>('/notes');
}

export async function createNote(input: {
  title?: string;
  body: string;
}): Promise<Note> {
  return postJson<Note>('/notes', input);
}
