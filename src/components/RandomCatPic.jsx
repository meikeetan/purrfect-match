import React, { useState, useEffect } from "react";

const RandomCatPic = () => {
  const [catImage, setCatImage] = useState("");

  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1"
        );
        const data = await response.json();
        setCatImage(data[0].url);
      } catch (error) {
        console.error("Error fetching cat image:", error);
      }
    };

    fetchCatImage();
    const timer = setInterval(fetchCatImage, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <img style={{ height: "200px", width: "400px",position:'relative',left:'35%' }} src={catImage} alt="Random Cat Pic" />
    </div>
  );
};

export default RandomCatPic;