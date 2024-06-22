import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  // o useQuery é um hook do react-query que nos permite fazer uma query para buscar dados de uma API. Ele retorna um objeto com várias propriedades e métodos que nos permitem manipular o estado da query.
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
