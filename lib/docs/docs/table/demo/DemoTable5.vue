<script lang="ts" setup>
const data: any = [
    {
        id: 1,
        name: 'Smart Cleaner X1',
        price: '1999',
        suction: 4000,
        batteryLife: '180 minutes',
        noiseLevel: '65dB',
        cleanArea: '200 sq.m',
        features: [
            'Laser Navigation',
            'Auto Recharge',
            'APP Control',
            'Voice Control',
            'Anti-fall',
        ],
        tdStyle: {
            price: 'background:var(--lew-color-primary-light);color:var(--lew-color-primary-dark)',
            suction: 'font-weight: bold; color: var(--lew-color-success)',
            batteryLife: 'font-style: italic; color: var(--lew-color-info)',
        },
        weight: '3.5kg',
        dustBinCapacity: '600ml',
        waterTankCapacity: '300ml',
        filterType: 'HEPA',
        warranty: '2 years',
    },
    {
        id: 2,
        name: 'All-in-One Cleaning Master',
        price: '2499',
        suction: 4500,
        batteryLife: '200 minutes',
        noiseLevel: '62dB',
        cleanArea: '250 sq.m',
        features: [
            'Laser Navigation',
            'Auto Recharge',
            'APP Control',
            'Voice Control',
            'Anti-fall',
            'Auto Empty',
        ],
        tdStyle: {
            name: 'background: var(--lew-color-success-light); font-weight: bold',
            cleanArea:
                'text-decoration: underline; color: var(--lew-color-primary)',
        },
        weight: '3.8kg',
        dustBinCapacity: '700ml',
        waterTankCapacity: '350ml',
        filterType: 'HEPA',
        warranty: '3 years',
    },
    {
        id: 3,
        name: 'Home Cleaning Elf',
        price: '1799',
        suction: 3800,
        batteryLife: '160 minutes',
        noiseLevel: '68dB',
        cleanArea: '180 sq.m',
        features: [
            'Laser Navigation',
            'Auto Recharge',
            'APP Control',
            'Anti-fall',
        ],
        tdStyle: {
            batteryLife: 'color:var(--lew-color-warning-dark);',
            noiseLevel: 'background:var(--lew-color-warning);color:#fff',
            features: 'font-size: 12px; font-style: italic',
        },
        weight: '3.2kg',
        dustBinCapacity: '550ml',
        waterTankCapacity: '250ml',
        filterType: 'Regular',
        warranty: '1 year',
    },
    {
        id: 4,
        name: 'Super Suction King',
        price: '2999',
        suction: 5000,
        batteryLife: '240 minutes',
        noiseLevel: '60dB',
        cleanArea: '300 sq.m',
        features: [
            'Laser Navigation',
            'Auto Recharge',
            'APP Control',
            'Voice Control',
            'Anti-fall',
            'Auto Empty',
            'Mopping Function',
        ],
        tdStyle: {
            suction: 'background:var(--lew-color-error);color:#fff',
            price: 'font-weight: bold; font-size: 16px; color: var(--lew-color-error)',
            batteryLife:
                'background: var(--lew-color-success-light); border-radius: 4px; padding: 2px 4px',
        },
        weight: '4.2kg',
        dustBinCapacity: '800ml',
        waterTankCapacity: '400ml',
        filterType: 'HEPA',
        warranty: '3 years',
    },
    {
        id: 5,
        name: 'Budget Friendly Cleaner',
        price: '1299',
        suction: 3500,
        batteryLife: '140 minutes',
        noiseLevel: '70dB',
        cleanArea: '150 sq.m',
        features: [
            'Collision Sensing',
            'Auto Recharge',
            'APP Control',
            'Anti-fall',
        ],
        tdStyle: {
            price: 'color: var(--lew-color-success); font-weight: bold',
            noiseLevel:
                'background: var(--lew-color-error-light); border: 1px solid var(--lew-color-error)',
        },
        weight: '3.0kg',
        dustBinCapacity: '500ml',
        waterTankCapacity: '200ml',
        filterType: 'Regular',
        warranty: '1 year',
    },
]

const columns = [
    {
        title: 'ID',
        width: 50,
        field: 'id',
        x: 'center',
        fixed: 'left',
    },
    {
        title: 'Model',
        width: 150,
        field: 'name',
        x: 'start',
        fixed: 'left',
    },
    {
        title: 'Price ($)',
        width: 120,
        field: 'price',
        x: 'center',
    },
    {
        title: 'Suction (Pa)',
        width: 120,
        field: 'suction',
        x: 'center',
    },
    {
        title: 'Battery Life',
        width: 120,
        field: 'batteryLife',
        x: 'center',
    },
    {
        title: 'Noise Level',
        width: 120,
        field: 'noiseLevel',
        x: 'center',
    },
    {
        title: 'Cleaning Area',
        width: 120,
        field: 'cleanArea',
        x: 'center',
    },
    {
        title: 'Features',
        width: 550,
        field: 'features',
        x: 'start',
    },
    {
        title: 'Value for Money',
        width: 120,
        field: 'valueForMoney',
        x: 'center',
    },
    {
        title: 'Weight',
        width: 100,
        field: 'weight',
        x: 'center',
    },
    {
        title: 'Dust Bin Capacity',
        width: 220,
        field: 'dustBinCapacity',
        x: 'center',
    },
    {
        title: 'Water Tank Capacity',
        width: 120,
        field: 'waterTankCapacity',
        x: 'center',
    },
    {
        title: 'Filter Type',
        width: 120,
        field: 'filterType',
        x: 'center',
    },
    {
        title: 'Warranty',
        width: 100,
        field: 'warranty',
        x: 'center',
    },
]

const formatNoiseLevel = (level: string) => {
    const noise = parseInt(level)
    if (noise <= 62) return 'Quiet'
    if (noise <= 66) return 'Moderate'
    return 'Loud'
}

const calculateValueForMoney = (
    price: string,
    suction: number,
    batteryLife: string,
) => {
    const priceNum = parseInt(price)
    const batteryMinutes = parseInt(batteryLife)
    const score = (suction * batteryMinutes) / priceNum
    if (score > 400) return 'Excellent'
    if (score > 300) return 'Very High'
    if (score > 200) return 'High'
    if (score > 100) return 'Average'
    return 'Low'
}
</script>

<template>
    <lew-table :data-source="data" :columns="columns">
        <template #noiseLevel="{ row }">
            {{ row.noiseLevel }} ({{ formatNoiseLevel(row.noiseLevel) }})
        </template>
        <template #features="{ row }">
            <lew-flex gap="5" x="start" wrap>
                <lew-tag
                    v-for="(item, index) in row.features"
                    :key="index"
                    type="light"
                    color="blue"
                    size="small"
                    >{{ item }}
                </lew-tag>
            </lew-flex>
        </template>
        <template #valueForMoney="{ row }">
            {{
                calculateValueForMoney(row.price, row.suction, row.batteryLife)
            }}
        </template>
    </lew-table>
</template>
