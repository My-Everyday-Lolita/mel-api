export interface Criterium {
    type: 'brand' | 'color' | 'feature' | 'category' | 'keyword' | 'own' | 'id';
    value: string;
    parents?: string[];
}