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

export function TabsDemo() {
  return (
    <div className="flex w-full flex-col gap-6 max-w-7xl mx-auto mt-10 ">
      <Tabs defaultValue="createOrder">
        <TabsList>
          <TabsTrigger value="createOrder">Create order</TabsTrigger>
          <TabsTrigger value="tables">All orders</TabsTrigger>
        </TabsList>
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
                <Label htmlFor="tabs-demo-name">Захиалгын дугаар</Label>
                <Input
                  id="tabs-demo-name"
                  placeholder="жишээ: ORD-20251001-001"
                />
              </div>
              <Price />
            </CardContent>
            <CardFooter>
              <Button>Захиалга үүсгэх</Button>
            </CardFooter>
          </Card>
        </TabsContent>
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
            <CardFooter className="flex justify-center">
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
