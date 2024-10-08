"use client";

import moment from "moment";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function User() {
  const [UserData, setUserData] = useState([]);
  const [visibleNews, setVisibleNews] = useState(4);
  const handleReadAllNews = () => {
    setVisibleNews((prev) => prev + 4);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/getUsersArticle", {
        cache: "no-cache",
        next: { revalidate: 0 },
      });

      if (!res.ok) {
        notFound();
      }
      const data = await res.json();

      setUserData(data);
    };

    getData();
  }, []);

  if (UserData.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center w-screen ">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-red-500"></div>
      </div>
    );
  }
  // const FilteredData = UserData.filter((item) => {
  //   return item.Youtube !== "true";
  // });

  return (
    <div className="flex flex-wrap w-screen md:w-full ">
      <div className="w-full p-4 mt-4 md:border-r-2">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Latest User's News</h1>
          <p className=" text-base text-[#666666]">
            What users have uploaded from the Dashboard
          </p>
        </div>

        <div className="h-1 w-20 bg-red-500 mb-4"></div>

        <div className="flex flex-wrap -mx-4">
          {UserData.slice(0, visibleNews).map((item, index) => {
            if (item.postImage === null) {
              return null;
            }
            const day = moment(item.createdAt).date();
            const month = moment(item.createdAt).format("MMMM");
            const year = moment(item.createdAt).year();
            return (
              <Link
                key={index}
                className="w-full md:w-1/2  px-4 mb-8"
                href={`/ArticlePage/${item._id}`}
              >
                <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg">
                  <img
                    className="w-full h-44 object-cover"
                    src={item.postImage}
                    alt="Sports Image"
                  />
                  <div className="p-4">
                    <span className="bg-red-500 text-white text-xs font-bold uppercase px-2 py-1 rounded">
                      {item.catagory}
                    </span>
                    <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      {month} {day}, {year}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {visibleNews < UserData.length && (
          <div
            onClick={handleReadAllNews}
            className="text-center mt-4 mb-4 flex justify-center hover:bg-red-500 transition-all duration-200 ease-out cursor-pointer rounded-md max-sm:w-full mx-auto bg-gray-900 h-10 text-white"
          >
            <button>Read All News</button>
          </div>
        )}
      </div>
    </div>
  );
}
