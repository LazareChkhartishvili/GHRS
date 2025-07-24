"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import { defaultMenuItems } from "../components/Header";
import Image from "next/image";
import ReactPlayer from "react-player";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { useSearchParams } from "next/navigation";
import { useCategoryComplete } from "../hooks/useCategoryComplete";
import { useI18n } from "../context/I18nContext";
// ----- Types -----
interface LocalizedString {
  ka: string;
  en: string;
  ru: string;
  _id: string;
}

interface BackendExercise {
  _id: string;
  name: LocalizedString;
  description: LocalizedString;
  recommendations: LocalizedString;
  videoUrl: string;
  thumbnailUrl: string;
  videoDuration: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  repetitions: string;
  sets: string;
  restTime: string;
  isActive: boolean;
  isPublished: boolean;
  isPopular?: boolean;
  sortOrder: number;
  setId: string;
  categoryId: string;
  subCategoryId?: string;
  createdAt: string;
  updatedAt: string;
}

interface BackendSet {
  _id: string;
  name: LocalizedString;
  description: LocalizedString;
  thumbnailImage: string;
  totalExercises: number;
  totalDuration: string;
  difficultyLevels: number;
  levels: {
    beginner: {
      exerciseCount: number;
      isLocked: boolean;
    };
    intermediate: {
      exerciseCount: number;
      isLocked: boolean;
    };
    advanced: {
      exerciseCount: number;
      isLocked: boolean;
    };
  };
  price: {
    monthly: number;
    threeMonths: number;
    sixMonths: number;
    yearly: number;
  };
  isActive: boolean;
  isPublished: boolean;
  sortOrder: number;
  categoryId: string;
  subCategoryId?: string;
  exercises?: BackendExercise[];
  createdAt?: string;
  updatedAt?: string;
}

type Step = {
  step: number;
  title: string;
  list: string[];
  image?: string;
};

type ExerciseStatus = "done" | "waiting" | "locked";

type Exercise = {
  id: number;
  title: string;
  steps: Step[];
  status: ExerciseStatus;
};

// ვქმნით exercises მასივს setData-დან
const getExercises = (setData: BackendSet | null): Exercise[] => {
  if (!setData?.exercises) return [];

  return setData.exercises.map((exercise: BackendExercise, index: number) => {
    // სტატუსის განსაზღვრა
    let status: ExerciseStatus = "locked";
    if (index === 0) status = "done";
    else if (index === 1) status = "waiting";

    // ვქმნით steps მასივს
    const steps: Step[] = [
      {
        step: 1,
        title: "Описание упражнения",
        list: [getLocalizedText(exercise.description, "ru")],
        image: exercise.thumbnailUrl,
      },
      {
        step: 2,
        title: "Рекомендации",
        list: [getLocalizedText(exercise.recommendations, "ru")],
        image: exercise.thumbnailUrl,
      },
    ];

    return {
      id: index + 1,
      title: `УПРАЖНЕНИЕ ${index + 1}. ${getLocalizedText(exercise.name, "ru").toUpperCase()}`,
      steps,
      status,
    };
  });
};

// ----- Status Map -----
const statusMap = {
  done: {
    label: "Просмотрено",
    line: "rgba(243, 213, 127, 1)",
    badge: "bg-yellow-200 text-yellow-700 border-yellow-300",
    bg: "rgba(255, 236, 180, 1)",
  },
  waiting: {
    label: "Ожидает просмотра",
    line: "rgba(212, 186, 252, 1)",
    badge: "bg-purple-100 text-purple-800 border-purple-300",
    bg: "rgba(232, 213, 255, 1)",
  },
  locked: {
    label: "Посмотрите предыдущее упражнение",
    line: "rgba(241, 238, 246, 1)",
    badge: "bg-gray-100 text-gray-400 border-gray-200",
    bg: "rgba(241, 238, 246, 1)",
  },
};



const numberTextColor = "rgba(61, 51, 74, 1)";
const mobileNumberBg = "rgba(213, 209, 219, 1)";
const markerSize = 48;
const markerOffset = 32;

// ლოკალიზაციის ფუნქცია
const getLocalizedText = (
  field: { ka: string; en: string; ru: string } | undefined,
  locale: string = "ru"
): string => {
  if (!field) return "";
  return (
    field[locale as keyof typeof field] ||
    field.ru ||
    field.en ||
    field.ka ||
    ""
  );
};

const Player = () => {
  const searchParams = useSearchParams();
  const setId = searchParams.get('setId') || '';
  const { t } = useI18n();

  // ვიღებთ სრულ მონაცემებს
  const { categoryData, loading } = useCategoryComplete("687c192042e8ebbadd50b8bc");
  const setData: BackendSet | null = categoryData?.sets?.find((set: BackendSet) => set._id === setId) || null;

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centers, setCenters] = useState<number[]>([]);

  useLayoutEffect(() => {
    setCenters(
      cardRefs.current.map((el) =>
        el ? el.offsetTop + markerOffset + markerSize / 2 : 0
      )
    );
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
          <h2 className="text-2xl font-cinzel font-semibold text-gray-700">
            {t("common.loading")}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DesktopNavbar menuItems={defaultMenuItems} blogBg={false} />
      <MobileNavbar />
      <div className="flex flex-col items-center md:overflow-hidden">
        <div className="w-full  max-w-[1400px] aspect-video md:mx-auto px-1 rounded-[20px] md:rounded-[30px] overflow-hidden">
          <ReactPlayer
            src="/videos/hero.mp4"
            controls
            width="100%"
            height="100%"
            className="!rounded-[20px] md:!rounded-[30px]"
          />
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:m-5 md:gap-5 mx-auto justify-center md:w-auto mt-4 md:mt-8">
          {setData?.exercises?.map((exercise, index) => {
            const bgColors = ["#F3D57F", "#F3D57F", "#D4BAFC", "#F9F7FE"];
            const textColors = ["#3D334A", "#3D334A", "#FFFFFF", "#3D334A"];
            
            return (
              <div
                key={exercise._id}
                className="flex flex-row items-center md:w-auto mb-2 md:mb-0"
              >
                <div
                  className="p-3 md:p-5 flex flex-col items-start rounded-[16px] md:rounded-[20px] md:w-auto min-w-0"
                  style={{ backgroundColor: bgColors[index % bgColors.length] }}
                >
                  <h1
                    style={{ color: textColors[index % textColors.length] }}
                    className="text-[16px] md:text-[18px] leading-[100%] tracking-[-1%] mb-1 md:mb-0"
                  >
                    {t("common.exercise")} {index + 1}
                  </h1>
                  <p
                    style={{ color: textColors[index % textColors.length] }}
                    className="font-[Pt] w-full md:w-[295px] font-medium leading-[120%] text-sm md:text-base"
                  >
                    {getLocalizedText(exercise.name, "ru")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* bg-[#F9F7FE] */}
      <section className="w-full bg-[#F9F7FE] rounded-[16px] md:rounded-[30px] md:mb-10 flex flex-col items-center min-h-screen py-4 px-2 md:px-5 mt-4 md:mt-8">
        <div className="relative w-full flex flex-col gap-4 md:gap-6">
          {/* Desktop: ვერტიკალური ხაზის სეგმენტები */}
          <div
            className="hidden md:block absolute left-[22px] w-[6px] z-0"
            style={{ top: 0, bottom: 0, pointerEvents: "none" }}
          >
            {centers.length > 1 &&
              centers.slice(0, -1).map((center, idx) => {
                const nextCenter = centers[idx + 1];
                if (center === 0 || nextCenter === 0) return null;
                const exercises = getExercises(setData);
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: 0,
                      width: "6px",
                      top: center,
                      height: nextCenter - center,
                      background: statusMap[exercises[idx + 1]?.status || "locked"].line,
                      borderRadius: 3,
                    }}
                  />
                );
              })}
          </div>

          {getExercises(setData).map((exercise, idx) => (
            <div
              key={exercise.id}
              className="relative flex flex-col md:flex-row w-full"
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
            >
              {/* Desktop: ნომერი ზუსტად ხაზის ცენტრში */}
              <div
                className="hidden md:block absolute left-0 z-10"
                style={{
                  top: markerOffset,
                  width: markerSize + 8,
                  height: markerSize,
                }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg shadow-sm"
                  style={{
                    background: statusMap[exercise.status].bg,
                    color: numberTextColor,
                    border: "none",
                    fontSize: 22,
                  }}
                >
                  {exercise.id}
                </div>
              </div>
              {/* Main Card */}
              <article
                className={`relative z-10 flex-1 ml-0 md:ml-[68px] ${
                  exercise.status === "locked" ? "opacity-50" : ""
                } w-full`}
              >
                <div className="w-full rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 bg-white mb-3 md:mb-4 flex flex-col relative">
                  {/* Desktop: header row */}
                  <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 gap-2 md:gap-0">
                    <h2
                      className={`font-bold text-base md:text-lg ${
                        exercise.status === "locked"
                          ? "text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {exercise.title}
                    </h2>
                    {/* Desktop only: სტატუსის ბეჯი */}
                    <span
                      className={`hidden md:flex items-center px-3 py-1 rounded-lg border text-xs font-medium ml-2 ${
                        statusMap[exercise.status].badge
                      }`}
                    >
                      {statusMap[exercise.status].label}
                    </span>
                  </header>

                  {/* Mobile only: სტატუსის ბეჯი სათაურის ქვემოთ */}
                  <span
                    className={`md:hidden inline-flex items-center px-3 py-1 rounded-lg border text-xs font-medium mb-3 self-start ${
                      statusMap[exercise.status].badge
                    }`}
                  >
                    {statusMap[exercise.status].label}
                  </span>

                  {/* Steps */}
                  <div className="flex flex-col gap-3 md:gap-4">
                    {exercise.steps.map((step, stepIdx) => (
                      <section
                        key={step.step}
                        className="flex flex-col sm:flex-row gap-2 items-start"
                      >
                        {step.image && (
                          <div className="relative w-full sm:w-32 flex-shrink-0 mb-2 sm:mb-0 overflow-hidden">
                            <Image
                              width={128}
                              height={100}
                              src={step.image}
                              alt={`Шаг ${step.step}`}
                              className="w-full h-28 sm:h-32 object-cover rounded-lg border border-gray-200"
                            />
                            {/* Mobile: Step number on each image */}
                            <div
                              className="md:hidden absolute z-20"
                              style={{ top: "-5px", left: "20px" }}
                            >
                              <div
                                className="flex items-center justify-center w-7 h-7 rounded-full font-semibold text-base shadow"
                                style={{
                                  background: mobileNumberBg,
                                  color: numberTextColor,
                                  border: "none",
                                }}
                              >
                                {exercise.id}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-semibold text-[15px] mb-1 ${
                              stepIdx === 0
                                ? "text-purple-600"
                                : "text-purple-500"
                            } ${
                              exercise.status === "locked"
                                ? "text-gray-400"
                                : ""
                            }`}
                          >
                            {step.title}
                          </h3>
                          <ol
                            className={`list-decimal pl-4 text-sm ${
                              exercise.status === "locked"
                                ? "text-gray-400"
                                : "text-gray-800"
                            }`}
                          >
                            {step.list.map((item, i) => (
                              <li key={i} className="font-[Pt]">
                                {item}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Player;
