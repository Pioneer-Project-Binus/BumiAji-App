import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\ProductController::store
 * @see app\Http\Controllers\ProductController.php:68
 * @route /admin/products
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '\/admin\/products',
}

/**
 * @see \App\Http\Controllers\ProductController::store
 * @see app\Http\Controllers\ProductController.php:68
 * @route /admin/products
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProductController::store
 * @see app\Http\Controllers\ProductController.php:68
 * @route /admin/products
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store