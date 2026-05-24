module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// In-memory mock database
__turbopack_context__.s([
    "addCustomer",
    ()=>addCustomer,
    "addOrder",
    ()=>addOrder,
    "addProduct",
    ()=>addProduct,
    "customers",
    ()=>customers,
    "deleteCustomer",
    ()=>deleteCustomer,
    "deleteProduct",
    ()=>deleteProduct,
    "orders",
    ()=>orders,
    "products",
    ()=>products,
    "updateCustomer",
    ()=>updateCustomer,
    "updateProduct",
    ()=>updateProduct
]);
let customers = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        status: 'Active',
        spend: 1200
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'Active',
        spend: 850
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        status: 'Inactive',
        spend: 0
    }
];
let products = [
    {
        id: '1',
        sku: 'PROD-001',
        name: 'Premium Analytics Plan',
        price: 99.00,
        stock: 1000
    },
    {
        id: '2',
        sku: 'PROD-002',
        name: 'Standard Analytics Plan',
        price: 49.00,
        stock: 5000
    },
    {
        id: '3',
        sku: 'SERV-001',
        name: 'Consulting Hour',
        price: 150.00,
        stock: 50
    }
];
let orders = [
    {
        id: '1',
        customerName: 'John Doe',
        date: '2023-10-25',
        total: 1200,
        status: 'Completed',
        items: [
            {
                productName: 'Premium Analytics Plan',
                quantity: 1,
                price: 99.00
            }
        ]
    },
    {
        id: '2',
        customerName: 'Jane Smith',
        date: '2023-10-26',
        total: 850,
        status: 'Processing',
        items: [
            {
                productName: 'Standard Analytics Plan',
                quantity: 1,
                price: 49.00
            }
        ]
    }
];
const addCustomer = (customer)=>customers.push(customer);
const updateCustomer = (id, data)=>{
    const index = customers.findIndex((c)=>c.id === id);
    if (index !== -1) {
        customers[index] = {
            ...customers[index],
            ...data
        };
        return customers[index];
    }
    return null;
};
const deleteCustomer = (id)=>{
    customers = customers.filter((c)=>c.id !== id);
};
const addProduct = (product)=>products.push(product);
const updateProduct = (id, data)=>{
    const index = products.findIndex((p)=>p.id === id);
    if (index !== -1) {
        products[index] = {
            ...products[index],
            ...data
        };
        return products[index];
    }
    return null;
};
const deleteProduct = (id)=>{
    products = products.filter((p)=>p.id !== id);
};
const addOrder = (order)=>orders.unshift(order);
}),
"[project]/app/api/orders/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["orders"]);
}
async function POST(request) {
    const body = await request.json();
    const newOrder = {
        id: Date.now().toString(),
        ...body,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing'
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addOrder"])(newOrder);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newOrder, {
        status: 201
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__39770329._.js.map