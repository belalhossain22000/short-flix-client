module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

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
"[project]/store/slices/shortsSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addShort",
    ()=>addShort,
    "clearFilters",
    ()=>clearFilters,
    "default",
    ()=>__TURBOPACK__default__export__,
    "initializeFiltered",
    ()=>initializeFiltered,
    "setLoading",
    ()=>setLoading,
    "setSearchQuery",
    ()=>setSearchQuery,
    "toggleTag",
    ()=>toggleTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    items: [
        {
            id: "1",
            title: "Amazing City Views",
            description: "Breathtaking aerial footage of the city at sunset",
            videoUrl: "/aerial-city-sunset.jpg",
            thumbnail: "/vibrant-city-skyline.png",
            tags: [
                "travel",
                "city",
                "aerial"
            ],
            views: 12500,
            likes: 845,
            createdAt: "2025-01-15"
        },
        {
            id: "2",
            title: "Mountain Adventure",
            description: "Epic hiking journey through the Rockies",
            videoUrl: "/mountain-hiking.png",
            thumbnail: "/majestic-mountain-peak.png",
            tags: [
                "adventure",
                "hiking",
                "nature"
            ],
            views: 8320,
            likes: 612,
            createdAt: "2025-01-14"
        },
        {
            id: "3",
            title: "Urban Photography",
            description: "Street photography in downtown areas",
            videoUrl: "/urban-streets.jpg",
            thumbnail: "/city-streets.jpg",
            tags: [
                "photography",
                "urban",
                "art"
            ],
            views: 5640,
            likes: 423,
            createdAt: "2025-01-13"
        },
        {
            id: "4",
            title: "Ocean Waves",
            description: "Calm and peaceful ocean scenery",
            videoUrl: "/ocean-waves.png",
            thumbnail: "/tropical-beach.png",
            tags: [
                "nature",
                "ocean",
                "relaxation"
            ],
            views: 9871,
            likes: 756,
            createdAt: "2025-01-12"
        },
        {
            id: "5",
            title: "Forest Walk",
            description: "Peaceful walk through an ancient forest",
            videoUrl: "/forest-path.png",
            thumbnail: "/forest-trees.png",
            tags: [
                "nature",
                "forest",
                "meditation"
            ],
            views: 7234,
            likes: 534,
            createdAt: "2025-01-11"
        },
        {
            id: "6",
            title: "Desert Sunset",
            description: "Golden hour in the desert landscape",
            videoUrl: "/desert-sunset.png",
            thumbnail: "/desert-dunes.png",
            tags: [
                "nature",
                "landscape",
                "sunset"
            ],
            views: 11200,
            likes: 892,
            createdAt: "2025-01-10"
        }
    ],
    filteredItems: [],
    selectedTags: [],
    searchQuery: "",
    isLoading: false
};
const shortsSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "shorts",
    initialState,
    reducers: {
        setSearchQuery: (state, action)=>{
            state.searchQuery = action.payload;
            state.filteredItems = applyFilters(state.items, state.selectedTags, action.payload);
        },
        toggleTag: (state, action)=>{
            const tag = action.payload;
            if (state.selectedTags.includes(tag)) {
                state.selectedTags = state.selectedTags.filter((t)=>t !== tag);
            } else {
                state.selectedTags.push(tag);
            }
            state.filteredItems = applyFilters(state.items, state.selectedTags, state.searchQuery);
        },
        clearFilters: (state)=>{
            state.selectedTags = [];
            state.searchQuery = "";
            state.filteredItems = state.items;
        },
        addShort: (state, action)=>{
            state.items.unshift(action.payload);
            state.filteredItems = applyFilters(state.items, state.selectedTags, state.searchQuery);
        },
        setLoading: (state, action)=>{
            state.isLoading = action.payload;
        },
        initializeFiltered: (state)=>{
            state.filteredItems = state.items;
        }
    }
});
function applyFilters(items, tags, query) {
    return items.filter((item)=>{
        const matchesTags = tags.length === 0 || tags.some((tag)=>item.tags.includes(tag));
        const matchesQuery = query === "" || item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase());
        return matchesTags && matchesQuery;
    });
}
const { setSearchQuery, toggleTag, clearFilters, addShort, setLoading, initializeFiltered } = shortsSlice.actions;
const __TURBOPACK__default__export__ = shortsSlice.reducer;
}),
"[project]/store/slices/uiSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "closeForm",
    ()=>closeForm,
    "closePlayer",
    ()=>closePlayer,
    "default",
    ()=>__TURBOPACK__default__export__,
    "openForm",
    ()=>openForm,
    "openPlayer",
    ()=>openPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    selectedShortId: null,
    isPlayerOpen: false,
    isFormOpen: false
};
const uiSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "ui",
    initialState,
    reducers: {
        openPlayer: (state, action)=>{
            state.selectedShortId = action.payload;
            state.isPlayerOpen = true;
        },
        closePlayer: (state)=>{
            state.isPlayerOpen = false;
            state.selectedShortId = null;
        },
        openForm: (state)=>{
            state.isFormOpen = true;
        },
        closeForm: (state)=>{
            state.isFormOpen = false;
        }
    }
});
const { openPlayer, closePlayer, openForm, closeForm } = uiSlice.actions;
const __TURBOPACK__default__export__ = uiSlice.reducer;
}),
"[project]/store/api/shortsApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "shortsApi",
    ()=>shortsApi,
    "useAddShortMutation",
    ()=>useAddShortMutation,
    "useGetShortByIdQuery",
    ()=>useGetShortByIdQuery,
    "useGetShortsQuery",
    ()=>useGetShortsQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-ssr] (ecmascript)");
;
const shortsApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: "shortsApi",
    baseQuery: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchBaseQuery"])({
        baseUrl: "http://139.59.163.31:4000/api"
    }),
    tagTypes: [
        "Shorts"
    ],
    endpoints: (builder)=>({
            getShorts: builder.query({
                query: ({ page = 1, limit = 20, search = "", tag = "" })=>{
                    const params = new URLSearchParams({
                        page: String(page),
                        limit: String(limit),
                        ...search && {
                            search
                        },
                        ...tag && {
                            tag
                        }
                    });
                    return `/shorts?${params}`;
                },
                providesTags: [
                    "Shorts"
                ]
            }),
            getShortById: builder.query({
                query: (id)=>`/shorts/${id}`
            }),
            addShort: builder.mutation({
                query: (body)=>({
                        url: "/shorts",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Shorts"
                ]
            })
        })
});
const { useGetShortsQuery, useGetShortByIdQuery, useAddShortMutation } = shortsApi;
}),
"[project]/store/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$shortsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/shortsSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/uiSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2f$shortsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/api/shortsApi.ts [app-ssr] (ecmascript)");
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        shorts: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$shortsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        ui: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        [__TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2f$shortsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shortsApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2f$shortsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shortsApi"].reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(__TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2f$shortsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shortsApi"].middleware)
});
}),
"[project]/providers/redux-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReduxProvider",
    ()=>ReduxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function ReduxProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/providers/redux-provider.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__960f11c1._.js.map