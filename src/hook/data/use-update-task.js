import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const { data: updateTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title: data?.title?.trim(),
          description: data?.description?.trim(),
          time: data?.time,
          status: data?.status,
        }
      );

      return updateTask;
    },
    onSuccess: (taskUpdata) => {
      queryClient.setQueryData(["task", taskId], taskUpdata);
    },
  });
};
