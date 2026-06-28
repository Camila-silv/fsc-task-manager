import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const { data: deleteTask } = await axios.delete(
        `http://localhost:3000/tasks/${taskId}`
      );

      return deleteTask;
    },
    onSuccess: () => {
      queryClient.setQueryData(["tasks"], (currentTasks) => {
        return currentTasks.filter((currentTask) => currentTask.id !== taskId);
      });
    },
  });
};
