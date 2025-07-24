/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { CiPlay1 } from "react-icons/ci";
import Header from "../../components/Header";
import Subscribe from "../../components/Subscribe";
import ReviewSlider from "../../components/ReviewSlider";
import Tabs from "../../components/Tabs";
import Modal from "../../components/Modal";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { CiLock } from "react-icons/ci";
import Blog from "../../components/Blog";
import Works from "../../components/Works";
import { useCategoryComplete } from "../../hooks/useCategoryComplete";
import { useSet } from "../../hooks/useSet";
import { useI18n } from "../../context/I18nContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Params {
  id: string;
}

interface ComplexPageProps {
  params: Promise<Params>;
}

const Complex = ({ params }: ComplexPageProps) => {
  const resolvedParams = React.use(params);
  const setId = resolvedParams.id;
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const categoryIdFromUrl = searchParams.get("categoryId");
  
  console.log("🎯 Complex component initialized:", {
    setId,
    categoryIdFromParams: categoryIdFromUrl,
    hasSearchParams: !!searchParams,
    allSearchParams: Object.fromEntries(searchParams.entries())
  });

  // თუ არ არის categoryId URL-ში, მაშინ პირდაპირ set-ს ვიღებთ
  const shouldUseCategoryComplete = !!categoryIdFromUrl;
  
  // Hook-ები conditionally
  const { categoryData, loading: categoryLoading, error: categoryError } = useCategoryComplete(
    shouldUseCategoryComplete ? categoryIdFromUrl : ''
  );
  
  // ალტერნატიული: პირდაპირ set-ის მოძიება
  const { set: directSet, loading: setLoading, error: setError } = useSet(
    shouldUseCategoryComplete ? '' : setId
  );

  // საბოლოო loading და error states
  const loading = shouldUseCategoryComplete ? categoryLoading : setLoading;
  const error = shouldUseCategoryComplete ? categoryError : setError;

  // Set-ის მონაცემების მიღება
  let rawSetData;
  if (shouldUseCategoryComplete && categoryData) {
    // კატეგორიიდან ვეძებთ set-ს
    rawSetData = categoryData.sets?.find(set => set._id === setId);
  } else if (!shouldUseCategoryComplete && directSet) {
    // პირდაპირ set
    rawSetData = directSet;
  }
  
  console.log("🎯 Data fetching status:", {
    setId,
    categoryId: categoryIdFromUrl,
    shouldUseCategoryComplete,
    loading,
    error,
    hasCategoryData: !!categoryData,
    hasDirectSet: !!directSet,
    setsCount: categoryData?.sets?.length || 0,
    setFound: !!rawSetData,
    strategy: shouldUseCategoryComplete ? 'category-complete' : 'direct-set'
  });

  // ვითვლით ჯამურ ხანგრძლივობას
  const totalDurationInMinutes = rawSetData?.exercises?.reduce((total: number, exercise: any) => {
    const duration = exercise.duration || "0:00";
    const [minutes, seconds] = duration.split(":").map(Number);
    return total + minutes + (seconds || 0) / 60;
  }, 0) || 0;

  // ვაფორმატებთ ხანგრძლივობას "HH:MM" ფორმატში
  const formattedTotalDuration = `${Math.floor(totalDurationInMinutes)}:${String(Math.round((totalDurationInMinutes % 1) * 60)).padStart(2, '0')}`;

  // ვამატებთ დათვლილ მონაცემებს setData-ში
  const setData = rawSetData ? {
    ...rawSetData,
    totalExercises: rawSetData.exercises?.length || 0,
    totalDuration: formattedTotalDuration
  } : null;

  console.log("🎯 Complex page rendered with:", { setData, categoryData });

  const [popoverOpen, setPopoverOpen] = useState(false);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  console.log("🎯 Complex page rendered with:", {
    setId,
    setData,
    setLoading,
    setError
  });

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        playBtnRef.current &&
        !playBtnRef.current.contains(event.target as Node)
      ) {
        setPopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverOpen]);

  const [modalOpen, setModalOpen] = useState(false);
  const tabItems = [
    { label: "Описание", href: "#description" },
    { label: "Дополнительно", href: "#extra" },
    { label: "Демо-видео", href: "#demo" },
  ];

  // ვიღებთ ენის პარამეტრს
  const getLocale = () => {
    if (typeof window !== "undefined") {
      const storedLocale = localStorage.getItem("locale");
      return storedLocale && ["ka", "ru", "en"].includes(storedLocale)
        ? storedLocale
        : "ru";
    }
    return "ru";
  };

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

  const locale = getLocale();

  // Loading state
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

  // Error state
  if (error || !setData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-cinzel font-bold text-red-600 mb-4">
            {t("common.error")}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || t("common.set_not_found")}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {t("common.retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header variant="complex" onPriceClick={() => setPopoverOpen(true)} setData={setData} />
      <div className="">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 md:mt-40 px-4">
          <Tabs
            items={tabItems}
            activeTabIndex={activeTabIndex}
            onTabClick={setActiveTabIndex}
          />
        </section>
        {/* ტაბების ქვემოთ იცვლება მხოლოდ კონტენტი */}
        <div className="px-4 py-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20">
            <div className="order-3 md:order-2 p-4 md:p-[40px] md:mb-20 bg-[rgba(249,247,254,1)] rounded-[20px] md:rounded-[30px]">
              {activeTabIndex === 0 && (
                <>
                  <div className="flex flex-col md:gap-5 gap-4 pb-6 md:pb-[80px]">
                    <strong className="text-[rgba(61,51,74,1)] tracking-[-3%] leading-[120%] text-[18px] md:text-[40px] font-medium">
                      {getLocalizedText(setData.name, locale)}
                    </strong>
                    <span className="text-[rgba(132,111,160,1)] md:text-2xl text-[16px] leading-[120%] font-medium">
                      {getLocalizedText(setData.description, locale)}
                    </span>
                  </div>
                  <div>
                    <h4 className="mb-[10px] text-[rgba(61,51,74,1)] tracking-[-1%] leading-[100%] text-[18px] ">
                      Общие указания:
                    </h4>
                    <p className="text-[rgba(132,111,160,1)] md:text-[18px] tex-[14px] leading-[150%]  ">
                      Комплекс состоит из {setData.totalExercises} упражнений,
                      общая длительность комплекса {setData.totalDuration} мин
                    </p>
                  </div>
                </>
              )}
              {activeTabIndex === 1 && (
                <div className="text-lg text-[rgba(61,51,74,1)] md:px-10 md:py-5 bg-[#F9F7FE] rounded-[20px]">
                  <h1 className="md:text-[40px] leading-[120%] tracking-[-3%] text-[#3D334A]">
                    Дополнительно
                  </h1>
                  <p className="font-[Pt] text-[18px] leading-[120%] text-[#846FA0] mt-10">
                    {getLocalizedText(setData.description, locale)}
                  </p>
                </div>
              )}
              {activeTabIndex === 2 && (
                <div className="text-lg text-[rgba(61,51,74,1)]">
                  <h1 className="md:text-[40px] leading-[120%] tracking-[-3%] mb-5">
                    Демо-видео
                  </h1>
                  <div className="rounded-[15px] overflow-hidden shadow-lg">
                    <ReactPlayer
                      src="/videos/hero.mp4"
                      controls
                      width="100%"
                      height="360px"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="order-1 md:order-3 flex flex-col md:gap-4 gap-5">
              {/* Beginner Level */}
              <div className="relative bg-[url('/assets/images/blog.png')] bg-cover bg-center bg-no-repeat p-5 rounded-[10px] flex justify-between items-center">
                <div className="flex md:flex-row md:gap-[40px] flex-col md:items-center">
                  <h3 className="text-[rgba(255,255,255,1))] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                    Начальный уровень
                  </h3>
                  <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                    {setData.levels.beginner.exerciseCount} упражнений
                  </span>
                </div>
                <Link href={`/player?setId=${setId}`}>
                  <button ref={playBtnRef} className="relative z-10">
                    <CiPlay1
                      size={20}
                      color="white"
                      className="hover:text-[#846FA0] hover:text-2xl hover:scale-125"
                    />
                  </button>
                </Link>
                {popoverOpen && (
                  <div
                    ref={popoverRef}
                    className="absolute right-0 -top-72 mt-2 bg-white shadow-lg rounded-2xl p-0 min-w-[320px] max-w-[90vw] border border-purple-200 z-20 flex flex-col items-stretch"
                  >
                    {/* 1 месяц */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[rgba(132,111,160,0.12)]">
                      <span className="font-bold cursor-pointer text-[18px] leading-[120%] tracking-[-2%] text-[rgba(61,51,74,1)] uppercase">
                        1 месяц
                      </span>
                      <span className="text-[16px] text-[rgba(132,111,160,1)] font-medium">
                        {setData.price.monthly} ₽/мес
                      </span>
                    </div>
                    {/* 3 месяца - highlight */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[rgba(132,111,160,0.12)] bg-[rgba(132,111,160,0.08)]">
                      <span className="font-bold cursor-pointer text-[18px] leading-[120%] tracking-[-2%] text-[rgba(132,111,160,1)] uppercase">
                        3 месяца
                      </span>
                      <div className="flex flex-col items-end">
                        <span className="text-[20px] cursor-pointer font-bold text-[rgba(132,111,160,1)] leading-[120%]">
                          {setData.price.threeMonths} ₽/мес
                        </span>
                        <span className="text-[14px] cursor-pointer text-[rgba(132,111,160,0.5)] line-through font-medium">
                          {setData.price.monthly * 3} ₽/мес
                        </span>
                      </div>
                    </div>
                    {/* 6 месяцев */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[rgba(132,111,160,0.12)]">
                      <span className="font-bold text-[18px] cursor-pointer leading-[120%] tracking-[-2%] text-[rgba(61,51,74,1)] uppercase">
                        6 месяцев
                      </span>
                      <span className="text-[16px] cursor-pointer text-[rgba(132,111,160,1)] font-medium">
                        {setData.price.sixMonths} ₽/мес
                      </span>
                    </div>
                    {/* 12 месяцев */}
                    <div className="flex justify-between items-center px-6 py-4">
                      <span className="font-bold text-[18px] cursor-pointer leading-[120%] tracking-[-2%] text-[rgba(61,51,74,1)] uppercase">
                        12 месяцев
                      </span>
                      <span className="text-[16px] cursor-pointer text-[rgba(132,111,160,1)] font-medium">
                        {setData.price.yearly} ₽/мес
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Intermediate Level */}
              <div className="bg-[rgba(249,247,254,1)] p-5 rounded-[10px] flex justify-between items-center">
                <div className="flex md:flex-row md:gap-[40px] flex-col md:items-center">
                  <h3 className="text-[rgba(132,111,160,1)] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                    Средний уровень
                  </h3>
                  <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                    {setData.levels.intermediate.exerciseCount} упражнений
                  </span>
                  {setData.levels.intermediate.isLocked && (
                    <CiLock
                      color="#846FA0"
                      className="absolute right-8"
                      size={24}
                    />
                  )}
                </div>
                <CiPlay1 width={19.28} height={25.44} />
              </div>

              {/* Advanced Level */}
              <div className="bg-[rgba(249,247,254,1)] p-5 rounded-[10px] flex justify-between items-center">
                <div className="flex md:flex-row md:gap-[40px] flex-col md:items-center">
                  <h3 className="text-[rgba(132,111,160,1)] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                    Продвинутый уровень
                  </h3>
                  <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                    {setData.levels.advanced.exerciseCount} упражнений
                  </span>
                  {setData.levels.advanced.isLocked && (
                    <CiLock
                      color="#846FA0"
                      className="absolute right-8"
                      size={24}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Subscribe />
        <ReviewSlider />
        <div className="md:my-10">
          <Works title="Может понравиться" />
        </div>
        <div className="md:my-10">
          <Blog
            withBanner={false}
            withSlider={true}
            layoutType="default"
            title={"GRS МЕДИА"}
          />
        </div>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="flex flex-col items-center justify-center min-w-[250px] min-h-[120px]">
            <h2 className="text-xl font-bold mb-4">Модальное окно</h2>
            <p>Здесь будет ваш контент (например, видео ან სხვა ინფორმაცია).</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Complex; 