"use client";
import React, { useState } from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { defaultMenuItems } from "../components/Header";
import Image from "next/image";
// import WorksSlider from "../components/WorksSlider";
// import { homePageWorks } from "../components/Works";

const subscriptionOptions = [
  { label: "1 МЕСЯЦ", value: 1 },
  { label: "3 МЕСЯЦА", value: 3 },
  { label: "6 МЕСЯЦЕВ", value: 6 },
  { label: "12 МЕСЯЦЕВ", value: 12 },
];

const mockCart = [
  {
    id: 1,
    title: "Комплекс упражнений №1 для грудного отдела позвоночника",
    desc: "Улучшение динамики и подвижности грудного отдела",
    img: "/assets/images/blog1.png",
    price: 950,
    subscription: 1,
  },
  {
    id: 2,
    title: "Комплекс упражнений №1 для грудного отдела позвоночника",
    desc: "Улучшение динамики и подвижности грудного отдела",
    img: "/assets/images/blog1.png",
    price: 950,
    subscription: 1,
  },
  {
    id: 3,
    title: "Комплекс упражнений №1 для грудного отдела позвоночника",
    desc: "Улучшение динамики и подвижности грудного отдела",
    img: "/assets/images/blog1.png",
    price: 950,
    subscription: 1,
  },
  {
    id: 4,
    title: "Комплекс упражнений №1 для грудного отдела позвоночника",
    desc: "Улучшение динамики и подвижности грудного отдела",
    img: "/assets/images/blog1.png",
    price: 950,
    subscription: 1,
  },
  {
    id: 5,
    title: "Комплекс упражнений №1 для грудного отдела позвоночника",
    desc: "Улучшение динамики и подвижности грудного отдела",
    img: "/assets/images/blog1.png",
    price: 950,
    subscription: 1,
  },
];

const ShoppingCard = () => {
  const [cart, setCart] = useState(mockCart);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectSubscription = (id: number, value: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, subscription: value } : item
      )
    );
    setDropdownOpen(null);
  };

  return (
    <div>
      <div className="bg-[#F9F7FE] ">
        <DesktopNavbar menuItems={defaultMenuItems} blogBg={false} />
        <MobileNavbar />
        {/* LeftSide */}
        <div className="flex md:flex-row md:justify-between flex-col mx-2 md:mx-10 md:gap-[60px] md:mb-10 md:pb-10">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:min-w-[1000px] items-start p-4 md:p-10 bg-white rounded-[20px]">
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center justify-between ">
                <h1 className="text-[#3D334A] text-[24px] md:text-[40px] leading-[120%] tracking-[-3px]">
                  Корзина
                </h1>
                <span className="hidden font-[Pt] md:flex text-[#D5D1DB] text-[24px] leading-[120%] cursor-pointer hover:text-[#846FA0] transition">
                  Удалить все
                </span>
              </div>
              <hr className="h-[2px] bg-[#F9F7FE] w-full" />
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-3 rounded-[16px]  relative group hover:shadow-md transition"
                >
                  <Image
                    src={item.img}
                    width={136}
                    height={131}
                    alt="image"
                    className="rounded-[12px] object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-[#3D334A] font-[Pt] text-[18px] leading-[120%] tracking-[-1.1%]">
                      {item.title}
                    </h3>
                    <p className="text-[#846FA0] text-[14px] font-[Pt]">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2 mt-2 relative">
                      <button
                        className="text-[#846FA0] font-[Pt] text-[14px] rounded-[8px] px-3 py-1 flex items-center gap-1  hover:bg-[#F3EDFF] transition"
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen === item.id ? null : item.id
                          )
                        }
                      >
                        Срок подписки:{" "}
                        <span className="text-purple-400">
                          {
                            subscriptionOptions.find(
                              (o) => o.value === item.subscription
                            )?.label
                          }
                        </span>
                        <svg
                          className={`ml-1 w-4 h-4 transition-transform ${
                            dropdownOpen === item.id ? "rotate-180" : "rotate-0"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {dropdownOpen === item.id && (
                        <div className="absolute font-[Bowler] z-10 top-10 left-0 bg-white rounded-[16px] shadow-lg py-2 w-[180px] flex flex-col animate-fade-in border border-[#E2D6F9]">
                          {subscriptionOptions.map((option) => (
                            <button
                              key={option.value}
                              className={`text-left font-[Pt] px-4 py-2 hover:bg-[#F3EDFF] transition text-[#3D334A] ${
                                item.subscription === option.value
                                  ? "font-bold"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSelectSubscription(item.id, option.value)
                              }
                            >
                              <span className="font-bold">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end min-w-[80px]">
                    <span className="text-[#3D334A] font-[Pt] text-[18px] font-semibold">
                      {item.price} ₽
                    </span>
                    <button
                      className="text-[#846FA0] text-[14px] flex items-center gap-1 mt-2 hover:text-[#D7263D] transition"
                      onClick={() => handleRemove(item.id)}
                    >
                      Удалить
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* RightSide */}
          </div>
          <div className="bg-white p-4 min-h-[334px] h-[334px] mt-4 md:w-[334px] space-y-5 rounded-[20px]">
            <div className="flex items-center justify-between">
              <h5 className="text-[#846FA0] font-[Pt]">Товаров</h5>
              <span className="text-[#3D334A] font-[Pt]">
                {cart.length} шт.
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h5 className="text-[#846FA0] font-[Pt]">Всего на сумму</h5>
              <span className="text-[#3D334A] font-[Pt]">
                {cart.reduce((sum, i) => sum + i.price, 0)} ₽
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h5 className="text-[#846FA0] font-[Pt]">Скидки</h5>
              <span className="text-[#3D334A] font-[Pt]">1000 ₽</span>
            </div>
            <button className="bg-[url('/assets/images/bluebg.jpg')] rounded-[10px] bg-cover py-[17px] w-full mt-4 cursor-pointer text-white text-[18px] font-semibold shadow-md hover:opacity-90 transition">
              Оплатить
            </button>
          </div>
        </div>
        {/*  */}
        {/* <WorksSlider works={homePageWorks} /> */}
      </div>
    </div>
  );
};

export default ShoppingCard;
