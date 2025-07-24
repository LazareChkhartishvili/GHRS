import { FC } from "react";
import Image from "next/image";
import { LinkedinIcon } from "./socialIcons/LinkedinIcon";
import { InstagramIcon } from "./socialIcons/InstagramIcon";
import { YoutubeIcon } from "./socialIcons/YoutubeIcon";
import { VkIcon } from "./socialIcons/VkIcon";
import { FacebookIcon } from "./socialIcons/FacebookIcon";

export const Footer: FC = () => {
  return (
    <footer className="bg-[#F9F7FE] rounded-[20px]  px-8 pt-8 pb-4 text-[#3D334A]">
      {/* კონსულტაციის ფორმა */}
      <div className="mb-8">
        <h2 className="h1-bowler text-[#3D334A] mb-4">
          ОСТАВЬТЕ ЗАЯВКУ ДЛЯ{" "}
          <span className="text-[#B6A3D9]">КОНСУЛЬТАЦИИ:</span>
        </h2>
        <form className="flex flex-col md:flex-row gap-4 mb-2">
          <input
            type="text"
            placeholder="Имя"
            className="flex-1 rounded-lg px-4 py-3 bg-white/80 outline-none border border-[#E0D6F9] focus:ring-2 focus:ring-[#B6A3D9] transition"
          />
          <input
            type="text"
            placeholder="Телефон"
            className="flex-1 rounded-lg px-4 py-3 bg-white/80 outline-none border border-[#E0D6F9] focus:ring-2 focus:ring-[#B6A3D9] transition"
          />
          <input
            type="email"
            placeholder="Почта"
            className="flex-1 rounded-lg px-4 py-3 bg-white/80 outline-none border border-[#E0D6F9] focus:ring-2 focus:ring-[#B6A3D9] transition"
          />
        </form>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="bg-[#B6A3D9] text-white px-10 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#846FA0] transition-all text-lg shadow-md w-full md:w-auto">
            ОТПРАВИТЬ ЗАЯВКУ <span className="text-2xl">→</span>
          </button>
          <span className="text-xs text-[#8B7BAA] mt-2 md:mt-0">
            Нажимая на кнопку вы даете согласие на обработку персональных данных
          </span>
        </div>
      </div>
      <hr className="my-6 border-[#E0D6F9]" />
      {/* მთავარი ბლოკი */}
      <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8 items-center md:items-start">
        {/* მარცხენა */}
        <div className="flex flex-col gap-2 min-w-[220px] items-center md:items-start">
          <Image
            src="/assets/images/footerLogo.svg"
            alt="GRS Logo"
            width={120}
            height={40}
            className="mb-2"
          />
          <span className="text-sm text-[#8B7BAA]">
            Работаем с 9:00 до 19:00 по МСК
          </span>
          <span className="text-2xl font-bold">+7 (916) 856—11—45</span>
          <a
            href="mailto:office@ghrs-group.com"
            className="text-[#8B7BAA] text-sm hover:underline"
          >
            office@ghrs-group.com
          </a>
        </div>
        {/* სოციალური ღილაკები */}
        <div className="flex gap-3 items-center mt-4 md:mt-0">
          <a
            href="#"
            className="hover:bg-[#B6A3D9]/30 rounded-full p-1 transition"
          >
            <LinkedinIcon className="w-8 h-8" />
          </a>
          <a
            href="#"
            className="hover:bg-[#B6A3D9]/30 rounded-full p-1 transition"
          >
            <InstagramIcon className="w-8 h-8" />
          </a>
          <a
            href="#"
            className="hover:bg-[#B6A3D9]/30 rounded-full p-1 transition"
          >
            <YoutubeIcon className="w-8 h-8" />
          </a>
          <a
            href="#"
            className="hover:bg-[#B6A3D9]/30 rounded-full p-1 transition"
          >
            <VkIcon className="w-8 h-8" />
          </a>
          <a
            href="#"
            className="hover:bg-[#B6A3D9]/30 rounded-full p-1 transition"
          >
            <FacebookIcon className="w-8 h-8" />
          </a>
        </div>
      </div>
      {/* ლინკები */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 mb-8 text-sm">
        <div className="flex flex-col gap-1">
          <a href="#">Главная</a>
          <a href="#">Реабилитация</a>
          <a href="#">Профразвитие</a>
          <a href="#">Блог</a>
        </div>
        <div className="flex flex-col gap-1">
          <a href="#">О нас</a>
          <a href="#">FAQ</a>
          <a href="#">Руководство пользователя</a>
        </div>
        <div className="flex flex-col gap-1">
          <a href="#">Все комплексы</a>
          <a href="#">Ортопедия</a>
          <a href="#">Шейный отдел позвоночника</a>
          <a href="#">Грудной отдел позвоночника</a>
          <a href="#">Поясничный отдел позвоночника</a>
          <a href="#">Проблемы верхних конечностей</a>
          <a href="#">Проблемы нижних конечностей</a>
          <a href="#">Проблемы осанки</a>
          <a href="#">Неврология</a>
          <a href="#">Болезнь Паркинсона</a>
          <a href="#">Инсульт</a>
          <a href="#">Паралич лицевого нерва</a>
          <a href="#">Рессейный склероз</a>
        </div>
        <div className="flex flex-col gap-1">
          <a href="#">Афазия и дизартрия</a>
          <a href="#">Ожирение</a>
          <a href="#">Посттравматическая реабилитация походки</a>
          <a href="#">Реабилитация для пожилых</a>
          <a href="#">Реабилитация после Covid-19</a>
        </div>
      </div>
      {/* ქვედა ლოგოები */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-4">
        <Image
          src="/assets/images/services/asuta.png"
          alt="Assuta"
          width={220}
          height={48}
        />
        <Image
          src="/assets/images/services/asuta.png"
          alt="Assuta"
          width={220}
          height={48}
        />
        <Image
          src="/assets/images/services/asuta.png"
          alt="Assuta"
          width={220}
          height={48}
        />
      </div>
      {/* ქვედა ტექსტი */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#8B7BAA] gap-2 border-t border-[#E0D6F9] pt-2 text-center md:text-left">
        <span>Copyright © 2023 GHRS LLC</span>
        <a href="#" className="hover:underline">
          Пользовательское соглашение
        </a>
        <a href="#" className="hover:underline">
          Политика конфиденциальности
        </a>
        <a href="#" className="hover:underline">
          Обработка персональных данных
        </a>
      </div>
    </footer>
  );
};
