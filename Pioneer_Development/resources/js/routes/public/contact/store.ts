import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\ContactController::store
 * @see app\Http\Controllers\ContactController.php:45
 * @route /hubungi-kami
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
    url: '\/hubungi-kami',
}

/**
 * @see \App\Http\Controllers\ContactController::store
 * @see app\Http\Controllers\ContactController.php:45
 * @route /hubungi-kami
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ContactController::store
 * @see app\Http\Controllers\ContactController.php:45
 * @route /hubungi-kami
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store