"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tables from "./tables";
import Price from "./price";
import { toast } from "sonner";

const Tab = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState<string>("");

  const handleCreateOrder = async () => {
    if (!orderNumber || price <= 0) {
      toast.error("Та захиалгын дугаар болон үнийг оруулна уу!");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        orderNumber,
        price,
        weight,
        status: "Бүртгүүлсэн",
        location: "Хятад",
      });

      toast.success("✅ Захиалга амжилттай үүсгэлээ!");
      setOrderNumber("");
      setDescription("");
      setPrice(0);
      setWeight(0);
    } catch (error) {
      console.error(error);
      toast.error("❌ Захиалга үүсгэхэд алдаа гарлаа!");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <Tabs defaultValue="createOrder" className="w-full">
        <TabsList className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
          <TabsTrigger
            value="createOrder"
            className="px-4 py-2 text-sm sm:text-base"
          >
            Захиалга үүсгэх
          </TabsTrigger>
          <TabsTrigger
            value="tables"
            className="px-4 py-2 text-sm sm:text-base"
          >
            Бүх захиалга
          </TabsTrigger>
        </TabsList>

        {/* ➕ Create Order */}
        <TabsContent value="createOrder">
          <Card className="shadow-sm border">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold">
                Захиалга үүсгэх
              </CardTitle>
              <CardDescription>
                Шинэ захиалгын мэдээллээ бөглөнө үү.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
              {/* Input fields */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="orderNumber">Захиалгын дугаар</Label>
                  <Input
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="жишээ: ORD-20251001-001"
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label>Тэмдэглэл</Label>
                  <Input
                    type="text"
                    placeholder="жишээ: Хагарах аюултай, дээш харуулж тавих..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* ✅ Price & Weight section */}
              <Price
                onChange={({ price, chargeableWeight }) => {
                  setPrice(price);
                  setWeight(chargeableWeight);
                }}
              />
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                onClick={handleCreateOrder}
                className="w-full sm:w-auto shadow-md"
              >
                Захиалга үүсгэх
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 📋 All Orders */}
        <TabsContent value="tables">
          <Card className="shadow-sm border">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold">
                Бүх захиалгууд
              </CardTitle>
              <CardDescription>
                Эндээс та захиалгын статус болон байршлыг удирдаж болно.
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Tables />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tab;
