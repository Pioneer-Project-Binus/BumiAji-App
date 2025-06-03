import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\GaleryController::store
 * @see app\Http\Controllers\GaleryController.php:68
 * @route /admin/galeries
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
    url: '\/admin\/galeries',
}

/**
 * @see \App\Http\Controllers\GaleryController::store
 * @see app\Http\Controllers\GaleryController.php:68
 * @route /admin/galeries
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GaleryController::store
 * @see app\Http\Controllers\GaleryController.php:68
 * @route /admin/galeries
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store