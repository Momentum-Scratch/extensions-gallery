export interface Extension {
  id: string;
  name: string;
  description: string;
  author: string;
  icon: string;
  tags: string[];
  featured?: boolean;
  url: string;
  downloads?: number;
  updated?: string;
  verified?: boolean;
  turbowarp?: boolean;
  license?: string;
}

export type Category = string;

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: string;
}
