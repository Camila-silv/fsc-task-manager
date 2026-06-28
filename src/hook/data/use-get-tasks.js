import { useQuery } from "@tanstack/react-query";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../libs/axios";

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: getTasks } = await api.get(`tasks`);

      return getTasks;
    },
  });
};
