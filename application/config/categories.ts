interface Category {
  backgroundColor: string;
  icon: string;
  label: string;
  value: number;
}

const categories: Category[] = [
  { backgroundColor: "#fd9644", icon: "snowboard", label: "Winter Sports", value: 1 },
  { backgroundColor: "#feca57", icon: "bike", label: "Cycling Gear", value: 2 },
  { backgroundColor: "#45aaf2", icon: "water", label: "Water Sports", value: 3 },
  { backgroundColor: "#e84393", icon: "tent", label: "Camping Gear", value: 4 },
  { backgroundColor: "#4b7bec", icon: "hiking", label: "Hiking & Backpacking", value: 5 },
  { backgroundColor: "#26de81", icon: "nut", label: "Climbing", value: 7 },
  { backgroundColor: "#2bcbba", icon: "fish", label: "Fishing Gear", value: 8 },
  { backgroundColor: "#00cec9", icon: "golf", label: "Golf Equipment", value: 9 },
  { backgroundColor: "#a55eea", icon: "motorbike", label: "Off-Road/ATV", value: 11 },
  { backgroundColor: "#7f8c8d", icon: "drone", label: "Drones", value: 12 },
  { backgroundColor: "#1dd1a1", icon: "campfire", label: "Outdoor Experiences", value: 13 },
  { backgroundColor: "#778ca3", icon: "cog", label: "General", value: 15 }
]




const getCategoryLabelByValue = (value: number | null) => {
  const category = categories.find(cat => cat.value === value);
  return category ? category.label : null;
};

export { categories, getCategoryLabelByValue };
