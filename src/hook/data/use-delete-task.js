import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["tasks"], (currentTasks) => {
        return currentTasks.filter((currentTask) => currentTask.id !== taskId);
      });
    },
  });
};
