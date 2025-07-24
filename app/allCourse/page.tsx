"use client";

import React, { useRef, useEffect, useState } from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import { defaultMenuItems } from "../components/Header";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import CourseSlider from "../components/CourseSlider";
import { CiSearch } from "react-icons/ci";
import CategoryFilter from "../components/CategoryFilter";
// import { useRouter } from "next/navigation";

// --- Demo categories for visual ---
const demoCategories = [
  { id: "all", title: "Все категории", active: true },
  {
    id: "ortopedia",
    title: "ОРТОПЕДИЯ",
    dropdownItems: ["Подкатегория 1", "Подкатегория 2"],
  },
  {
    id: "ortopedia3",
    title: "ОРТОПЕДИЯ (3)",
    dropdownItems: ["Вариант 1", "Вариант 2", "Вариант 3"],
  },
  { id: "afaziya", title: "АФАЗИЯ И ДИЗАРТРИЯ" },
  { id: "ozhirenie", title: "ОЖИРЕНИЕ" },
  { id: "nevrologia", title: "НЕВРОЛОГИЯ" },
  { id: "covid", title: "РЕАБИЛИТАЦИЯ ПОСЛЕ COVID-19" },
  { id: "pohodka", title: "РЕАБИЛИТАЦИЯ ПОХОДКИ" },
  { id: "pozhilyh", title: "РЕАБИЛИТАЦИЯ ДЛЯ ПОЖИЛЫХ" },
];

const AllCourse = () => {
  // const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  // const { categories, loading: categoriesLoading } = useCategories();
  // const { courses, loading: coursesLoading, error } = useCourses(undefined);
  // const router = useRouter();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   router.push("/allCourse/1");
  // }, [router]);
  // useEffect(() => {
  //   router.push("/allCourse/1");
  // }, [router]);

  // const loading = coursesLoading;

  // if (loading) {
  //   return (
  //     <div className="bg-[#F9F7FE] min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
  //         <h2 className="text-2xl font-semibold text-gray-700">
  //           მონაცემები იტვირთება...
  //         </h2>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="bg-[#F9F7FE] min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-xl text-red-600 mb-4">
  //           შეცდომა კურსების ჩატვირთვაში
  //         </h2>
  //         <p className="text-gray-600">{error}</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-[#F9F7FE] pb-40">
      <DesktopNavbar
        allCourseBg={true}
        menuItems={defaultMenuItems}
        blogBg={false}
      />
      <MobileNavbar />
      <div className=" mx-2 px-4">
        <h1 className="text-[#3D334A] text-[40px] mx-5 leading-[120%] tracking-[-3%] mb-[61px]">
          Курсы
        </h1>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Введите название упражнения"
            className="w-full bg-white border focus:outline-purple-[#D4BAFC] font-[Pt] border-[#D4BAFC] rounded-[54px] px-[50px] py-[15px] mb-2 text-[#846FA0] text-[19px] font-medium"
          />
          <CiSearch
            color="black"
            size={25}
            className="absolute top-[16px] left-4"
          />
        </div>
        {/* --- Category bar as in screenshot --- */}
        <CategoryFilter />
        <div>
          <div className="mb-10">
            <CourseSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourse;
