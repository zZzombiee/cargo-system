import Search from "@/components/search";

const Home = () => {
  return (
    <div className="flex flex-col items-center p-10">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold mb-2">
          Хамгийн Хурдан <br /> Хамгийн Найдвартай
        </h1>
        <p className="text-sm">
          Бид таны ачаа, барааг аюулгүй, найдвартай, хамгийн богино хугацаанд
          хүргэхийг зорьж байна.
        </p>
      </div>
      <Search />
    </div>
  );
};

export default Home;
