import { useMutation } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";

export const useAddTask = () => {
  return useMutation({
    mutationKey: "addTask",
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify({
          id: uuid(),
          title: data.title.trim(),
          time: data.time.trim(),
          description: data.description.trim(),
          status: "not_started",
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    },
  });
};
