import Papa from 'papaparse';
import { RawTransaction } from '@/types/transaction';

export async function loadDefaultTransactions(): Promise<RawTransaction[]> {
  console.log('[Analytics Pipeline] Fetching compressed dataset...');
  
  const response = await fetch('/data/other_challenge_data.csv.gz');

  if (!response.ok) {
    console.error('[Analytics Pipeline] Failed to fetch compressed dataset. Status:', response.status);
    throw new Error(`Failed to fetch compressed dataset: ${response.statusText}`);
  }

  console.log('[Analytics Pipeline] Decompressing gzip stream...');
  const blob = await response.blob();
  const decompressedStream = blob.stream().pipeThrough(new DecompressionStream('gzip'));
  const textData = await new Response(decompressedStream).text();

  console.log('[Analytics Pipeline] Parsing CSV transaction data...');
  return new Promise((resolve, reject) => {
    Papa.parse<RawTransaction>(textData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log(`[Analytics Pipeline] Successfully parsed ${results.data.length} records.`);
        const cleanedData = results.data.map((row) => ({
          ...row,
          category_amount: Number(row.category_amount) || 0,
          adjusted_fee: Number(row.adjusted_fee) || 0,
          try_seq: Number(row.try_seq) || 0,
          issuer_bank: row.issuer_bank || 'UNKNOWN_BANK',
          payer_card: row.payer_card || 'GUEST_USER',
        }));
        resolve(cleanedData);
      },
      error: (error: Error) => {
        console.error('[Analytics Pipeline] Error parsing CSV data:', error);
        reject(error);
      },
    });
  });
}

export function parseUploadedFile(file: File): Promise<RawTransaction[]> {
  console.log(`[Analytics Pipeline] Parsing uploaded file: ${file.name}`);
  
  return new Promise((resolve, reject) => {
    Papa.parse<RawTransaction>(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      worker: true,
      complete: (results) => {
        console.log(`[Analytics Pipeline] Successfully parsed uploaded file with ${results.data.length} records.`);
        const cleanedData = results.data.map((row) => ({
          ...row,
          category_amount: Number(row.category_amount) || 0,
          adjusted_fee: Number(row.adjusted_fee) || 0,
          try_seq: Number(row.try_seq) || 0,
          issuer_bank: row.issuer_bank || 'UNKNOWN_BANK',
          payer_card: row.payer_card || 'GUEST_USER',
        }));
        resolve(cleanedData);
      },
      error: (error: Error) => {
        console.error('[Analytics Pipeline] Error parsing uploaded file:', error);
        reject(error);
      },
    });
  });
}