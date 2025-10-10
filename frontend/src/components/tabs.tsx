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

  const handleCreateOrder = async () => {
    if (!orderNumber || price <= 0) {
      toast.error("Та захиалгын дугаар болон үнийг оруулна уу!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/order", {
        orderNumber,
        price,
        weight,
        status: "Хятад агуулахад",
        location: "Хятад",
      });

      toast.success("✅ Захиалга амжилттай үүсгэлээ!");
      console.log(res.data);
      setOrderNumber("");
      setPrice(0);
      setWeight(0);
    } catch (error) {
      console.error(error);
      toast.error("❌ Захиалга үүсгэхэд алдаа гарлаа!");
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 max-w-7xl mx-auto mt-10">
      <Tabs defaultValue="createOrder">
        <TabsList>
          <TabsTrigger value="createOrder">Create order</TabsTrigger>
          <TabsTrigger value="tables">All orders</TabsTrigger>
        </TabsList>

        {/* ➕ Create Order */}
        <TabsContent value="createOrder">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Create Order</CardTitle>
              <CardDescription>
                Fill in the form to create a new order.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="orderNumber">Захиалгын дугаар</Label>
                <Input
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="жишээ: ORD-20251001-001"
                />
              </div>

              {/* ✅ Get both price & weight */}
              <Price
                onChange={({ price, chargeableWeight }) => {
                  setPrice(price);
                  setWeight(chargeableWeight);
                }}
              />
            </CardContent>

            <CardFooter>
              <Button onClick={handleCreateOrder}>Захиалга үүсгэх</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 📋 All Orders */}
        <TabsContent value="tables">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">All Orders</CardTitle>
              <CardDescription>
                You can change status and location of orders from here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Tables />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tab;
