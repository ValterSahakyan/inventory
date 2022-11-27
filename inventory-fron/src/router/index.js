import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        name: "initial",
        component: () => import("@/views/Home"),
        children:[]
    },
    {
        path: "/books",
        name: "books",
        component: () => import("@/views/Books"),
        children:[]
    },
    {
        path: "/games",
        name: "games",
        component: () => import("@/views/Games"),
        children:[]
    },
    {
        path: "/gifts",
        name: "gifts",
        component: () => import("@/views/Gifts"),
        children:[]
    },
    {
        path: "/materials",
        name: "materials",
        component: () => import("@/views/Materials"),
        children:[]
    },
    {
        path: "/create/:type",
        name: "create",
        component: () => import("@/views/Create"),
        children:[]
    },
    {
        path: "/update/:type/:id",
        name: "update",
        component: () => import("@/views/Update"),
        children:[]
    },
    {
        path: "/search/:title",
        name: "search",
        props: (route) => ({
            title: route.params.title,
        }),
        component: () => import("@/views/Search"),
        children:[]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;