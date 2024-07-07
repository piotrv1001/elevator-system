"use client";

import { pickupFormSchema } from "@/schemas/pickup-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PickupEvent } from "@/types/history-item";

export type PickupFormProps = {
  onSubmit: (values: PickupEvent) => void;
};

export default function PickupForm({ onSubmit }: PickupFormProps) {
  const form = useForm<z.infer<typeof pickupFormSchema>>({
    resolver: zodResolver(pickupFormSchema),
    defaultValues: {
      floor: "",
      direction: "up",
    },
  });

  const handleSubmit = (values: z.infer<typeof pickupFormSchema>) => {
    form.reset();
    onSubmit({
      type: "pickup",
      floor: Number(values.floor),
      direction: values.direction,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 border p-2 rounded-md"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Floor</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Floor of the elevator"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="direction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direction</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="up">Up</SelectItem>
                    <SelectItem value="down">Down</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
