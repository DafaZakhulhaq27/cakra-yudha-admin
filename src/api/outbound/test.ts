import { fetcher } from "@/utils/fetcher";

export const getTest = () =>
  fetcher(`/carts/add`, {
    method : 'POST',
    body : {
        userId: 1,
        products: [
          {
            id: 1,
            quantity: 1,
          },
          {
            id: 50,
            quantity: 2,
          },
        ]
    }
})
