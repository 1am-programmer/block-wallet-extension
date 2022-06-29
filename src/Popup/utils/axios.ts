import type { AxiosError } from 'axios';
import axios from 'axios';

export async function get<T>(path: string): Promise<T> {
  const { data } = await axios.get<T>(path, {
    headers: {
      Cosmostation: `extension/${String(process.env.VERSION)}`,
    },
  });
  return data;
}

export async function post<T>(path: string, body?: unknown): Promise<T> {
  const { data } = await axios.post<T>(path, body, {
    headers: {
      Cosmostation: `extension/${String(process.env.VERSION)}`,
    },
  });
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAxiosError(e: any): e is AxiosError {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return typeof e?.response?.status === 'number';
}
