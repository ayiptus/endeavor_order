export interface ProductVariant {
  code: string
  name: string
  price: number
  dimensions?: string
  sqft?: string
}

export interface Product {
  id: string
  name: string
  description: string
  image: string
  dimensions: string
  sqft: string
  backerNeeded: string
  illuminated: string
  price: number
  customSize: boolean
  backerPanel: boolean
  variants?: ProductVariant[]
}

export const products: Product[] = [
  {
    id: "ri-7",
    name: "Room ID — RI.X.7",
    description: "Room identification sign",
    image: "/images/room-20id-20rix7.png",
    dimensions: '6.75" x 7.5"',
    sqft: "0.33",
    backerNeeded: "NO",
    illuminated: "NO",
    price: 210.7,
    customSize: true,
    backerPanel: false,
  },
  {
    id: "rp-7",
    name: "Room ID w/ Insert — RP.X.7",
    description: "Room ID with replaceable insert",
    image: "/images/room-20id-20w-20insert-20rpx7.png",
    dimensions: '6.375" x 7.5"',
    sqft: "0.33",
    backerNeeded: "NO",
    illuminated: "NO",
    price: 207.01,
    customSize: true,
    backerPanel: false,
  },
  {
    id: "rf-7",
    name: "Facility Room ID — RF.X",
    description: "Facility room sign",
    image: "/images/facility-20room-20id-20rfx.png",
    dimensions: "Varies",
    sqft: "0.12",
    backerNeeded: "NO",
    illuminated: "NO",
    price: 100.53,
    customSize: true,
    backerPanel: false,
    variants: [
      {
        code: "RF.7",
        name: 'Facility Room ID - 7.5" width',
        price: 100.53,
        dimensions: '2.25" x 7.5"',
        sqft: "0.12",
      },
      {
        code: "RF.9",
        name: 'Facility Room ID - 9" width',
        price: 104.99,
        dimensions: '2.25" x 9"',
        sqft: "0.14",
      },
      {
        code: "RF.9X",
        name: 'Facility Room ID - 9" width (tall)',
        price: 116.38,
        dimensions: '3.35" x 9"',
        sqft: "0.21",
      },
    ],
  },
  {
    id: "as-9",
    name: "Ancillary Sign — AS.X.9",
    description: "Restroom and ancillary signage",
    image: "/images/ancillary-20sign-20asx9.png",
    dimensions: '12" x 9"',
    sqft: "0.75",
    backerNeeded: "NO",
    illuminated: "NO",
    price: 250.63,
    customSize: true,
    backerPanel: false,
  },
  {
    id: "di-18",
    name: "Wall Directory — DI.X",
    description: "Wall directory",
    image: "/images/wall-20directory-20dix.png",
    dimensions: 'Variable x 18"',
    sqft: "Variable",
    backerNeeded: "YES",
    illuminated: "Optional",
    price: 1386.57,
    customSize: true,
    backerPanel: true,
    variants: [
      {
        code: "DI.18",
        name: "Wall Directory - 18 slots",
        price: 1386.57,
        dimensions: 'Varies x 18"',
        sqft: "Variable",
      },
      {
        code: "DI.22",
        name: "Wall Directory - 22 slots",
        price: 1751.68,
        dimensions: 'Varies x 18"',
        sqft: "Variable",
      },
    ],
  },
  {
    id: "wg-24",
    name: "Wall Guide — WG.X",
    description: "Wall guide sign",
    image: "/images/wall-20guide-20wgx.png",
    dimensions: 'Variable x 24"',
    sqft: "Variable",
    backerNeeded: "YES",
    illuminated: "NO",
    price: 1188.81,
    customSize: true,
    backerPanel: true,
    variants: [
      {
        code: "WG.X.6",
        name: "Wall Guide - 6 slats",
        price: 1188.81,
        dimensions: 'Varies x 24"',
        sqft: "Variable",
      },
      {
        code: "WG.X.8",
        name: "Wall Guide - 8 slats",
        price: 1545.73,
        dimensions: 'Varies x 24"',
        sqft: "Variable",
      },
      {
        code: "WG.X.10",
        name: "Wall Guide - 10 slats",
        price: 1577.3,
        dimensions: 'Varies x 24"',
        sqft: "Variable",
      },
    ],
  },
  {
    id: "mp-35",
    name: "Wall Map — MP.X.35",
    description: "Wayfinding map sign",
    image: "/images/wall-20map-20mpx35.png",
    dimensions: '31.5" x 35.25"',
    sqft: "7.71",
    backerNeeded: "YES",
    illuminated: "NO",
    price: 1131.71,
    customSize: true,
    backerPanel: true,
  },
  {
    id: "si-x-9",
    name: "Site ID — SI.X.9",
    description: "Site identification sign",
    image: "/signs/si-x-9-site-id.png",
    dimensions: "Variable",
    sqft: "Variable",
    backerNeeded: "YES",
    illuminated: "NO",
    price: 245.93,
    customSize: true,
    backerPanel: true,
    variants: [
      {
        code: "SI.X.9",
        name: "Site ID - Standard",
        price: 245.93,
      },
      {
        code: "SI.P.9",
        name: "Site ID with Paperflex",
        price: 313.57,
      },
      {
        code: "FA.X.12",
        name: 'Site ID with Paperflex - 12"',
        price: 252.9,
      },
    ],
  },
  {
    id: "fl-18",
    name: "Flag Sign — FL.X",
    description: "Identification flag sign",
    image: "/images/flag-20sign-20flx.png",
    dimensions: '7.5" x 18"',
    sqft: "0.94",
    backerNeeded: "NO",
    illuminated: "NO",
    price: 247.06,
    customSize: true,
    backerPanel: false,
    variants: [
      {
        code: "FL.18",
        name: 'Flag Sign - 18" width',
        price: 247.06,
        dimensions: '7.5" x 18"',
        sqft: "0.94",
      },
      {
        code: "FL.24",
        name: 'Flag Sign - 24" width',
        price: 401.54,
        dimensions: '7.5" x 24"',
        sqft: "1.25",
      },
    ],
  },
  {
    id: "oh-1",
    name: "Overhead Sign — OH.X",
    description: "Overhead directional sign",
    image: "/images/overhead-20sign-20ohx.png",
    dimensions: '7.87" x 47.25"',
    sqft: "2.58",
    backerNeeded: "NO",
    illuminated: "NO",
    price: 648.02,
    customSize: true,
    backerPanel: false,
    variants: [
      {
        code: "OH.1",
        name: "Overhead Sign (1 Column, 1 Row)",
        price: 648.02,
        dimensions: '7.87" x 47.25"',
        sqft: "2.58",
      },
      {
        code: "OH.2",
        name: "Overhead Sign (1 Column, 2 Rows)",
        price: 966.49,
        dimensions: '15.75" x 47.25"',
        sqft: "5.17",
      },
      {
        code: "OH.3",
        name: "Overhead Sign (2 Columns, 1 Row)",
        price: 1207.81,
        dimensions: '7.87" x 94.5"',
        sqft: "5.17",
      },
      {
        code: "OH.4",
        name: "Overhead Sign (2 Columns, 2 Rows)",
        price: 1825.57,
        dimensions: '15.75" x 94.5"',
        sqft: "10.34",
      },
    ],
  },
]
