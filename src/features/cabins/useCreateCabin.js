import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

/*
 *o useMutation é um hook do react-query que nos permite fazer uma mutação para criar, atualizar ou deletar dados em uma API. Ele retorna um objeto com várias propriedades e métodos que nos permitem manipular o estado da mutação.
 */

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    // mutationFn: newCabin => createCabin(newCabin),
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating };
}
