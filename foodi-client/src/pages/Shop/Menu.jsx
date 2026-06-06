import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // loading data
  useEffect(() => {
    // fetching data from backend
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/menu`);
        const data = await res.json();
        setMenu(data);

        // Check for category or search in URL
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get("category");
        const searchParam = params.get("search");

        if (categoryParam) {
          const filtered = data.filter(
            (item) => item.category === categoryParam,
          );
          setFilteredItems(filtered);
          setSelectedCategory(categoryParam);
        } else if (searchParam) {
          const filtered = data.filter(
            (item) =>
              item.name.toLowerCase().includes(searchParam.toLowerCase()) ||
              item.category.toLowerCase().includes(searchParam.toLowerCase()),
          );
          setFilteredItems(filtered);
          setSelectedCategory("all");
        } else {
          setFilteredItems(data);
          setSelectedCategory("all");
        }
      } catch (error) {
        console.log("Error fetching data ", error);
      }
    };

    // call the function
    fetchData();
  }, [window.location.search]);

  // filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show all data function
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // sorting based on A-Z, Z-A, Low-High pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItem = [...filteredItems];

    // logic
    switch (option) {
      case "A-Z":
        sortedItem.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItem.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItem.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItem.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilteredItems(sortedItem);
    setCurrentPage(1);
  };

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* menu banner */}
      <div className="section-container bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-24 md:py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop section */}
      <div className="section-container">
        {/* filtering and sorting */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* all category btns */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={`text-lg font-medium transition-colors ${selectedCategory === "all" ? "text-green underline underline-offset-8" : "hover:text-green"}`}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={`text-lg font-medium transition-colors ${selectedCategory === "salad" ? "text-green underline underline-offset-8" : "hover:text-green"}`}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={`text-lg font-medium transition-colors ${selectedCategory === "pizza" ? "text-green underline underline-offset-8" : "hover:text-green"}`}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={`text-lg font-medium transition-colors ${selectedCategory === "soup" ? "text-green underline underline-offset-8" : "hover:text-green"}`}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={`text-lg font-medium transition-colors ${selectedCategory === "dessert" ? "text-green underline underline-offset-8" : "hover:text-green"}`}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={`text-lg font-medium transition-colors ${selectedCategory === "drinks" ? "text-green underline underline-offset-8" : "hover:text-green"}`}
            >
              Drinks
            </button>
          </div>

          {/* sorting based filtering */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="bg-black p-2 rounded-l-md">
              <FaFilter className="h-4 w-4 text-white" />
            </div>

            {/* sorting options */}
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-3 py-2 rounded-r-md outline-none border-none cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* products card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentItems.map((item, index) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination section */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
