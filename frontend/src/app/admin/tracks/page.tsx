"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTrack } from "@/context/TrackContext";
import { Loader2, MapPin, Scale, Wallet, User2 } from "lucide-react";
import { statusList } from "@/types/track";

export default function TrackingPage() {
  const { allTracks, fetchAllTracks, loading } = useTrack();
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchAllTracks();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Хятадад байгаа":
        return "bg-yellow-100 text-yellow-800";
      case "Эрээнд ирсэн":
        return "bg-blue-100 text-blue-800";
      case "Монголд ирсэн":
        return "bg-green-100 text-green-800";
      case "Улаанбаатарт ирсэн":
        return "bg-gray-100 text-gray-800 ";
      case "Салбарт очсон":
        return "bg-purple-100 text-purple-800";
      case "Саатсан":
        return "bg-red-100 text-red-800";
      case "Хүргэгдсэн":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-600";
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Ачаа хяналт</h1>
          <p className="text-gray-500 mt-1">
            Бүх каргоны статус болон байршлын мэдээлэл.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("grid")}
          >
            Grid
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
          >
            List
          </Button>
        </div>
      </div>

      {allTracks.length === 0 ? (
        <div className="text-gray-500 text-center py-12 border rounded-lg">
          Одоогоор ачаа бүртгэлгүй байна.
        </div>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-4"
          }
        >
          {allTracks.map((t) => (
            <Card
              key={t._id}
              className={`hover:shadow-sm border border-gray-200 transition-all duration-200 min-h-full flex justify-between ${
                view === "grid" ? "gap-4" : "gap-0"
              }`}
            >
              <CardHeader className="">
                <div
                  className={
                    view === "grid"
                      ? "flex flex-col gap-1"
                      : "flex min-w-full justify-between"
                  }
                >
                  <CardTitle className="text-sm font-semibold text-gray-800">
                    #{t.trackingNumber}
                  </CardTitle>
                  <Badge className={`${getStatusStyle(t.status)} text-xs`}>
                    {t.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="text-sm text-gray-600">
                <div className="grid-rows-1 grid grid-cols-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-blue-500" />
                      <span>{t.location}</span>
                    </div>

                    {t.user && (
                      <div className="flex items-center gap-1">
                        <User2 size={14} className="text-purple-500" />
                        <span>{t.user.name || "Хэрэглэгч"}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    {t.weight > 0 && (
                      <div className="flex items-center gap-1">
                        <Scale size={14} className="text-green-500" />
                        <span>{t.weight} кг</span>
                      </div>
                    )}

                    {t.price > 0 && (
                      <div className="flex items-center gap-1">
                        <Wallet size={14} className="text-amber-500" />
                        <span>{t.price.toLocaleString()}₮</span>
                      </div>
                    )}
                  </div>
                </div>

                <p
                  className={
                    view === "grid" ? "text-[11px] text-gray-400" : "hidden"
                  }
                >
                  {new Date(t.createdAt).toLocaleDateString("mn-MN", {
                    year: "2-digit",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {/* Progress Timeline */}
                <div className="mt-3">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-black rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          0,
                          (statusList.indexOf(
                            t.status as unknown as (typeof statusList)[number]
                          ) /
                            (statusList.length - 3)) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div
                    className={
                      view !== "grid"
                        ? "flex w-full justify-between mt-1"
                        : "mt-1"
                    }
                  >
                    <p
                      className={`text-[11px] text-gray-400 ${
                        view === "grid" ? "hidden" : "block"
                      }`}
                    >
                      {new Date(t.createdAt).toLocaleDateString("mn-MN", {
                        year: "2-digit",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-[11px] text-gray-400 text-right">
                      {Math.round(
                        Math.max(
                          0,
                          (statusList.indexOf(
                            t.status as unknown as (typeof statusList)[number]
                          ) /
                            (statusList.length - 3)) *
                            100
                        )
                      )}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
