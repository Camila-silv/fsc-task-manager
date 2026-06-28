import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (data) => {
      const { data: createTask } = await axios.post(
        "http://localhost:3000/tasks",
        data
      );

      return createTask;
    },
    onSuccess: (createTask) => {
      queryClient.setQueryData(["tasks"], (currentTasks) => [
        ...currentTasks,
        createTask,
      ]);
    },
  });
};
