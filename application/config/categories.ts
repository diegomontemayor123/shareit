interface Category {
  backgroundColor: string;
  icon: string;
  label: string;
  value: number;
}

const categories: Category[] = [
  { backgroundColor: "#fd9644", icon: "food-turkey", label: "American", value: 1 },
  { backgroundColor: "#feca57", icon: "bread-slice", label: "Bakery", value: 2 },
  { backgroundColor: "#45aaf2", icon: "food-croissant", label: "Breakfast", value: 3 },
  { backgroundColor: "#e84393", icon: "food-takeout-box-outline", label: "Indian", value: 4 },
  { backgroundColor: "#4b7bec", icon: "food-apple", label: "Healthy", value: 5 },
  { backgroundColor: "#fc5c65", icon: "pasta", label: "Italian", value: 6 },
  { backgroundColor: "#26de81", icon: "rice", label: "Japanese", value: 7 },
  { backgroundColor: "#2bcbba", icon: "taco", label: "Mexican", value: 8 },
  { backgroundColor: "#00cec9", icon: "food-drumstick", label: "BBQ", value: 9 },
  { backgroundColor: "#48dbfb", icon: "fish", label: "Seafood", value: 10 },
  { backgroundColor: "#a55eea", icon: "food", label: "Snacks", value: 11 },
  { backgroundColor: "#7f8c8d", icon: "cake", label: "Desserts", value: 12 },
  { backgroundColor: "#1dd1a1", icon: "food-drumstick-outline", label: "Grilled", value: 13 },
  { backgroundColor: "#fed330", icon: "food-takeout-box", label: "Chinese", value: 14 },
  { backgroundColor: "#778ca3", icon: "food-variant", label: "Other", value: 15 }
]



const getCategoryLabelByValue = (value: number | null) => {
  const category = categories.find(cat => cat.value === value);
  return category ? category.label : null;
};

export { categories, getCategoryLabelByValue };
