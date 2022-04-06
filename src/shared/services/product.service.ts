import type { FiltersInterface, ProductInterface } from '../../interfaces';
import { ref, Ref } from 'vue';

const BASE_URL = 'https://restapi.fr/api/vueprojectproducts';

export async function fetchProducts(
  filter: FiltersInterface,
  page: number
): Promise<ProductInterface[] | ProductInterface> {
  const query = new URLSearchParams();
  if (filter.category !== 'all') {
    query.append('category', filter.category);
  }
  if (page !== 1) {
    query.append('skip', (page - 1) * 20 + '');
  }
  query.append('limit', '20');
  query.append('price', `$lte:${filter.priceRange[1]}`);
  query.append('price', `$gte:${filter.priceRange[0]}`);
  const products = await (await fetch(`${BASE_URL}?${query}`)).json();
  return products;
}

export function useFetchProducts(): {
  products: Ref<ProductInterface[] | null>;
  loading: Ref<boolean>;
  error: Ref<any>;
} {
  const products = ref<ProductInterface[] | null>(null);
  const loading = ref<boolean>(true);
  const error = ref<any>(null);

  (async () => {
    try {
      products.value = await (await fetch(BASE_URL)).json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  })();

  return {
    products,
    loading,
    error,
  };
}
