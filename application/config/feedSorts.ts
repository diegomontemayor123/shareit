interface Sort {
  backgroundColor: string;
  icon: string;
  label: string;
  value: number;
}

const feedSorts: Sort[] = [
  { backgroundColor: "#fc5c65", icon: "heart", label: "Likes", value: 1 },
  { backgroundColor: "#454b1b", icon: "clock", label: "Latest", value: 2 }
  ,
];

export default feedSorts
