import { useMutation } from "@tanstack/react-query";

export const useDeleteTask = (taskId) => {
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
  });
};
