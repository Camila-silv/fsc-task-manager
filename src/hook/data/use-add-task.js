import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    },
    onSuccess: (createTask) => {
      queryClient.setQueryData(["tasks"], (currentTasks) => [
        ...currentTasks,
        createTask,
      ]);
    },
  });
};
