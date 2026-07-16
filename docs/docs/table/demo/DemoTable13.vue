<script lang="ts" setup>
import { h } from "vue";

const departments = ["Engineering", "Design", "Product", "Marketing", "Sales", "Support"];
const cities = ["Shanghai", "Beijing", "Shenzhen", "Hangzhou", "Chengdu", "Guangzhou"];
const roles = ["Admin", "Editor", "Viewer", "Owner"];

const columns = [
  {
    title: "ID",
    field: "id",
    width: 80,
    x: "center",
    fixed: "left",
  },
  {
    title: "Name",
    field: "name",
    width: 140,
    fixed: "left",
  },
  {
    title: "Email",
    field: "email",
    width: 220,
    type: "text-trim",
  },
  {
    title: "Department",
    field: "department",
    width: 140,
  },
  {
    title: "Role",
    field: "role",
    width: 120,
    x: "center",
  },
  {
    title: "City",
    field: "city",
    width: 120,
  },
  {
    title: "Projects",
    field: "projects",
    width: 100,
    x: "center",
  },
  {
    title: "Score",
    field: "score",
    width: 100,
    x: "center",
    customRender: ({ text }: { text: number }) =>
      h("span", { style: { fontWeight: 600 } }, String(text)),
  },
  {
    title: "Updated At",
    field: "updatedAt",
    width: 160,
  },
  {
    title: "Status",
    field: "status",
    width: 110,
    x: "center",
    fixed: "right",
  },
];

const dataSource = Array.from({ length: 500000 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    name: `User ${id}`,
    email: `user${id}@qq.com`,
    department: departments[index % departments.length],
    role: roles[index % roles.length],
    city: cities[index % cities.length],
    projects: (index % 9) + 1,
    score: 60 + (index % 40),
    updatedAt: `2026-0${(index % 9) + 1}-${String((index % 27) + 1).padStart(2, "0")}`,
    status: index % 4 === 0 ? "Active" : index % 4 === 1 ? "Pending" : "Idle",
  };
});

const selectedKeys = ref<(string | number)[]>([]);

function statusColor(status: string) {
  if (status === "Active") return "green";
  if (status === "Pending") return "orange";
  return "gray";
}
</script>

<template>
  <lew-table
    v-model:selected-keys="selectedKeys"
    :columns="columns"
    :data-source="dataSource"
    :max-height="420"
    :virtual="true"
    row-key="id"
    checkable
    multiple
    bordered
  >
    <template #role="{ row }">
      <lew-tag size="small" type="light" color="blue">
        {{ row.role }}
      </lew-tag>
    </template>
    <template #status="{ row }">
      <lew-tag size="small" type="light" :color="statusColor(row.status)">
        {{ row.status }}
      </lew-tag>
    </template>
  </lew-table>
</template>
