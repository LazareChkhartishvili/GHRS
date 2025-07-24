"use client";

import { useState } from "react";

const allCategories = [
  "Афазия и дизартрия",
  "Ожирение",
  "Неврология",
  "Реабилитация после COVID-19",
  "Реабилитация походки",
  "Реабилитация для пожилых",
];

export default function CategoryFilter() {
  const [selectedMain, setSelectedMain] = useState("Ортопедия");
  const [selectedSub, setSelectedSub] = useState("Ортопедия (3)");
  const [sort, setSort] = useState("По популярности");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const toggleFilter = (category: string) => {
    if (selectedFilter === category) {
      setSelectedFilter(null); // toggle off
    } else {
      setSelectedFilter(category); // select
    }
  };

  return (
    <div className="bg-white p-10 mb-10 rounded-2xl text-[#1e1b29] text-sm font-medium space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <button className="bg-[#e8d8ff] text-[19px] px-3 py-1 rounded-md uppercase text-white tracking-widest">
          все категории
        </button>

        <select
          value={selectedMain}
          onChange={(e) => setSelectedMain(e.target.value)}
          className="bg-[#f7f4ff] border-none text-[19px] outline-none text-[#1e1b29] cursor-pointer px-3 py-1"
        >
          <option>Ортопедия</option>
          <option>Неврология</option>
        </select>

        <select
          value={selectedSub}
          onChange={(e) => setSelectedSub(e.target.value)}
          className="bg-[#f7f4ff] text-[19px] border-none outline-none text-[#1e1b29] cursor-pointer px-3 py-1"
        >
          <option>Ортопедия (3)</option>
          <option>Ортопедия (2)</option>
        </select>

        {allCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => toggleFilter(category)}
            className={`rounded-md px-3 py-1 text-[19px] cursor-pointer transition-colors duration-200
              ${
                selectedFilter === category
                  ? "bg-[#a383e2] text-white"
                  : "bg-[#f7f4ff] text-[#1e1b29]"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-10">
        <span className="text-[#a29bb6]">Сортировать:</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#f7f4ff] border-none text-[19px] outline-none text-[#1e1b29] cursor-pointer px-3 py-1"
        >
          <option>По популярности</option>
          <option>По новизне</option>
        </select>
      </div>
    </div>
  );
}
