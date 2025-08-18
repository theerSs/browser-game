<script setup lang="ts">
const props = defineProps<{ drawerId: string }>();
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input
      :id="props.drawerId"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content flex flex-col items-center justify-start p-6">
      <main>
        <slot name="main" />
      </main>
      <label :for="props.drawerId" class="cursor-pointer fixed top-2 left-2 drawer-button lg:hidden">
        <Icon name="tabler:menu-2" size="32" />
      </label>
    </div>
    <nav class="drawer-side">
      <label
        :for="props.drawerId"
        aria-label="close sidebar"
        class="drawer-overlay"
      />
      <ul class="menu flex flex-col bg-base-200 text-base-content min-h-full w-80 p-4">
        <slot name="sidebar" />
        <li class="text-red-500 justify-self-end">
          <NuxtLink to="/sign-out">
            <Icon size="24" name="tabler:logout-2" />
            {{ $t("sign_out") }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
