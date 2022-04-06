<script setup lang="ts">
import { useFetchProducts } from '../../../shared/services/product.service';

const { products, loading, error } = useFetchProducts();
</script>

<template>
  <div class="container card">
    <h1>Liste des produits</h1>
    <h3 v-if="error">Oops une erreur s'est produite</h3>
    <h3 v-else-if="loading">Chargement ...</h3>
    <ul v-else>
      <li
        class="d-flex flex-row align-items-center"
        v-for="product of products"
        :key="product._id"
      >
        <span class="flex-fill">{{ product.title }}</span>
        <button class="btn btn-primary mr-20">Modifier</button>
        <button class="btn btn-danger">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
}

li {
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 5px 15px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: var(--gray-1);
  }
}
</style>
