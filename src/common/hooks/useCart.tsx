import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useStorage";
import axios from "axios";
import { debounce, reduce } from "lodash";
import { ChangeEvent } from "react";

const useCart = () => {
  const queryClient = useQueryClient();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;

  const { data, ...restQuery } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/cart/${userId}`
      );
      return data;
    },
  });
  const updateQuantityDebounce = debounce(
    async (productId, quantity: number) => {
      await axios.post(`http://localhost:8080/api/v1/cart/update`, {
        userId,
        productId,
        quantity,
      });
    },
    300
  );
  const handleQuantityChange = (
    productId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = parseInt(e.target.value);
    updateQuantityDebounce(productId, quantity);
  };
  const { mutate } = useMutation({
    mutationFn: async ({ action, productId }:{action: string, productId: string}) => {
      switch (action) {
        case "INCREMENT":
          axios.post(`http://localhost:8080/api/v1/cart/increase`, {
            userId,
            productId,
          });
          break;
        case "DECREMENT":
          axios.post(`http://localhost:8080/api/v1/cart/decrease`, {
            userId,
            productId,
          });
          break;
        case "REMOVE":
            axios.post(`http://localhost:8080/api/v1/cart/remove`, {
              userId,
              productId,
            });
            break;
      }
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cart", userId],
        });
      },
  });
  const calculateTotal = () => {
    if (!data || !data.products) return 0;
    return reduce(
      data.products,
      (total, product) => total + product.price * product.quantity,
      0
    );
  };
  return{
    data,
    mutate,
    calculateTotal,
    handleQuantityChange,
    ...restQuery
  }
};
export default useCart;
