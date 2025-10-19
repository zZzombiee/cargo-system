"use client";

const About = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-16 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Бидний тухай
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Манай систем нь хэрэглэгчдэд Хятад улсаас бараа бүтээгдэхүүнээ
          хялбараар, найдвартай захиалж авах боломжийг олгодог. Захиалгын явц,
          хүргэлтийн төлөв, болон барааны байршлыг бодит цагийн мэдээллээр хянах
          боломжтой.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {/* Card 1 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Манай зорилго
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Хэрэглэгчдэд аюулгүй, хурдан, итгэлтэй карго үйлчилгээ үзүүлж,
              тэдний цаг хугацаа болон зардлыг хэмнэх.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Манай үйлчилгээ
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Барааны бүртгэл, захиалга хяналт, тээвэрлэлт, хүргэлтийн мэдээлэл
              зэрэг бүх процессыг нэг дор хянах боломжтой.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Манай үнэт зүйлс
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Найдвартай байдал, ил тод байдал, болон хэрэглэгчийн сэтгэл
              ханамжийг хамгийн түрүүнд тавьдаг.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            “Таны захиалга — бидний хариуцлага.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
