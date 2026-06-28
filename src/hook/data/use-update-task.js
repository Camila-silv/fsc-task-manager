import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data?.title?.trim(),
          description: data?.description?.trim(),
          time: data?.time,
          status: data?.status,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    },
    onSuccess: (taskUpdata) => {
      queryClient.setQueryData(["task", taskId], taskUpdata);
    },
  });
};
