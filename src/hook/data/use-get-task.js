import { useQuery } from "@tanstack/react-query";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../libs/axios";

export const useGetTask = (taskId) => {
  return useQuery({
    queryKey: taskQueryKeys.getOne(taskId),
    queryFn: async () => {
      const { data: getTask } = await api.get(`tasks/${taskId}`);

      return getTask;
    },
  });
};
