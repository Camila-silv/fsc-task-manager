import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskMutationKeys } from "../../keys/mutations";
import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../libs/axios";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updateTask } = await api.patch(`tasks/${taskId}`, {
        title: data?.title?.trim(),
        description: data?.description?.trim(),
        time: data?.time,
        status: data?.status,
      });

      return updateTask;
    },
    onSuccess: (taskUpdata) => {
      queryClient.setQueryData(taskQueryKeys.getOne(taskId), taskUpdata);
    },
  });
};
