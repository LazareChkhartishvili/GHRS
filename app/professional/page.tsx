"use client";
import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import CategorySlider from "../components/CategorySlider";
// import CourseSlider from "../components/CourseSlider";
import SliderArrows from "../components/SliderArrows";
import Subscribe from "../components/Subscribe";
import ReviewSlider from "../components/ReviewSlider";
import CourseSlider from "../components/CourseSlider";

const Professional = () => {
  return (
    <div>
      <Header />
      <div className="mt-52 md:mt-40 mx-2 md:mx-8 ">
        <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-0 md:justify-between">
          <div className="md:w-[500px] w-[359px] relative bg-[url('/assets/images/bluebg.jpg')] bg-cover h-[288px] rounded-[20px]">
            <Image
              src={"/assets/images/medal.png"}
              width={202}
              height={202}
              alt="medal"
              className="absolute right-[15px] top-[15px]"
            />
            <div className="absolute bottom-5 left-5">
              <h2 className="text-[40px] tracking-[1px]">&gt;20</h2>
              <p className="text-[20px] font-medium">
                квалифицированных преподавателей
              </p>
            </div>
          </div>

          <div className="md:w-[453px] w-[359px] relative bg-[url('/assets/images/bluebg.jpg')] bg-cover h-[288px] rounded-[20px]">
            <Image
              src={"/assets/images/book.png"}
              width={202}
              height={202}
              alt="medal"
              className="absolute right-[15px] top-[15px]"
            />
            <div className="absolute bottom-5 left-5">
              <h2 className="text-[40px] tracking-[1px]">50+</h2>
              <p className="text-[20px] font-medium">эксклюзивных курсов</p>
            </div>
          </div>
          <div className="md:w-[453px] w-[359px] relative bg-[url('/assets/images/bluebg.jpg')] bg-cover h-[288px] rounded-[20px]">
            <Image
              src={"/assets/images/laptop.png"}
              width={202}
              height={202}
              alt="medal"
              className="absolute right-[15px] top-[15px]"
            />
            <div className="absolute bottom-5 left-5">
              <h2 className="text-[40px] tracking-[1px]">&gt;20</h2>
              <p className="text-[20px] font-medium">
                студентов, проходят обучения сейчас
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}

      <div className="flex items-center justify-between mx-6 mb-4">
        <h1 className="text-[#3D334A] text-[40px] mt-10">Курсы</h1>
        <SliderArrows
          onScrollLeft={function (): void {
            throw new Error("Function not implemented.");
          }}
          onScrollRight={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <CategorySlider />
      <CourseSlider />
      <Subscribe />
      <ReviewSlider />
    </div>
  );
};

export default Professional;
