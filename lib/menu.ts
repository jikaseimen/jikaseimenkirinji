export type MenuItem = {
  name: string;
  price: number;
};

export type MenuCategory = {
  category: string;
  items: MenuItem[];
};

export const MENU_DATA: MenuCategory[] = [
  {
    category: "こってり",
    items: [
      { name: "こってり", price: 950 },
      { name: "味玉こってり", price: 1050 },
      { name: "野菜こってり", price: 1150 },
      { name: "豚増こってり", price: 1330 },
    ],
  },
  {
    category: "あっさり",
    items: [
      { name: "あっさり", price: 900 },
      { name: "味玉あっさり", price: 1000 },
      { name: "野菜あっさり", price: 1050 },
      { name: "豚増あっさり", price: 1250 },
    ],
  },
  {
    category: "汁無し",
    items: [
      { name: "汁無し", price: 1000 },
      { name: "チーズ汁無し", price: 1150 },
      { name: "野菜汁無し", price: 1150 },
      { name: "豚マシ汁無し", price: 1350 },
    ],
  },
  {
    category: "油そば・飲み物",
    items: [
      { name: "【冷】油そば", price: 800 },
      { name: "【温】油そば", price: 800 },
      { name: "コーラ", price: 250 },
      { name: "ビール", price: 600 },
    ],
  },
  {
    category: "トッピング・サイド",
    items: [
      { name: "生卵", price: 100 },
      { name: "全部", price: 450 },
      { name: "味玉", price: 150 },
      { name: "やさい", price: 250 },
      { name: "チーズ", price: 300 },
      { name: "のり", price: 300 },
      { name: "ライス", price: 250 },
      { name: "豚増", price: 400 },
      { name: "かす増", price: 400 },
      { name: "テイクアウトあぶらかす", price: 600 },
      { name: "粒ニンニク", price: 400 },
      { name: "麺特盛", price: 350 },
      { name: "かす飯", price: 400 },
    ],
  },
];

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
  category: string;
};
