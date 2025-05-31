import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\PhotoProductController::store
 * @see app\Http\Controllers\PhotoProductController.php:71
 * @route /admin/photo-products
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
    url: '\/admin\/photo-products',
}

/**
 * @see \App\Http\Controllers\PhotoProductController::store
 * @see app\Http\Controllers\PhotoProductController.php:71
 * @route /admin/photo-products
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PhotoProductController::store
 * @see app\Http\Controllers\PhotoProductController.php:71
 * @route /admin/photo-products
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store