// # Product

export interface Welcome {
  data: WelcomeDatum[];
  meta: Meta;
}

export interface WelcomeDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  name: string;
  subtitle: string;
  price: number;
  description: string;
  size: Size;
  original_price: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  categories: Categories;
  thumbnail: Thumbnail;
  images: Images;
}

// # Category
export interface Categories {
  data: CategoriesDatum[];
}

export interface CategoriesDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  products: Welcome;
}

// # Images
export interface Images {
  data: DAT[];
}

export interface DAT {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export enum EXT {
  Jpg = ".jpg",
}

export interface Formats {
  large: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
}

export interface Large {
  ext: EXT;
  url: string;
  hash: string;
  mime: MIME;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export enum MIME {
  ImageJPEG = "image/jpeg",
}

// # Size
export interface Size {
  data: SizeDatum[];
}

export interface SizeDatum {
  size: string;
  enabled: boolean;
}

// # Thumbnail image
export interface Thumbnail {
  data: DAT;
}

// # Metadata
export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
