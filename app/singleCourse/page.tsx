"use client";
import Image from "next/image";
import {
  FaBullhorn,
  FaBookOpen,
  FaChevronDown,
  FaShareAlt,
} from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import { defaultMenuItems } from "../components/Header";
import React, { useState } from "react";

export default function SingleCurse() {
  const rightCardImage = "/assets/images/reklamos.png";
  const tabs = ["Описание", "Учебный план", "Объявление", "Отзывы"];
  const [activeTab, setActiveTab] = useState("Описание");

  return (
    <>
      <DesktopNavbar menuItems={defaultMenuItems} blogBg={false} />

      <div className="bg-[#FAF7FF] flex flex-col items-center py-6 px-2 w-full text-[#302A3A]">
        {/* Responsive wrapper: row on md+, column on mobile */}
        <div className="w-full md:px-10">
          <Image
            src={"/assets/images/singlecourse.png"}
            alt="courseBg"
            width={1400}
            height={517}
            className="w-full h-[517px] object-cover mb-10 rounded-[40px]"
          />
        </div>
        <div className="w-full  flex flex-col md:flex-row gap-6">
          {/* მარცხენა ქარდი */}
          <div
            className="w-full md:w-[335px] flex-shrink-0 flex flex-col h-auto md:h-[262px] bg-white p-4 rounded-[20px] 
              order-1 md:order-1 mb-4 md:mb-0"
          >
            <div className="flex items-center gap-4 pb-[18px]">
              <Image
                src="/assets/images/someone.png"
                alt="avatar"
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-[12px] object-cover mb-[10px]"
              />
              <span className="font-bold text-[18px] leading-7 tracking-[0.01em] text-[rgba(61,51,74,1)]">
                ROTEM SOLL
              </span>
            </div>
            <div className="border-t border-[#EEEAFB]" />
            <div className="flex gap-[10px] py-[18px] items-center">
              <span className="w-[48px] h-[48px] flex items-center justify-center bg-[#E1D7FA] rounded-[12px]">
                <FaBullhorn className="text-[#A993F8] text-[26px]" />
              </span>
              <span className="font-semibold text-[18px] text-[rgba(132,111,160,1)]">
                12 слушателей
              </span>
            </div>
            <div className="border-t border-[#EEEAFB]" />
            <div className="flex gap-[10px] py-[18px] items-center">
              <span className="w-[48px] h-[48px] flex items-center justify-center bg-[#E1D7FA] rounded-[12px]">
                <FaBookOpen className="text-[#A993F8] text-[26px]" />
              </span>
              <span className="font-semibold text-[18px] text-[rgba(132,111,160,1)]">
                5 курсов
              </span>
            </div>
          </div>

          {/* მარჯვენა ნაწილი: ფასი, ღილაკი, რეკლამები */}
          <aside
            className={`
              w-full md:w-[270px] flex flex-col gap-4
              order-2 md:order-3 mb-4 md:mb-0
            `}
          >
            <div className="bg-white rounded-2xl shadow-[0_7px_32px_0_rgba(141,126,243,0.13)] p-4 flex flex-col gap-2 mb-2 md:mb-0">
              <div className="flex items-center text-[rgba(212,186,252,1)] font-bold text-[32px] leading-none">
                5400
                <span className="text-[rgba(212,186,252,1)] text-xl font-normal ml-1">
                  $
                </span>
              </div>
              <div className="text-[#A9A6B4] text-sm">Стоимость курса</div>
            </div>
            <div className="bg-[#F1EEFF] rounded-2xl flex items-center justify-center px-5 py-3 font-bold text-[#8D7EF3] mb-1 text-lg">
              ПРИОБРЕСТИ КУРС
            </div>
            {/* რეკლამა - მხოლოდ md+ */}
            <div className="hidden md:flex flex-col gap-4">
              <Image
                src={rightCardImage}
                alt="ad"
                className="w-full rounded-xl"
                width={300}
                height={600}
              />
              <Image
                src={rightCardImage}
                alt="ad"
                className="w-full rounded-xl"
                width={300}
                height={600}
              />
            </div>
          </aside>

          {/* მთავარი ნაწილი */}
          <main
            className={`
              flex-1 flex flex-col gap-6
              order-3 md:order-2
            `}
          >
            <div
              className={`
                bg-[rgba(233,223,246,1)] mx-auto w-[720px] p-4 py-5 rounded-[20px] flex flex-wrap md:gap-[30px] gap-2 items-center justify-between relative mb-4
                order-3 md:order-1
              `}
            >
              {tabs.map((tab, idx) => (
                <div className="relative group flex-1 min-w-[90px]" key={idx}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`block w-full text-[rgba(132,111,160,1)] md:text-[16px] text-[14px] leading-[90%] md:leading-[120%] tracking-[0%] uppercase text-center transition group-hover:text-[rgba(61,51,74,1)] ${
                      activeTab === tab ? "text-[rgba(61,51,74,1)]" : ""
                    }`}
                  >
                    {tab}
                  </button>
                  <div
                    className={`absolute left-0 -bottom-[8px] h-[2px] w-full bg-[rgba(61,51,74,1)] transition-transform ${
                      activeTab === tab
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    } origin-left`}
                  ></div>
                </div>
              ))}
            </div>
            {/* ტაბების კონტენტი */}
            <div className="flex flex-col gap-4 order-4 md:order-2">
              {activeTab === "Описание" && (
                <>
                  {/* მხოლოდ Описание-ზე ჩანს */}
                  <div className="bg-white rounded-2xl shadow-[0_7px_32px_0_rgba(141,126,243,0.13)] px-6 py-4 flex items-center justify-between mb-2">
                    <div className="font-bold text-[rgba(132,111,160,1)]">
                      НАЗВАНИЕ ДОКУМЕНТА
                    </div>
                    <FaChevronDown className="text-[#8D7EF3] bg-[#F1EEFF] rounded-full w-7 h-7 p-2" />
                  </div>
                  <div className="bg-white rounded-2xl shadow-[0_7px_32px_0_rgba(141,126,243,0.13)] px-6 py-4 flex items-center justify-between mb-2">
                    <div className="font-bold text-[rgba(132,111,160,1)]">
                      НАЗВАНИЕ ДОКУМЕНТА
                    </div>
                    <FaChevronDown className="text-[#8D7EF3] bg-[#F1EEFF] rounded-full w-7 h-7 p-2" />
                  </div>
                  <article className="bg-white rounded-2xl shadow-[0_7px_32px_0_rgba(141,126,243,0.13)] px-4 md:px-8 py-6 md:py-10 flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[rgba(233,223,246,1)] rounded px-3 py-1 text-[rgba(61,51,74,1)] font-semibold text-xs tracking-widest">
                        Курсы на английском
                      </div>
                      <button className="ml-auto text-[#A9A6B4] hover:text-[#8D7EF3] transition">
                        <FaShareAlt className="w-5 h-5" />
                      </button>
                      <button className="ml-2 text-[#A9A6B4] hover:text-[#8D7EF3] transition">
                        <HiOutlineDotsHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    <h1 className="text-2xl font-bold uppercase text-[#302A3A]">
                      EXERCISE AS A REHABILITATION TOOL FOR NEUROLOGICAL
                      PATIENTS
                    </h1>
                    <div className="text-[#A9A6B4]">
                      С советами по безопасности, которым нужно следовать до и
                      после перелома Кристи Гэвинс
                    </div>
                    <section className="flex flex-col gap-4">
                      <h2 className="font-bold text-lg text-[#302A3A] mt-3">
                        Что считается сидячим образом жизни?
                      </h2>
                      <p>
                        Хотя не существует строгого определения того, что
                        представляет собой малоподвижный образ жизни, у
                        исследователей есть несколько различных показателей для
                        измерения того, что такое сидячий образ жизни. Один из
                        таких показателей времени, которое человек сидит или
                        полулежа в часы бодрствования.
                      </p>
                      <p>
                        Казалось бы, разумно предположить, что те, кто
                        соответствует требованиям малоподвижности, не будут
                        считаться малоподвижными. Однако исследования
                        показывают, что даже те, кто соблюдает объем физической
                        активности, рекомендованный Всемирной организацией
                        здравоохранения (не менее 150 минут умеренной активности
                        в течение недели или не менее 75 минут интенсивной
                        активности в неделю), все равно могут считаться ведущими
                        малоподвижный образ жизни, если они проводят четыре часа
                        в неделю, шесть часов сидя или лежа в день.
                      </p>
                      <div className="bg-[#F1EEFF] text-[#8D7EF3] font-medium px-6 py-3 rounded-xl">
                        Проведение четырех-шести часов бодрствования сидя или
                        лежа считается сидячим образом жизни.
                      </div>
                      <h2 className="font-bold text-lg text-[#302A3A] mt-3">
                        Что считается сидячим образом жизни?
                      </h2>
                      <p>
                        В краткосрочной перспективе бездействие может усилить
                        депрессию или тревогу. Это также может повлиять на то,
                        как организм перерабатывает жиры и сахар в рационе, и
                        привести к некоторому увеличению веса, если не
                        компенсировать соответствующей калорий.
                      </p>
                      <p>
                        В долгосрочной перспективе малоподвижный образ жизни
                        увеличивает вероятность сердечно-сосудистых заболеваний,
                        диабета и рака. Помимо уменьшения шансов прожить долгую
                        жизнь, также снижается качество жизни из-за ухудшения
                        боли и ожирения, более высокого уровня депрессии и
                        снижения когнитивных функций.
                      </p>
                      <ul className="list-disc pl-5 text-[#8D7EF3]">
                        <li>Элемент списка</li>
                        <li>Элемент списка</li>
                        <li>Элемент списка</li>
                      </ul>
                    </section>
                  </article>
                </>
              )}
              {activeTab === "Учебный план" && (
                <div className="flex flex-col gap-2">
                  {/* აქ ჩასვით თქვენი პირველი სქრინშოტის შესაბამისი JSX */}
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl px-6 py-4 font-bold text-[#302A3A] text-[15px] mb-2"
                    >
                      {i}.ВВЕДЕНИЕ В КИТАЙСКУЮ МЕДИЦИНУ
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "Объявление" && (
                <div className="flex flex-col gap-2">
                  {/* აქ ჩასვით თქვენი მეორე სქრინშოტის შესაბამისი JSX */}
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-[#F1EEFF] rounded-2xl px-6 py-4 text-[#8D7EF3] text-[15px] mb-2"
                    >
                      The course is suitable for contact therapists, physical
                      education teachers, fitness instructors.
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "Отзывы" && (
                <div className="flex flex-col gap-4">
                  {/* აქ ჩასვით თქვენი მესამე სქრინშოტის შესაბამისი JSX */}
                  <div className="bg-white rounded-2xl px-6 py-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-[#302A3A] text-[15px]">
                        ВАШ ОТЗЫВ О КУРСЕ
                      </span>
                      <span className="ml-4 flex items-center">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span
                            key={i}
                            className={`text-2xl ${
                              i <= 4 ? "text-[#FFD600]" : "text-[#E1D7FA]"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </span>
                      <span className="ml-2 text-2xl font-bold text-[#302A3A]">
                        4.7
                      </span>
                      <span className="ml-1 text-[#A9A6B4] text-sm">
                        (26 оценок)
                      </span>
                    </div>
                    <textarea
                      className="w-full rounded-xl border border-[#EEEAFB] p-3 text-[#302A3A] resize-none"
                      rows={3}
                      placeholder="Напишите ваш отзыв о курсе"
                    />
                  </div>
                  <div className="font-bold text-[#302A3A] text-[15px]">
                    ОТЗЫВЫ УЧЕНИКОВ
                  </div>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-[#F1EEFF] rounded-2xl px-6 py-4 flex gap-3"
                    >
                      <img
                        src="/avatar.jpg"
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#302A3A] text-[15px]">
                            АЛЕКСЕЙ АНАТОЛЬЕВ
                          </span>
                          <span className="text-[#A9A6B4] text-xs">
                            12.03.2023 15:16
                          </span>
                          <span className="ml-auto flex items-center">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <span key={i} className="text-[#FFD600] text-lg">
                                ★
                              </span>
                            ))}
                          </span>
                        </div>
                        <div className="text-[#302A3A] text-[14px] mt-1">
                          Статья просто нечто! Для меня оказалась очень
                          полезной, т.к я работаю программистом и постоянно сижу
                          дома. Спасибо!
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
