import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="flex flex-col max-w-2xl w-full mx-4 my-8 gap-4">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold mb-2 ">
          Хамгийн Хурдан <p></p> Хамгийн Найдвартай
        </h1>
        <p className="text-sm">
          Бид таны ачаа, барааг аюулгүй, найдвартай, хамгийн богино хугацаанд
          хүргэхийг зорьж байна. Манай тээвэрлэлтийн үйлчилгээ таны итгэлийг
          хүлээж, найдвартай түнш болохын төлөө ажиллах болно.
        </p>
      </div>
      <div className="flex gap-2 ">
        <Input type="text" placeholder="Search from delivery code..." />
        <Button>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Search;
