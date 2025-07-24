"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category?: {
    id: number;
    name: string;
  };
  instructor?: string;
  duration?: string;
  level?: "beginner" | "intermediate" | "advanced";
}

interface CourseSliderProps {
  courses?: Course[];
  maxVisible?: number;
}

const CourseSlider: React.FC<CourseSliderProps> = ({
  courses = [],
  maxVisible = 4,
}) => {
  const fallbackCourses: Course[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: "Ортопедия",
    description:
      "Курсы и мастер-классы для опытных терапевтов. Практикум по лечению ортопедических проблем",
    price: "4023 $",
    image: "/assets/images/course.png",
  }));

  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const allCourses = courses.length > 0 ? courses : fallbackCourses;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const displayCourses = showAll ? allCourses : allCourses.slice(0, maxVisible);

  return (
    <div className="w-full">
      {/* Desktop View: Grid */}
      {!isMobile && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {displayCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          {allCourses.length > maxVisible && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="w-[512px] hover:text-white duration-300 py-4 cursor-poer rounded-[10px] text-[#3D334A] text-[32px] bg-[#D4BAFC] flex justify-center items-center mx-auto mt-10"
              >
                Показать ещё
              </button>
            </div>
          )}
        </>
      )}

      {/* Mobile View: Horizontal scroll */}
      {isMobile && (
        <>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {displayCourses.map((course) => (
              <div key={course.id} className="flex-shrink-0 w-[250px]">
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          {allCourses.length > maxVisible && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="bg-[#846FA0] text-white py-2 px-6 rounded-full text-sm hover:bg-[#6e5c8a] transition"
              >
                {showAll ? "Скрыть" : "Показать ещё"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const CourseCard = ({ course }: { course: Course }) => (
  <div className="bg-white rounded-[20px] p-1.5 pb-4 w-full">
    <Image
      src={course.image}
      width={674}
      height={300}
      alt={`${course.title} course image`}
      className="mb-5 w-full h-[233px] object-cover rounded-[16px]"
    />
    <span className="bg-[#E9DFF6] p-[4.5px] rounded-[3px] text-[#3D334A] text-sm">
      {course.category?.name || course.title}
    </span>
    <h5 className="text-[#3D334A] md:text-[20px] mb-2 mt-4 md:mb-5 leading-[120%]">
      {course.description}
    </h5>
    <p className="text-[#846FA0] text-[14px] mb-[14px] leading-[120%]">
      {course.instructor
        ? `Преподаватель: ${course.instructor}`
        : "С советами по безопасности, которым нужно следовать до и после перелома Кристен Гасник"}
    </p>
    <div className="w-full flex justify-end items-end pr-4 md:mt-5">
      <button className="bg-[#D4BAFC] py-[5px] px-4 rounded-[3px] md:mt-[19px] md:rounded-[10px] text-[12px] md:text-[18px] leading-[100%]">
        {course.price}
      </button>
    </div>
  </div>
);

export default CourseSlider;
