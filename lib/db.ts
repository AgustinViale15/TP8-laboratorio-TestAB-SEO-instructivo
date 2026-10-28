type VariantMetrics = {
  impressions: number;
  conversions: number;
};

type Store = {
  a: VariantMetrics;
  b: VariantMetrics;
};

const globalForDb = globalThis as unknown as {
  dbStore: Store | undefined;
};

const store: Store = globalForDb.dbStore ?? {
  a: { impressions: 0, conversions: 0 },
  b: { impressions: 0, conversions: 0 },
};

// Evita la pérdida de estado en Next.js durante Hot Reload sin depender de process.env
globalForDb.dbStore = store;

export const db = {
  recordImpression: (variant: 'a' | 'b') => {
    store[variant].impressions += 1;
  },
  recordConversion: (variant: 'a' | 'b') => {
    store[variant].conversions += 1;
  },
  getMetrics: (): Store => store,
};