import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";


const ImageDimensionsFetcher = () => {
  const [data, setData] = useState([
    {
      description: "Lady with a Teddy",
      src: "https://images.pexels.com/photos/29937530/pexels-photo-29937530/free-photo-of-stunning-northern-lights-over-british-columbia.jpeg",
      height: null,
      width: null,
    },
    {
      description: "Girl with camera",
      src: "https://images.pexels.com/photos/30254787/pexels-photo-30254787/free-photo-of-cozy-coffee-setup-with-plants-and-books.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      height: null,
      width: null,
    },
    {
      description: "Beautiful Girl with Glasses",
      src: "https://images.pexels.com/photos/30305131/pexels-photo-30305131/free-photo-of-colorful-hindu-temple-at-batu-caves-malaysia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      height: null,
      width: null,
    },
    {
      description: "Redhead with frackles",
      src: "https://images.pexels.com/photos/16762023/pexels-photo-16762023/free-photo-of-village-with-church-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      height: null,
      width: null,
    },
    {
      description: "Girl in black dress",
      src: "https://images.pexels.com/photos/9943963/pexels-photo-9943963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      height: null,
      width: null,
    },
    {
      description: "Girl Sitting on Chair",
      src: "https://images.pexels.com/photos/6691721/pexels-photo-6691721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      height: null,
      width: null,
    },
  ]);

  useEffect(() => {
    const updateDimensions = async () => {
      const updatedData = await Promise.all(
        data.map((item) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              resolve({ ...item, width: img.width, height: img.height });
            };
            img.onerror = () => {
              resolve({ ...item, width: "Error", height: "Error" });
            };
            img.src = item.src;
          });
        })
      );
      setData(updatedData);
    };

    updateDimensions();
  }, []);

  return (
    <Card className="p-4 max-w-3xl mx-auto mt-10">
      <CardContent>
        <h1 className="text-xl font-bold mb-4">Image Dimensions</h1>
        <ul>
          {data.map((item, index) => (
            <li key={index} className="mb-4">
              <p className="font-medium">{item.description}</p>
              <p>
                Dimensions: {item.width}px (width) x {item.height}px (height)
              </p>
              <img
                src={item.src}
                alt={item.description}
                className="mt-2 max-w-full h-auto"
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ImageDimensionsFetcher;
