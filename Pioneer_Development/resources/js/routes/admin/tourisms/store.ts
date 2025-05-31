import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\TourismController::store
 * @see app\Http\Controllers\TourismController.php:52
 * @route /admin/tourisms
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
    url: '\/admin\/tourisms',
}

/**
 * @see \App\Http\Controllers\TourismController::store
 * @see app\Http\Controllers\TourismController.php:52
 * @route /admin/tourisms
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismController::store
 * @see app\Http\Controllers\TourismController.php:52
 * @route /admin/tourisms
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store