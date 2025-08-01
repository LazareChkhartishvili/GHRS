"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { Article as ArticleType, getArticlesByCategory } from "../api/articles";
import { FaShare } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useLanguage, useI18n } from "../context/I18nContext";

interface ArticleProps {
  article: ArticleType;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const [similarArticles, setSimilarArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const { t } = useI18n();

  useEffect(() => {
    const fetchSimilarArticles = async () => {
      try {
        setIsLoading(true);
        // Check if category is an object with _id property
        const categoryId =
          article.categoryId &&
          typeof article.categoryId === "object" &&
          "_id" in article.categoryId
            ? (article.categoryId as { _id: string })._id
            : article.categoryId;

        const articles = await getArticlesByCategory(categoryId);
        // Filter out the current article and limit to 3
        const filtered = articles
          .filter((a) => a._id !== article._id)
          .slice(0, 3);
        setSimilarArticles(filtered);
      } catch (error) {
        console.error("Error fetching similar articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (article.categoryId) {
      fetchSimilarArticles();
    }
  }, [article.categoryId, article._id]);

  // Helper function to get category name
  const getCategoryName = (article: ArticleType): string => {
    if (article.category?.name) {
      return article.category.name[language];
    }
    return "Category";
  };

  const handleScrollToSection = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative w-full h-[518px]">
        <Image
          src="/assets/images/article.jpg"
          alt="article"
          fill
          className="object-cover rounded-[40px]"
        />
        <div className=" absolute flex bottom-5 right-5 gap-[10px]">
          <div className="bg-[#3D334A4D] hover:bg-[#5447654d] duration-300 cursor-pointer w-[70px] h-[70px] flex items-center justify-center rounded-[20px]">
            <Image
              src="/assets/images/rightIcon.svg"
              alt="vallet"
              width={15}
              height={15}
            />
          </div>
          <div className="bg-[#3D334A4D] hover:bg-[#5447654d] duration-300 cursor-pointer w-[70px] h-[70px] flex items-center justify-center rounded-[20px]">
            <Image
              src="/assets/images/leftIcon.svg"
              alt="vallet"
              width={15}
              height={15}
            />
          </div>
        </div>
      </div>

      <main className="flex justify-between gap-[30px] text-[#3D334A] mt-10">
        {/* Left Sidebar - Table of Contents */}
        <div className="p-5 bg-[rgba(255,255,255,1)] min-h-[700px] h-[700px] rounded-[20px] max-w-[335px] hidden md:block">
          <h2 className="text-lg font-semibold mb-4 text-[rgba(61,51,74,1)]">
            {t("article.table_of_contents")}
          </h2>

          <div className="space-y-3">
            {article.tableOfContents?.map((item, index) => (
              <div
                key={item.anchor}
                className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleScrollToSection(item.anchor)}
              >
                <span className="text-[rgba(61,51,74,1)]">{index + 1}.</span>
                <span className="text-[rgba(61,51,74,1)] underline tracking-[-2%]">
                  {item.title[language]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:max-w-[890px] w-[890px] mt-0">
          <section className="bg-[rgba(255,255,255,1)] rounded-[20px] p-4">
            <header className="hidden md:flex flex-col gap-[30px]">
              <div className="flex justify-between items-center">
                <button className="bg-[rgba(233,223,246,1)] rounded-[6px] p-[8px] text-[18px] uppercase leading-[90%]">
                  {getCategoryName(article)}
                </button>
                <div className="flex justify-between items-center gap-[6px]">
                  <div className="w-[40px] h-[40px] hover:scale-105 duration-500 cursor-pointer hover:bg-[#dbc9f2] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                    <CiBookmark className="" />
                  </div>
                  <div className="w-[40px] h-[40px] rounded-[6px] hover:scale-105 duration-500 cursor-pointer hover:bg-[#dbc9f2] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                    <FaShare />
                  </div>
                </div>
              </div>
              <section>
                <h2 className="text-[rgba(61,51,74,1)] leading-[120%] tracking-[0%] text-[32px]">
                  {article.title[language]}
                </h2>
                <p className="text-[rgba(61,51,74,1)] leading-[120%] tracking-[0%] text-[16px] pt-6">
                  {article.excerpt[language]}
                </p>
                <div className="flex items-center gap-[30px] pt-[30px]">
                  <span className="text-[rgba(61,51,74,1)] leading-[120%] tracking-[0%] text-[16px] font-medium">
                    {t("article.comment_count", {
                      count: String(article.commentsCount || 0),
                    })}
                  </span>
                  <span className="text-[rgba(61,51,74,1)] leading-[120%] tracking-[0%] text-[16px] font-medium">
                    {t("article.read_time", { time: String(article.readTime) })}
                  </span>
                </div>
              </section>
            </header>

            {/* Article Content */}
            <div
              dangerouslySetInnerHTML={{
                __html: addAnchorsToContent(article.content[language]),
              }}
              className="mt-[60px] prose max-w-none text-[rgba(132,111,160,1)]"
            />

            {/* Featured Images */}
            {article.featuredImages?.map((image, index) => (
              <section key={index} className="p-4 hidden md:block">
                <div className="max-w-[630px] max-h-[309px] rounded-[10px] overflow-hidden">
                  <Image
                    src={image}
                    alt={`Article image ${index + 1}`}
                    className="w-full h-full rounded-[10px] object-cover"
                    width={630}
                    height={309}
                  />
                </div>
              </section>
            ))}
          </section>

          {/* Rating Section */}
          <section className="md:max-w-[690px] px-5 pt-5 md:pb-[40px] pb-6 bg-[rgba(255,255,255,1)] rounded-[20px] mt-5">
            <h2 className="md:text-2xl text-[18px] text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%] md:mb-[40px] mb-5">
              {t("article.rate_article")}
            </h2>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-[4.16px] md:gap-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="max-w-[55.5px] max-h-[50.7px] rounded-[10px] overflow-hidden flex items-center justify-center bg-yellow-50"
                  >
                    <MdStar className="text-yellow-400 w-full h-full" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:justify-center items-center gap-[4.16px]">
                <h4 className="md:text-[32px] text-lg text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%]">
                  4.7
                </h4>
                <span className="md:text-[16px] text-[10px] text-[rgba(213,209,219,1)] leading-[100%] tracking-[-1%]">
                  {t("article.ratings", { count: "26" })}
                </span>
              </div>
            </div>
          </section>

          {/* Comments Section */}
          <section className="md:max-w-[690px] px-5 pt-5 md:pb-[40px] pb-6 bg-[rgba(255,255,255,1)] rounded-[20px] mt-5">
            <h2 className="md:text-2xl text-[18px] text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%] md:mb-[40px] mb-5">
              {t("article.comments")}
            </h2>
            <form className="max-w-[650px] mx-auto relative">
              <input
                type="text"
                placeholder={t("article.write_comment")}
                className="w-full p-4 text-lg font-medium border-2 rounded-lg outline-none border-[rgba(249,247,254,1)] transition-colors bg-transparent leading-none tracking-normal placeholder:text-[rgba(226,204,255,1)]"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
            <hr className="h-[2px] w-full bg-[rgba(249,247,254,1)] mt-[40px] border-none md:mb-5 mb-0" />
            <div className="flex flex-col gap-5">
              {article.comments && article.comments.length > 0
                ? article.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="flex gap-5 items-start max-w-[650px] bg-[rgba(249,247,254,1)] rounded-[20px] p-4"
                    >
                      <div className="w-[50px] h-[50px] rounded-[10px] bg-gray-300 flex-shrink-0 overflow-hidden flex items-center justify-center">
                        <FaUserCircle className="text-gray-400 w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-3">
                          <h3 className="text-[rgba(61,51,74,1)] text-sm md:[18px]">
                            {comment.author}
                          </h3>
                          <p className="text-gray-500 text-xs">
                            {comment.date}
                          </p>
                        </div>
                        <p className="md:text-[18px] text-[16px] text-[rgba(132,111,160,1)] md:leading-[140%] leading-[160%] tracking-[-1%]">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            {article.comments && article.comments.length > 0 && (
              <button className="block m-auto py-[17.5px] w-[319px] mt-[40px] max-w-[343px] md:w-[343px] bg-[rgba(212,186,252,1)] rounded-[10px] items-center text-lg text-[rgba(255,255,255,1)] md:leading-[100%] leading-[160%] tracking-[0%]">
                {t("article.show_more_comments")}
              </button>
            )}
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="p-5 bg-[rgba(255,255,255,1)] min-h-[700px] h-[700px] rounded-[20px] max-w-[335px] hidden md:block">
          <h2 className="text-lg font-semibold mb-4 text-[rgba(61,51,74,1)]">
            {t("article.similar_articles")}
          </h2>
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgba(132,111,160,1)]"></div>
              </div>
            ) : similarArticles.length > 0 ? (
              similarArticles.map((similarArticle) => (
                <Link
                  href={`/article/${similarArticle._id}`}
                  key={similarArticle._id}
                  className="flex gap-3 hover:bg-[rgba(249,247,254,1)] p-2 rounded-[10px] transition-colors"
                >
                  <div className="w-[100px] h-[100px] rounded-[10px] overflow-hidden">
                    <Image
                      src={
                        similarArticle.featuredImages?.[0] ||
                        "/assets/images/article.jpg"
                      }
                      alt={similarArticle.title[language]}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[rgba(132,111,160,1)] bg-[rgba(249,247,254,1)] px-2 py-1 rounded-full">
                        {getCategoryName(similarArticle)}
                      </span>
                    </div>
                    <h3 className="text-[rgba(61,51,74,1)] text-sm font-medium mb-2">
                      {similarArticle.title[language]}
                    </h3>
                    <p className="text-[rgba(132,111,160,1)] text-xs line-clamp-2">
                      {similarArticle.excerpt[language]}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-[rgba(132,111,160,1)]">
                {t("article.no_similar_articles")}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

// Helper function to add anchor IDs to content headers
const addAnchorsToContent = (content: string): string => {
  // Add id attributes to h1-h6 tags that match the anchors
  return content.replace(
    /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/g,
    (match, level, attrs, text) => {
      // Create anchor ID from text (simplified version)
      const anchor = text
        .toLowerCase()
        .replace(/<[^>]+>/g, "") // Remove HTML tags
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-"); // Replace spaces with hyphens

      return `<h${level}${attrs} id="${anchor}">${text}</h${level}>`;
    }
  );
};

export default Article;
