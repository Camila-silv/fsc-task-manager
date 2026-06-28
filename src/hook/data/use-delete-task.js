import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskMutationKeys } from "../../keys/mutations";
import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../libs/axios";

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deleteTask } = await api.delete(`tasks/${taskId}`);

      return deleteTask;
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTasks) => {
        return currentTasks.filter((currentTask) => currentTask.id !== taskId);
      });
    },
  });
};
