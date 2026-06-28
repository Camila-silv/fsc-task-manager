import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskMutationKeys } from "../../keys/mutations";
import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../libs/axios";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.create(),
    mutationFn: async (data) => {
      const { data: createTask } = await api.post(`tasks`, data);

      return createTask;
    },
    onSuccess: (createTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTasks) => [
        ...currentTasks,
        createTask,
      ]);
    },
  });
};
