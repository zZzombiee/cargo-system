"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTrack } from "@/context/TrackContext";
import { Loader2, MapPin, Package, Scale, Wallet } from "lucide-react";

export default function TrackingPage() {
  const { allTracks, fetchAllTracks, loading } = useTrack();
  const status = [
    "Хятад",
    "Эрээн агуулах",
    "Замын-Үүд",
    "Салбар дээр",
    "Хүргэгдсэн",
  ];

  /** Fetch all tracks (admin view) */
  useEffect(() => {
    fetchAllTracks();
  }, []);

  /** ✅ Status color mapping (in Mongolian context) */
  const getStatusStyle = (status: string | string[]) => {
    const s = Array.isArray(status) ? status[0] : status;
    switch (s) {
      case "Хятад":
        return "bg-yellow-500/10 text-yellow-700 border border-yellow-400";
      case "Эрээн агуулах":
        return "bg-blue-500/10 text-blue-700 border border-blue-400";
      case "Замын-Үүд":
        return "bg-orange-500/10 text-orange-700 border border-orange-400";
      case "Салбар":
        return "bg-purple-500/10 text-purple-700 border border-purple-400";
      case "Хүргэгдсэн":
        return "bg-green-500/10 text-green-700 border border-green-400";
      case "Саатсан":
        return "bg-red-500/10 text-red-700 border border-red-400";
      default:
        return "bg-gray-300/10 text-gray-700 border border-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-3 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p>Мэдээлэл ачааллаж байна...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Ачаа хяналт</h1>
        <p className="text-gray-500 mt-1">
          Бүх каргоны статус, байршил, жингийн болон үнийн мэдээлэл.
        </p>
      </div>

      {allTracks.length === 0 ? (
        <div className="text-gray-500 text-center py-12 border rounded-lg">
          Одоогоор ачаа бүртгэлгүй байна.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {allTracks.map((t) => (
            <Card
              key={t._id}
              className="hover:shadow-lg border border-gray-200 transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    #{t.trackingNumber}
                  </CardTitle>
                  <Badge className={`${getStatusStyle(t.status)} px-3 py-1`}>
                    {t.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" />
                  <span>
                    <strong>Байршил:</strong> {t.location || "Тодорхойгүй"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Scale size={16} className="text-green-500" />
                  <span>
                    <strong>Жин:</strong> {t.weight ? `${t.weight} кг` : "-"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-amber-500" />
                  <span>
                    <strong>Үнэ:</strong>{" "}
                    {t.price ? `${t.price.toLocaleString()}₮` : "-"}
                  </span>
                </div>

                {t.user && (
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-purple-500" />
                    <span>
                      <strong>Хэрэглэгч:</strong>{" "}
                      {t.user.name || "Хэрэглэгчийн мэдээлэлгүй"}
                    </span>
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-2">
                  Үүсгэсэн:{" "}
                  {new Date(t.createdAt).toLocaleDateString("mn-MN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {/* 🚚 Cargo Progress Timeline */}
                <div className="flex items-center justify-between mt-4 px-2 w-[500px] bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {status.map((s, i) => {
                    const isActive = String(t.status) === String(s);
                    const isCompleted = status.indexOf(String(t.status)) > i;
                    const isLast = i === status.length - 1;

                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center relative w-full"
                      >
                        {/* --- Connecting line --- */}
                        {!isLast && (
                          <div
                            className={`absolute top-[10px] left-1/2 w-full h-[2px] ${
                              isCompleted ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        )}

                        {/* --- Status circle --- */}
                        <div
                          className={`z-10 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                            isActive
                              ? "border-green-500 bg-white"
                              : isCompleted
                              ? "border-green-500 bg-green-500"
                              : "border-gray-300 bg-gray-200"
                          }`}
                        >
                          {isCompleted ? (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          ) : isActive ? (
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          ) : null}
                        </div>

                        {/* --- Status label --- */}
                        <span
                          className={`mt-2 text-xs ${
                            isActive
                              ? "text-green-600 font-semibold"
                              : isCompleted
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        >
                          {s}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
