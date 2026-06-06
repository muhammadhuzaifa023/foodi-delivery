import React from "react";

const Images = () => {
  return (
    <div className="md:w-1/2">
      <img src="/images/home/banner.png" alt="" />
      <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4 ">
        <div className="flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
          <img src="/images/home/b-food1.png" alt="" className="rounded-2xl" />
          <div className="space-y-1">
            <h5 className="font-medium mb-1">Spicy noodles</h5>
            <div className="rating rating-sm">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-500"
                defaultChecked
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-500"
              />
            </div>
            <p className="text-red">$18.00</p>
          </div>
        </div>
        <div className="sm:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
          <img src="/images/home/b-food1.png" alt="" className="rounded-2xl" />
          <div className="space-y-1">
            <h5 className="font-medium mb-1">Spicy noodles</h5>
            <div className="rating rating-sm">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-500"
                defaultChecked
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-500"
              />
            </div>
            <p className="text-red">$18.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
