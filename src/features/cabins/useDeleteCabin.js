import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // mutationFn: (id) => deleteCabin(id),
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin sucessfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}

/*
* o useQueryClient é um hook que retorna uma instância do queryClient que foi criado no App.jsx. Com ele, podemos acessar funções que nos permitem manipular as queries que estão sendo feitas.

*o mutationFn é uma função que é executada quando o botão de deletar é clicado. Nesse caso, a função deleteCabin é chamada com o id do item que deve ser deletado.
  
* toast.success é uma função que exibe uma notificação de sucesso na tela. Ela aceita uma string que é a mensagem que será exibida na notificação.

* o invalidateQueries é uma função que invalida a query que está sendo feita. Por exemplo: se eu deletar um item, eu quero que a lista de itens seja atualizada para que o item deletado não apareça mais sem precisar recarregar a página.

*A função toast.error é chamada com a mensagem de erro que foi retornada pela mutationFn.
*/
