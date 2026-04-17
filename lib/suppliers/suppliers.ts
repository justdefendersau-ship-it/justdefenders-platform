// ==================================================================================================
// File: C:\dev\justdefenders\lib\suppliers\suppliers.ts
// Timestamp: 12 April 2026 18:55
// Purpose: Supplier registry for Parts Decision Engine
// JustDefenders ©
// ==================================================================================================

export type Supplier = {
  name: string;
  type: 'generic' | 'specialist' | 'oem';
  priority: number;
  supports: string[];
  baseUrl: string;
  searchType: 'manual' | 'scrape' | 'api';
};

// ----------------------------------------------------------------------------------------------
// SUPPLIER LIST
// ----------------------------------------------------------------------------------------------

export const suppliers: Supplier[] = [

  // OEM (highest priority)
  {
    name: 'JLR Classic',
    type: 'oem',
    priority: 1,
    supports: ['Defender', 'Discovery', 'Range Rover'],
    baseUrl: 'https://parts.jaguarlandroverclassic.com/',
    searchType: 'manual'
  },

  // Specialist
  {
    name: 'Rovacraft',
    type: 'specialist',
    priority: 2,
    supports: ['Defender'],
    baseUrl: 'https://www.rovacraft.com.au/',
    searchType: 'manual'
  },

  {
    name: 'British Off Road',
    type: 'specialist',
    priority: 2,
    supports: ['Defender'],
    baseUrl: 'https://britishoffroad.com/',
    searchType: 'manual'
  },

  // Generic fallback
  {
    name: 'Repco',
    type: 'generic',
    priority: 3,
    supports: ['All'],
    baseUrl: 'https://www.repco.com.au/',
    searchType: 'manual'
  },

  {
    name: 'Supercheap Auto',
    type: 'generic',
    priority: 3,
    supports: ['All'],
    baseUrl: 'https://www.supercheapauto.com.au/',
    searchType: 'manual'
  }
];