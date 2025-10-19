import MapContainer from "@/components/mapContainer";
import Instagram from "../../../../public/svg/instagram";
import Facebook from "../../../../public/svg/facebook";
import Twitter from "../../../../public/svg/twitter";

const Contacts = () => {
  return (
    <div className="flex flex-col p-2 md:p-10 md:gap-10 max-w-screen mx-auto justify-center items-center">
      <h1 className="text-3xl font-bold my-2 pb-2">Холбоо барих</h1>
      <div className="flex gap-10 border p-4 rounded-2xl shadow-md flex-col md:flex-row">
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-col border-b pb-6">
            <p className="text-sm">Хаяг:</p>
            <p className="font-semibold">
              ХУД 23-р хороо &quot;Han Hills&quot; хотхон 132-р байр
            </p>
          </div>
          <div className="border-b pb-6">
            <p className="text-sm">Утасны дугаар:</p>
            <p className="font-semibold">7743-4334, 88112944, 99112944</p>
          </div>
          <div className="border-b pb-6">
            <p className="text-sm">Цагийн хуваарь:</p>
            <p className="font-semibold">Даваа - Баасан: 09:00 - 19:00</p>
            <p className="font-semibold">Бямба - Ням: 10:00 - 18:00</p>
          </div>
          <div className="flex gap-2">
            <Instagram />
            <Facebook />
            <Twitter />
          </div>
        </div>
        <div className="w-90 mx-auto md:w-100">
          <MapContainer />
        </div>
      </div>
    </div>
  );
};
export default Contacts;
